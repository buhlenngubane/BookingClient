import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { when } from 'q';
import { Flights } from '../model/service-type';
import { DISABLED, FormGroup } from '@angular/forms/src/model';
// tslint:disable-next-line:comment-format
//import { Flight } from '../model/service-type';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  constructor(
    private service: UsersService,
    private searchService: SearchService
  ) {
    searchService.success[1].success = false;

    service.check.error = false;

    service.GetFlight();
  }

  ngOnInit() {

  }

}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./flight.component.css']
})
export class SearchBarComponent implements OnInit {

  result: Flights[] = [];
  result2: Flights[] = [];
  id: number;
  private data: string[] = ['Economy', 'Premium Economy', 'Business', 'First Class'];
  searchTerm$ = new Subject<string>();
  searchTerm$2 = new Subject<string>();

  firstSearch = this.service.locale; // = this.service.form;
  secondSearch = this.service.dest; // = this.service.form2;

  panel = new FormControl(this.data[0]);
  travellers = new FormControl('1', [Validators.min(1), Validators.max(30)]);
  Type: string = this.data[0];
  numCount: [{number: number}];
  names: FormControl[];

  loading = {
    errorMessage: '', error: false, errorMessage2: '', error2: false,
    errorMessage3: ''
  };

  constructor(private service: UsersService,
    private searchService: SearchService, private _formBuilder: FormBuilder) {
    // if(searchService.Clocation || searchService.dest)
    console.log('GetFlight');
    service.check.error = false;
    // this.dateTo.setHours(48);
    if (service.FlightDetail.length === 0) {
      if (localStorage.getItem('info#2') ) {
        // checking if date on localstorage has already passed
        if (new Date(localStorage.getItem('info#2').split('*')[2]).valueOf() > (new Date().valueOf() + 1000)) {
        service.FdateFrom = new Date(localStorage.getItem('info#2').split('*')[2]);

        if (localStorage.getItem('info#2').split('*')[3] === 'false') {
          searchService.return = false;

          service.FdateTo = new Date(service.FdateFrom.toDateString());
          service.FdateTo.setHours(48);
          service.FminDate2 = new Date(service.FdateFrom.toDateString());
          service.FminDate2.setHours(48);
        } else {
          searchService.return = true;

          service.FdateTo = new Date(localStorage.getItem('info#2').split('*')[3]);
          service.FminDate2 = new Date(service.FdateFrom.toDateString());
          service.FminDate2.setHours(48);
        }

        this.panel.setValue(localStorage.getItem('info#2').split('*')[4]);
        console.log('Panel value ' + this.panel.value);
        this.searchService.flightType = this.panel.value;

        this.travellers.setValue(localStorage.getItem('info#2').split('*')[5]);
        console.log('Travellers: ' + this.travellers.value);
      }
    }
    } else if (localStorage.getItem('info#2')) {
        this.panel.setValue(localStorage.getItem('info#2').split('*')[4]);
        console.log('Panel value ' + this.panel.value);
        this.searchService.flightType = this.panel.value;

        this.travellers.setValue(localStorage.getItem('info#2').split('*')[5]);
        console.log('Travellers: ' + this.travellers.value);
    }
    searchService.search(this.searchTerm$, 2, this.result);
    searchService.search(this.searchTerm$2, 3, this.result2, this.firstSearch);
  }

  ngOnInit(): void {
  }

  swap(): void {
    console.log('swap');
    const temp = this.firstSearch.value;
    this.firstSearch.setValue(this.secondSearch.value);
    this.secondSearch.setValue(temp);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    console.log(
      this.service.FdateTo.getDay() +
      ' === ' + event.value.getDay() + ' ' +
      (this.service.FdateTo.toDateString() === event.value.toDateString()));
    if ((this.service.FdateTo.valueOf() < event.value.valueOf())) {
      // if (this.service.FdateTo.getDay() === event.value.getDay()) {
      this.service.FdateTo = new Date(event.value.toDateString());
      this.service.FdateTo.setHours(48);
      if (this.service.FmaxDate2.valueOf() < this.service.FdateTo.valueOf()) {
        this.service.FdateTo = new Date(this.service.FmaxDate2.toDateString());
      }
      this.service.FminDate2 = this.service.FdateTo;
      // }
    } else
      if (this.service.FdateTo.toDateString() === event.value.toDateString()) {
        this.service.FdateTo = new Date(event.value.toDateString());
        this.service.FdateTo.setHours(48);
        if (this.service.FmaxDate2.valueOf() < this.service.FdateTo.valueOf()) {
          this.service.FdateTo = new Date(this.service.FmaxDate2.toDateString());
        }
        this.service.FminDate2 = this.service.FdateTo;
      } else {
        this.service.FminDate2 = new Date(event.value.toDateString());
        this.service.FminDate2.setHours(48);
      }
  }

  LoadDetails(): void {

    if (
      !this.firstSearch.invalid && !this.secondSearch.invalid
    ) {
      console.log(JSON.stringify(this.firstSearch.errors) +
        ' or ' + JSON.stringify(this.secondSearch.errors));
      this.service.flightAbbrev = this.firstSearch.value;
      this.service.destAbbrev = this.secondSearch.value;

      console.log('LoadDetails');
      this.searchService.fDateFrom = this.service.FdateFrom;
      this.searchService.fDateTo = this.service.FdateTo;
      console.log('Must be ' + this.panel.value);
      this.searchService.flightType = this.panel.value;

      this.firstSearch.markAsTouched();
      this.secondSearch.markAsTouched();

      console.log('But is ' + this.searchService.flightType);
      this.searchService.numOfTravellers = this.travellers.value;
      this.searchService.return === true ?
        // this.result2.length === 0 ? this.loading.errorMessage = 'Flights unavailable' :
        this.service.SearchFlights(this.firstSearch.value,
          this.secondSearch.value, this.service.FdateFrom, this.service.FdateTo,
          this.panel.value, this.travellers.value, this.loading) :
        this.service.SearchFlights(this.firstSearch.value,
          this.secondSearch.value, this.service.FdateFrom, null, this.panel.value,
          this.travellers.value, this.loading);
    } else if (this.firstSearch.invalid) {

      this.firstSearch.markAsTouched();
      this.firstSearch.hasError('required') ? this.loading.errorMessage = 'Input required' :
        this.firstSearch.hasError('pattern') ? this.loading.errorMessage = 'Only letters required' :
          this.loading.errorMessage = '';
    } else if (this.secondSearch.invalid) {
      console.log('In hear ' + this.secondSearch.hasError('required') +
        ' _ ' + this.secondSearch.hasError('pattern'));
      this.secondSearch.markAsTouched();
      this.secondSearch.hasError('requred') ? this.loading.errorMessage2 = 'Input required' :
        this.secondSearch.hasError('pattern') ? this.loading.errorMessage2 = 'Only letters required' :
          this.loading.errorMessage2 = '';
    } else {
      this.travellers.hasError('min') ? this.loading.errorMessage3 = 'Minimum of 1 passanger' :
        this.loading.errorMessage3 = 'Maximum of 30 passengers';
    }

  }
}
