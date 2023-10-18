import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserTableComponent } from './components/table/user-table/user-table.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: [AppComponent, UserTableComponent],
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick();
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-test-project'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-test-project');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-test-project app is running!');
  });
});