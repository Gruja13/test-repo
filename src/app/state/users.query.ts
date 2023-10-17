import { QueryEntity } from '@datorama/akita'; // Import the UserStore and UserState
import { User } from '../models/user.model';
import { UserState, UserStore } from '../store/user.store';

export class UsersQuery extends QueryEntity<UserState, User> {
  constructor(protected override store: UserStore) {
    super(store);
  }
}