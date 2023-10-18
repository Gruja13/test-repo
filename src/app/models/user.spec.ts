import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User(1, 'John Doe', true);
    expect(user).toBeTruthy();
  });
});
