import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsfileuploaderComponent } from './dmcsfileuploader.component';

describe('DmcsfileuploaderComponent', () => {
  let component: DmcsfileuploaderComponent;
  let fixture: ComponentFixture<DmcsfileuploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsfileuploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsfileuploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
