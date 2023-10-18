import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();
  
  constructor() {
    this.usersSubject.next([
      { id: 1, name: 'User 1', active: true },
      { id: 2, name: 'User 2', active: false },
      { id: 3, name: 'User 3', active: false },
    ]);
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: User): Observable<User> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = [...currentUsers, user];
        this.usersSubject.next(updatedUsers);

        return user;
      })
    );
  }

  updateUser(updatedUser: User): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    this.usersSubject.next(updatedUsers);
  }

  checkUsernameUniqueness(username: string): Observable<boolean> {
    return this.users$.pipe(
      map(users => !users.some(user => user.name === username)),
      delay(1000)
    );
  }
}
