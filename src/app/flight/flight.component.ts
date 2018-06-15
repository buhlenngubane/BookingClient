import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { when } from 'q';
import { Flights } from '../model/service-type';
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
export class SearchBarComponent {

  result: Flights[] = [];
  result2: Flights[] = [];
  id: number;
  private data: string[] = ['Economy', 'Premium Economy', 'Business', 'FirstClass'];
  searchTerm$ = new Subject<string>();
  searchTerm$2 = new Subject<string>();

  firstSearch = this.service.form;
  secondSearch = this.service.form2;

  panel = new FormControl(this.data[0]);
  travellers = new FormControl('1');
  Type: string = this.data[0];

  dateFrom = new Date(); // new Date());
  dateTo: Date;
  minDate = this.dateFrom;
  minDate2: Date;
  maxDate2 = new Date(this.dateFrom.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateFrom.getFullYear() + 1, 6, 30);

  loading = { errorMessage: '', error: false, errorMessage2: '', error2: false };

  constructor(private service: UsersService,
    private searchService: SearchService) {
    // if(searchService.Clocation || searchService.dest)
    console.log('GetFlight');

    if (localStorage.getItem('info#2')) {
      this.firstSearch.setValue(localStorage.getItem('info#2').split(':')[0]);
      this.secondSearch.setValue(localStorage.getItem('info#2').split(':')[1]);
    }

    searchService.search(this.searchTerm$, 2, this.result);
    searchService.search(this.searchTerm$2, 3, this.result2, this.firstSearch);

    this.dateTo = new Date(this.service.year, this.service.month, this.service.day);
    this.minDate2 = this.dateTo;

  }

  swap(): void {
    console.log('swap');
    const temp = this.firstSearch.value;
    this.firstSearch.setValue(this.secondSearch.value);
    this.secondSearch.setValue(temp);
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
      this.searchService.fDateFrom = this.dateFrom;
      this.searchService.fDateTo = this.dateTo;
      console.log('Must be ' + this.panel.value);
      this.searchService.flightType = this.panel.value;

      console.log('But is ' + this.searchService.flightType);
      this.searchService.numOfTravellers = this.travellers.value;
      // this.result.length === 0 ? this.loading.errorMessage = 'Flights unavailable' :
      // this.result2.length === 0 ? this.loading.errorMessage = 'Flights unavailable' :
      this.service.SearchFlights(this.firstSearch.value,
        this.secondSearch.value, this.dateFrom, this.dateTo, this.loading);
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

      console.log('In hear ' + this.firstSearch.hasError('required') + ' _ ' + this.firstSearch.hasError('pattern'));
    }

  }
}
