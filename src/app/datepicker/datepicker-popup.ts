import {Component, OnInit, Input} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker-popup',
  templateUrl: './datepicker-popup.html'
})

export class DatepickerPopupComponent implements OnInit {
  model!: NgbDateStruct;

  @Input() placeholder!: string;

  constructor() { }

  ngOnInit() {
  }
}
