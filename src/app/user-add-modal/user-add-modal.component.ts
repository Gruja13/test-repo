import { FormBuilder, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.scss']
})
export class UserAddModalComponent {
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserAddModalComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService 
  ) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [this.uniqueNameValidator()],
          updateOn: 'blur',
        },
      ],
      active: false,
    });
  }

  addUser() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  uniqueNameValidator(): AsyncValidatorFn {
    return (control) => {
      const name = control.value as string;
      return this.userService.checkNameUniqueness(name).pipe(
        debounceTime(300),
        switchMap((isUnique) => {
          return isUnique ? of(null) : of({ nameNotUnique: true });
        })
      );
    };
  }
}
