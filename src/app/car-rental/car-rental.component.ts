import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../service/search.service';
import { Cars, Destinations } from '../model/service-type';
import { Time } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';
import { CarRentalStorage } from '../service/common-interface';

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
  private minDate2: Date;
  private maxDate2 = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  private maxDate = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  private timeFrom: FormControl; // :Time={hours:this.dateForm.getHours(),minutes:this.dateForm.getMinutes()};
  private timeTo: FormControl;
  private minTime1 = this.timeFrom;
  private maxTime2 = this.maxDate.getTime();
  private searchPattern = '[A-Za-z ]*[(]?[A-Za-z]*[)]?[A-Za-z ,-]*';
  search = new FormControl(''  , [Validators.required, Validators.pattern(this.searchPattern)]
);
  searchTerm$ = new Subject<string>();
  error = false;
  errorMessage = '';
  loading = { error: false, errorMessage: '' };
  result: Destinations[] = [];

  constructor(private service: UsersService,
    private searchService: SearchService) {
      service.check.error = false;
    searchService.search(this.searchTerm$, 4, this.result);

  }

  ngOnInit() {
    this.dateTo.setHours(48);
    this.minDate2 = new Date(this.dateTo.toDateString());
    this.timeFrom = new FormControl('10:00');
    this.timeTo = new FormControl('11:00');
    try {
    const item = JSON.parse(localStorage.getItem('info#3')) as CarRentalStorage;
    if (localStorage.getItem('info#3')) {
      this.search.setValue(item.search);
      // checking if date on localstorage has already passed
      if (new Date(item.dateFrom).valueOf() > (new Date().valueOf() + 1000)) {
        console.log(new Date(item.dateFrom));
        this.dateForm = new Date(item.dateFrom);
        console.log(new Date(item.dateTo));
        this.dateTo = new Date(item.dateTo);
        console.log();
        this.timeFrom.setValue(item.timeFrom);
        this.timeTo.setValue(item.timeTo);
      }
    }
    } catch (Err) {
      console.log(Err);
    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    if (this.dateTo.valueOf() < event.value.valueOf()) {
      this.dateTo = new Date(event.value.toDateString());
      this.dateTo.setHours(24);

      if (this.maxDate2.valueOf() < this.dateTo.valueOf()) {
        this.dateTo = new Date(this.maxDate2.toDateString());
      }
      this.minDate2 = this.dateTo;
    } else
    if (this.dateTo.toDateString() === event.value.toDateString()) {
      this.dateTo = new Date(event.value.toDateString());
      this.dateTo.setHours(24);

      if (this.maxDate2.valueOf() < this.dateTo.valueOf()) {
        this.dateTo = new Date(this.maxDate2.valueOf());
      }

      this.minDate2 = this.dateTo;
    } else {
      this.minDate2 = new Date(event.value.toDateString());
      this.minDate2.setHours(24);
    }
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
        this.service.CarRentalDetails(this.search.value,
           this.dateForm, this.dateTo, this.timeFrom.value, this.timeTo.value, this.loading);
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
