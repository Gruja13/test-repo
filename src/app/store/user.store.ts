import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../models/user.model';

export interface UserState extends EntityState<User> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' }) 
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super();
    this.set([
      { id: '1', name: 'User 1', active: true },
      { id: '2', name: 'User 2', active: false },
      // Add more initial users here
    ]);
  }
}