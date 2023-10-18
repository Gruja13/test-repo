import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let userServiceMock: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);

    userServiceMock = mock(UserService);
    service = instance(userServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // GET Users
  it('should get users', (done) => {
    const mockUsers = [
      { id: 1, name: 'User 1', active: true },
      { id: 2, name: 'User 2', active: false },
    ];

    when(userServiceMock.getUsers()).thenReturn(of(mockUsers));

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });

    verify(userServiceMock.getUsers()).once();
  });

  // ADD User
  it('should add a user', (done) => {
    const newUser = { id: 3, name: 'User 3', active: true };

    when(userServiceMock.addUser(anything())).thenReturn(of(newUser));

    service.addUser(newUser).subscribe((addedUser) => {
      expect(addedUser).toEqual(newUser);
      done();
    });

    verify(userServiceMock.addUser(newUser)).once();
  });

  // UPDATE User
  it('should update a user', () => {
    const existingUsers = [
      { id: 1, name: 'User 1', active: true },
      { id: 2, name: 'User 2', active: false },
    ];
    const updatedUser = { id: 1, name: 'Updated User', active: false };

    when(userServiceMock.updateUser(updatedUser)).thenCall((user) => {
      existingUsers[0] = updatedUser;
    });

    service.updateUser(updatedUser);

    expect(existingUsers).toContain(updatedUser);
    expect(existingUsers).not.toContain({ id: 1, name: 'User 1', active: true });
  });

  // CHECK username uniquqness
  it('should check username uniqueness', (done) => {
    const username = 'User 1';
    const mockUsers = [
      { id: 1, name: 'User 1', active: true },
      { id: 2, name: 'User 2', active: false },
    ];

    spyOn(service, 'getUsers').and.returnValue(of(mockUsers));

    service.checkUsernameUniqueness(username).subscribe((isUnique) => {
      expect(isUnique).toBeFalsy();
      done();
    });
  });
});
