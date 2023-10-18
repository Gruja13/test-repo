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
    this.loadUsersFromLocalStorage(); // Load users from local storage on initialization
  }

  // Helper function to load users from local storage
  private loadUsersFromLocalStorage() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.usersSubject.next(JSON.parse(storedUsers));
    } else {
      // Initialize with some default data if local storage is empty
      this.usersSubject.next([
        { id: 1, name: 'User 1', active: true },
        { id: 2, name: 'User 2', active: false },
        { id: 3, name: 'User 3', active: false },
      ]);
    }
  }

  // Helper function to save users to local storage
  private saveUsersToLocalStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
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
        this.saveUsersToLocalStorage(updatedUsers); // Save to local storage
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
    this.saveUsersToLocalStorage(updatedUsers); // Save to local storage
  }

  checkUsernameUniqueness(username: string): Observable<boolean> {
    return this.users$.pipe(
      map(users => !users.some(user => user.name === username)),
      delay(1000)
    );
  }
}
