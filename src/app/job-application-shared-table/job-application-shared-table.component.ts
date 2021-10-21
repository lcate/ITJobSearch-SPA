import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-application-shared-table',
  templateUrl: './job-application-shared-table.component.html',
  styleUrls: ['./job-application-shared-table.component.css']
})
export class JobApplicationSharedTableComponent implements OnInit {

  @Input() jobApplications: any;
  @Input() isCompanyUser!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
