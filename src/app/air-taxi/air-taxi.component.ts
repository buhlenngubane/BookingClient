import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { UsersService } from '../service/user.service';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';
import { PickUps, dropOffs } from '../model/service-type';

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
@Component({selector: 'app-air-search-bar',
  templateUrl: './search.component.html',
styleUrls: ['./air-taxi.component.css']})
export class AirSearchBarComponent {
  firstSearch = new FormControl('');
  secondSearch = new FormControl('');
  search: string;
  searchTerm$ = new Subject<string>();
  searchTerm$2 = new Subject<string>();
  result1: PickUps[] = []; // =this.searchService.airSearch1;
  result2: dropOffs[] = []; // =this.searchService.airSearch2;
  dateFrom = new Date();
  minDate = this.dateFrom;
  returnDate = new Date();
  minDate2 = this.returnDate;
  maxDate2 = new Date(this.dateFrom.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateFrom.getFullYear() + 1, 7, 1);
  passengers = 1;
  change = this.searchService.navigate;
  timeFrom = new FormControl('10:00');
  timeTo = new FormControl('11:00');
  returnJ = false;

  constructor(private service: UsersService,
    private searchService: SearchService) {
    searchService.search(this.searchTerm$, 5, this.result1);
      searchService.search(this.searchTerm$2, 6, this.result2);
  }

  Find() {
    if ((this.firstSearch && !this.firstSearch.value.startsWith(' ') &&
    this.firstSearch.value.search(new RegExp('[0-9]', 'i')))
      && (this.secondSearch && !this.secondSearch.value.startsWith(' ') &&
      this.secondSearch.value.search(new RegExp('[0-9]', 'i')))
    ) {
      this.dateFrom.setHours(this.timeFrom.value.split(':')[0]);
      this.dateFrom.setMinutes(this.timeFrom.value.split(':')[1]);
      this.dateFrom.setSeconds(0, 0);
    this.searchService.aDateFrom = this.dateFrom;
    this.returnDate.setHours(this.timeTo.value.split(':')[0]);
    this.returnDate.setMinutes(this.timeTo.value.split(':')[1]);
    this.returnDate.setSeconds(0, 0);
    if (this.returnJ) {
    this.searchService.aDateReturn = this.returnDate;
    }
    this.searchService.numOfPassengers = this.passengers;
    this.searchService.AirTaxis(this.firstSearch.value, this.secondSearch.value);
    }
  }
}
