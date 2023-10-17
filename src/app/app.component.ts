import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UsersQuery } from './state/users.query';
import { UserService } from './service/user.service';
import { UserAddModalComponent } from './components/user-add-modal/user-add-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users$!: Observable<User[]>;
  addUserForm: FormGroup;
  canAddUser$: Observable<boolean>;

  constructor(
    private usersQuery: UsersQuery,
    private usersService: UserService,
    private dialog: MatDialog
  ) {
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      active: new FormControl(false),
    });

    this.addUserForm
      .get('name')!
      .setAsyncValidators([this.asyncValidator.bind(this)]);

    this.canAddUser$ = this.canAddUser();
  }

  ngOnInit(): void {
    this.users$ = this.usersQuery.selectAll();
  }

  toggleActive(user: User) {
    const updatedUser = { ...user, active: !user.active };
    this.usersService.updateUser(user.id, updatedUser);
  }

  openAddUserModal() {
    const dialogRef = this.dialog.open(UserAddModalComponent, {
      width: '400px',
      data: { form: this.addUserForm },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.addUser(result);
      }
    });
  }

  canAddUser(): Observable<boolean> {
    return combineLatest([
      this.usersQuery.selectAll(),
      this.usersQuery.selectCount(),
    ]).pipe(
      map(([users, count]) => {
        const allActive = users.every((user) => user.active);
        return allActive && count < 5;
      })
    );
  }

  asyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
    return new Observable<ValidationErrors | null>((observer) => {
      setTimeout(() => {
        if (control.value === 'existing_username') {
          observer.next({ uniqueName: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  };
}
