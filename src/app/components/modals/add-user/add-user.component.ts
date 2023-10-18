import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Observable, of, timer } from 'rxjs';
import { User } from 'src/app/models/user';
import { startWith, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [this.checkUsernameUniqueness.bind(this)],
          updateOn: 'blur',
        },
      ],
      active: [false],
    });
  }

  userForm: FormGroup;
  userList: User[] = [];
  activeCheckboxClicked = false;

  ngOnInit(): void {
    this.userService.getUsers()
    .pipe(take(1))
    .subscribe(users => {
      this.userList = users;
    });
  }

  generateUniqueId(): number {
    return this.userList.reduce((max, user) => Math.max(max, user.id), 0) + 1;
  }

  onSubmit() {
    const newUser: User = {
      id: this.generateUniqueId(),
      name: this.userForm.value.name,
      active: this.userForm.value.active,
    };

    this.userService.addUser(newUser).subscribe((addedUser) => {
      this.userList.push(addedUser);
    });
  
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  checkUsernameUniqueness(control: { value: string }): Observable<null | { notUnique: true }> {
    return (this.userForm.get('active')?.valueChanges as Observable<boolean>).pipe(
      startWith(this.userForm.get('active')?.value),
      switchMap((active) => {
        if (active) {
          return timer(1000).pipe(
            switchMap(() => {
              const username = control.value;
              const isUnique = !this.userList.some(user => user.name === username);
             
              this.activeCheckboxClicked = isUnique;
              return isUnique ? of(null) : of({ notUnique: true } as { notUnique: true });
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }
  

  isFormValid(): boolean {
    return this.activeCheckboxClicked;
  }
  
}

