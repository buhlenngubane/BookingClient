import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { UsersService } from '../service/user.service';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';
import { PickUps, dropOffs } from '../model/service-type';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-air-taxi',
  templateUrl: './air-taxi.component.html',
  styleUrls: ['./air-taxi.component.css']
})
export class AirTaxiComponent implements OnInit {

  constructor(private service: UsersService,
    private searchService: SearchService) {
    searchService.navigate.nav = false;
  }

  ngOnInit() {
  }

}
@Component({
  selector: 'app-air-search-bar',
  templateUrl: './search.component.html',
  styleUrls: ['./air-taxi.component.css']
})
export class AirSearchBarComponent implements OnInit {

  private commonPattern = '[A-Za-z ,]*[(]?[A-Za-z]*[)]?[A-Za-z0-9 ,]*';
  firstSearch = new FormControl('', [Validators.required, Validators.pattern(this.commonPattern)]);
  secondSearch = new FormControl('', [Validators.required, Validators.pattern(this.commonPattern)]);
  search: string;
  searchTerm$ = new Subject<string>();
  searchTerm$2 = new Subject<string>();
  result1: PickUps[] = []; // =this.searchService.airSearch1;
  result2: dropOffs[] = []; // =this.searchService.airSearch2;
  dateFrom = new Date();
  minDate = this.dateFrom;
  returnDate = new Date();
  minDate2;
  maxDate2 = new Date(this.dateFrom.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateFrom.getFullYear() + 1, 7, 1);
  passengers = new FormControl('1', [Validators.required, Validators.min(1), Validators.max(30)]);
  change = this.searchService.navigate;
  str;
  timeFrom: FormControl;
  timeTo: FormControl;
  returnJ = false;
  minTime = new Date().getHours() + ':00';
  maxTime = new Date().getHours() + 1 + ':00';

  loading = { errorMessage: '', error: false, errorMessage2: '', error2: false, errorMessage3: '' };

  constructor(private service: UsersService,
    private searchService: SearchService) {
    this.dateFrom.setHours(24);
    // this.returnDate = this.dateFrom;
    this.returnDate.setHours(72);
    this.minDate2 = this.returnDate;
    // console.log(this.dateFrom);
    /*Trying to add 1 hour to current time*/
    this.str = (this.dateFrom.getHours() + 1);
    console.log(this.str);
    searchService.search(this.searchTerm$, 5, this.result1);
    searchService.search(this.searchTerm$2, 6, this.result2);
    if (localStorage.getItem('info#4')) {
      this.firstSearch.setValue(localStorage.getItem('info#4').split(':')[0]);
      this.secondSearch.setValue(localStorage.getItem('info#4').split(':')[1]);
    }
    console.log(new Date().getHours() + ':' + new Date().getMinutes());
  }

  ngOnInit(): void {
    if (this.str < 10) {
      this.timeFrom = new FormControl('0' + this.str + ':00');
      this.str === 9 ? this.timeTo = new FormControl('0' + (this.str + 1) + ':00') :
        this.timeTo = new FormControl('0' + (this.str + 1) + ':00');
      console.log('print this : ' + (this.str + 1) + ':00');
      // this.timeFrom = new FormControl('13:00');
    } else {
      this.timeFrom = new FormControl(this.str + ':00');
      this.timeTo = new FormControl(this.str + 1 + ':00');
    }
    console.log(this.timeFrom.value);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    this.returnDate = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate() + 2);
    this.minDate2 = this.returnDate;
  }

  Find() {
    if (!this.firstSearch.invalid &&
      !this.secondSearch.invalid && !this.passengers.invalid) {
      /*Set from date time*/
      this.dateFrom.setHours(this.timeFrom.value.split(':')[0]);
      this.dateFrom.setMinutes(this.timeFrom.value.split(':')[1]);
      this.dateFrom.setSeconds(0, 0);

      this.searchService.aDateFrom = this.dateFrom;

      /*Set return date time*/
      this.returnDate.setHours(this.timeTo.value.split(':')[0]);
      this.returnDate.setMinutes(this.timeTo.value.split(':')[1]);
      this.returnDate.setSeconds(0, 0);

      if (this.returnJ) {
        this.searchService.aDateReturn = this.returnDate;
      }
      this.searchService.numOfPassengers = this.passengers.value;

      console.log((this.result1.length === 0) + ' ' + (this.result2.length === 0));

      this.loading.error = true;

      this.firstSearch.markAsUntouched();

      // this.result1.length === 0 ? this.loading.errorMessage = 'AirTaxi not yet available.' :
        // this.result2.length === 0 ? this.loading.errorMessage = 'AirTaxi not yet available' :
          this.searchService.AirTaxis(this.firstSearch.value, this.secondSearch.value, this.loading);

    } else if (this.firstSearch.invalid) {
      this.loading.error = false;

      this.firstSearch.markAsTouched();

      console.log(this.firstSearch.hasError('required'));

      this.firstSearch.hasError('required') ? this.loading.errorMessage = 'Input required' :
        this.firstSearch.hasError('pattern') ? this.loading.errorMessage = 'Input pattern invalid' :
          this.loading.errorMessage = '';

    } else if (this.secondSearch.invalid) {
      this.loading.error = false;
      console.log('In hear ' + this.secondSearch.hasError('required')
        + ' _ ' + this.secondSearch.hasError('pattern'));

      this.secondSearch.markAsTouched();

      this.secondSearch.hasError('requred') ? this.loading.errorMessage2 = 'Input required' :
        this.secondSearch.hasError('pattern') ? this.loading.errorMessage2 = 'Input pattern invalid' :
          this.loading.errorMessage2 = '';

    } else if (this.passengers.invalid) {
      this.passengers.hasError('min') ? this.loading.errorMessage3 = '1 passenger minimum.' :
        this.loading.errorMessage3 = '30 passengers maximum';
    } else {
      console.log('In hear ' + this.firstSearch.hasError('required') + ' _ ' + this.firstSearch.hasError('pattern'));
    }
  }
}
