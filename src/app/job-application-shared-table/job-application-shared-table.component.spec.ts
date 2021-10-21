import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationSharedTableComponent } from './job-application-shared-table.component';

describe('JobApplicationSharedTableComponent', () => {
  let component: JobApplicationSharedTableComponent;
  let fixture: ComponentFixture<JobApplicationSharedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationSharedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationSharedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
