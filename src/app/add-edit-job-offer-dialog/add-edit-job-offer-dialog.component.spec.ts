import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobOfferDialogComponent } from './add-edit-job-offer-dialog.component';

describe('AddEditJobOfferDialogComponent', () => {
  let component: AddEditJobOfferDialogComponent;
  let fixture: ComponentFixture<AddEditJobOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditJobOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditJobOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
