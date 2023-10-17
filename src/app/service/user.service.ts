import { Injectable } from '@angular/core';
import { UserStore } from '../store/user.store';
import { User } from '../models/user.model';
import { ID } from '@datorama/akita';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  [x: string]: any;
  constructor(private userStore: UserStore) {}

  addUser(user: User) {
    this.userStore.add(user);
  }

  updateUser(id: ID, user: Partial<User>) {
    this.userStore.update(id, user);
  }

  deleteUser(id: string) {
    this.userStore.remove(id);
  }

  checkNameUniqueness(name: string): Observable<boolean> {
    // Simulate checking name uniqueness against some data (e.g., existing user names)
    const isUnique = !this['existingUserNames'].includes(name);

    // Return an observable with the result (true if the name is unique, false otherwise)
    return of(isUnique);
  }
}