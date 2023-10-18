import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  const matDialogRefStub = {
    close: () => {},
    afterClosed: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub }
      ],
      imports: [
        MatDialogModule,
        MatTableModule
      ]
    });

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});