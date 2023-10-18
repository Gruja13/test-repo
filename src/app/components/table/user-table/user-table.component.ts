import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../../modals/add-user/add-user.component';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  canAddUser$: Observable<boolean> = new Observable<boolean>();

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users$.next(users);
      this.canAddUser$ = this.canAddUserObservable();
    });
  }

  displayedColumns: string[] = ['id', 'name', 'active'];

  toggleUserActive(user: User): void {
    user.active = !user.active;
    this.userService.updateUser(user);
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.userService.addUser(result);
  
        this.users$.next([...this.users$.value, result]);
      }
    });
  }

  canAddUserObservable(): Observable<boolean> {
    return combineLatest([this.users$, this.users$.pipe(map(users => users.length))]).pipe(
      map(([users, userCount]) => {
        if (!users) {
          return false;
        }
  
        const allActive = users.every(user => user.active);
        const isUnderLimit = userCount < 5;
  
        return allActive && isUnderLimit;
      })
    );
  }
  
}
