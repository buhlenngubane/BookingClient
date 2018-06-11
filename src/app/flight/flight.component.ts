import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
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
  data: string[] = ['Economy', 'Premium Economy', 'Business', 'FirstClass'];
  searchTerm$ = new Subject<string>();
  searchTerm$2 = new Subject<string>();

  firstSearch = new FormControl('');
  secondSearch = new FormControl('');
  panel = new FormControl(this.data[0]);
  travellers = new FormControl('1');
  Type: string = this.data[0];

  dateFrom = new Date(); // new Date());
  dateTo: Date;
  minDate = this.dateFrom;
  minDate2: Date;
  maxDate2 = new Date(this.dateFrom.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateFrom.getFullYear() + 1, 6, 30);

  constructor(private service: UsersService,
    private searchService: SearchService) {
      // if(searchService.Clocation || searchService.dest)
      console.log('GetFlight');
      service.GetFlight(this.firstSearch, this.secondSearch)
      ;

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
    if ((this.firstSearch && !this.firstSearch.value.startsWith(' ') &&
    this.firstSearch.value.search(new RegExp('[0-9]', 'i')))
      && (this.secondSearch && !this.secondSearch.value.startsWith(' ') &&
      this.secondSearch.value.search(new RegExp('[0-9]', 'i')))
    ) {
      this.service.flightAbbrev = this.firstSearch.value;
      this.service.destAbbrev = this.secondSearch.value;

      console.log('LoadDetails');
      this.searchService.fDateFrom = this.dateFrom;
      this.searchService.fDateTo = this.dateTo;
      console.log('Must be ' + this.panel.value);
      this.searchService.flightType = this.panel.value;

      console.log('But is ' + this.searchService.flightType);
      this.searchService.numOfTravellers = this.travellers.value;
      this.service.SearchFlights(this.firstSearch.value, this.secondSearch.value);
  } else {
    // this.snack.open("Search Bar must contain letters")._dismissAfter(4000);
  }

  }
}
