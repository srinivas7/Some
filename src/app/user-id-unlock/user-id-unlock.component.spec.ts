import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdUnlockComponent } from './user-id-unlock.component';

describe('UserIdUnlockComponent', () => {
  let component: UserIdUnlockComponent;
  let fixture: ComponentFixture<UserIdUnlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdUnlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
