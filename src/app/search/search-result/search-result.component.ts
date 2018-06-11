import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Property, Accommodation } from '../../service/common-interface';
import { Subject } from 'rxjs/Subject';
import { Properties, Accommodations } from '../../model/service-type';
import { UsersService } from '../../service/user.service';
import {MatSnackBar} from '@angular/material';
import { delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
// import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchTerm$ = new Subject<string>();
  result: Accommodations[] = [];
  id: number;
  search = this.searchService.SearchParam ? this.searchService.SearchParam : new FormControl('');
  prop: Properties[];
  dateForm = this.searchService.DateFrom ? this.searchService.DateFrom : new Date(); // new Date());
  dateTo = this.searchService.DateTo ? this.searchService.DateTo : new Date();
  panel = new FormControl(this.searchService.Panel ? this.searchService.Panel : '1 room');
  Num = this.searchService.Num ? this.searchService.Num : [{text: ' room', number: 1}];
  minDate = new Date();

  minDate2 = new Date(this.minDate.setDate(this.minDate.getDate() + 1));
  maxDate2 = new Date(2020, 0, 1);
  maxDate = new Date(this.maxDate.setDate(this.maxDate2.getDate() - 1));
  diff = this.searchService.Diff;
  constructor(
    private service: UsersService,
    private searchService: SearchService,
    public snackBar: MatSnackBar
  ) {
    console.log(this.diff + ' vs ' + searchService.Diff);
    console.log(this.panel + ' panel ' + this.panel);
    console.log(this.Num);
    const com = this.Num.filter(s => s.number === 3);
    console.log(searchService.SearchParam.value);
    // let Com=com as common;

    if (!searchService.Property) {
      searchService.GoBack('/home');
    } else {
      this.prop = searchService.Property;
    }

      searchService.search(this.searchTerm$, 1, this.result);
  }

  ngOnInit() {
    }

  ifLoggedIn(property: Properties) {
    // const str = 'accommodation';
    // this.searchService.Total('accommodation');
    // console.log(this.searchService.Total());
     this.service.serviceType = 'accommodation';
    console.log(property);
    if (this.service.User) {
    this.searchService.PaymentReceive('acc-detail',
    {Property: property,
      DateFrom: this.dateForm,
      DateTo: this.dateTo,
      str: this.panel.value});
    }
  }

}

