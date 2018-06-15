import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../service/search.service';
import { Cars, Destinations } from '../model/service-type';
import { Time } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {

  carRentalDtls = this.service.CarRentalDtls;
  private dateForm = new Date(); // new Date());
  private dateTo = new Date();
  private minDate = this.dateForm;
  private minDate2 = this.dateTo;
  private maxDate2 = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  private maxDate = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  private timeFrom: FormControl; // :Time={hours:this.dateForm.getHours(),minutes:this.dateForm.getMinutes()};
  private timeTo: FormControl;
  private minTime1 = this.timeFrom;
  private maxTime2 = this.maxDate.getTime();
  private searchPattern = '[A-Za-z ]*[(]?[A-Za-z]*[)]?[A-Za-z ,]*';
  search = new FormControl(''  , [Validators.required, Validators.pattern(this.searchPattern)]
);
  searchTerm$ = new Subject<string>();
  error = false;
  errorMessage = '';
  loading = { error: false, errorMessage: '' };
  str;
  // panel=new FormControl("1 room");
  // hour1=new FormControl("10");
  // minute1=new FormControl("00");
  // hour2=new FormControl("10");
  // minute2=new FormControl("00");
  // timeIntervalH = [];
  // timeIntervalM = [{number:"00"},{number:"15"},{number:"30"},{number:"45"}]
  result: Destinations[] = [];

  constructor(private service: UsersService,
    private searchService: SearchService) {
    if (localStorage.getItem('info#3')) {
      this.search.setValue(localStorage.getItem('info#3'));
    }
      /*Trying to add 1 hour to current time*/
    this.str = (this.dateForm.getHours() + 1);
    searchService.search(this.searchTerm$, 4, this.result);

  }

  ngOnInit() {
    this.dateTo.setHours(48);

    if (this.str < 10) {
      this.timeFrom = new FormControl('0' + this.str + ':00');
      this.str === 9 ? this.timeTo = new FormControl('0' + (this.str + 1) + ':00') :
        this.timeTo = new FormControl('0' + (this.str + 1) + ':00');
        console.log('print this : ' + (this.str + 1) + ':00');
    } else {
      this.timeFrom = new FormControl(this.str + ':00');
      this.timeTo = new FormControl(this.str + 1 + ':00');
    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    this.dateTo = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate() + 2);
    this.minDate2 = this.dateTo;
  }

  // tslint:disable-next-line:member-ordering
  time: Time = { hours: 12, minutes: 3 };
  Find() {
    if (!this.search.invalid) {
      const hour = this.timeFrom.value + '';
      const hour2 = this.timeTo.value;

      console.log(this.time.valueOf());
      /*Set user input time and upate dateFrom*/
      this.dateForm.setHours(+hour.split(':')[0]);
      this.dateForm.setMinutes(+hour.split(':')[1]);
      this.dateForm.setSeconds(0, 0);
      console.log(+hour.split(':')[0]);
      /*Set user input time and upate dateTo*/
      this.searchService.cDateFrom = this.dateForm;
      this.dateTo.setHours(+hour2.split(':')[0]);
      this.dateTo.setMinutes(+hour2.split(':')[1]);
      this.dateTo.setSeconds(0, 0);
      this.searchService.cDateReturn = this.dateTo;

      console.log('Time is ' + this.timeFrom.value);
      console.log(this.dateForm);
      console.log(this.dateTo);

      this.service.search = this.search.value;

      this.search.markAsUntouched();

      // this.loading.errorMessage = 'Rental not yet available';

      console.log(this.carRentalDtls.length);

      // this.carRentalDtls.length === 0 ? this.loading.error = true :
        this.service.CarRentalDetails(this.search.value, this.loading);
    } else if (this.search.untouched) {
      console.log('Untouched?');
      this.loading.error = false;

      this.search.markAsTouched();

      this.errorMessage = 'Input required.';
      this.error = true;
    } else {
      console.log('In hear ');
      this.loading.error = false;

      this.search.markAsPristine();

      this.search.hasError('required') ? this.errorMessage = 'Input required' :
        this.errorMessage = 'incorrect pattern used.';
    }

  }

}
