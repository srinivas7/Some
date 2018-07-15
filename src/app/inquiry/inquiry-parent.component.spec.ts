import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryParentComponent } from './inquiry-parent.component';

describe('InquiryParentComponent', () => {
  let component: InquiryParentComponent;
  let fixture: ComponentFixture<InquiryParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
