import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationForOfferComponent } from './job-application-for-offer.component';

describe('JobApplicationForOfferComponent', () => {
  let component: JobApplicationForOfferComponent;
  let fixture: ComponentFixture<JobApplicationForOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationForOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationForOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
