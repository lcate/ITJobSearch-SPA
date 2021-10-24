import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobOffer } from '../_Models/JobOffer';

@Component({
  selector: 'app-add-edit-job-offer-dialog',
  templateUrl: './add-edit-job-offer-dialog.component.html',
  styleUrls: ['./add-edit-job-offer-dialog.component.css']
})
export class AddEditJobOfferDialogComponent implements OnInit {

  experience = 'Any';
  position = 'Any';
  workHours = 'Any';
  workType = 'Any';
  salary = '';
  description = '';

  isEdit = false;

  public jobOffer: JobOffer = new JobOffer();

  constructor(private dialogRef: MatDialogRef<AddEditJobOfferDialogComponent>,
              @Inject(MAT_DIALOG_DATA) _data: any) {
                if (_data.jobOffer !== null) {
                  this.jobOffer = _data.jobOffer;
                  this.experience = this.jobOffer.experience;
                  this.position = this.jobOffer.position;
                  this.workHours = this.jobOffer.workHours;
                  this.workType = this.jobOffer.workType;
                  this.salary = this.jobOffer.salary;
                  this.description = this.jobOffer.description;
                }
                this.isEdit = _data.isEdit;
              }

  ngOnInit(): void {
  }

  addOrEditJobOffer() {
      this.jobOffer.experience = this.experience;
      this.jobOffer.position = this.position;
      this.jobOffer.workHours = this.workHours;
      this.jobOffer.workType = this.workType;
      this.jobOffer.salary = this.salary;
      this.jobOffer.description = this.description;

      this.dialogRef.close(this.jobOffer);
  }

  cancel() {
      this.dialogRef.close();
  }
}
