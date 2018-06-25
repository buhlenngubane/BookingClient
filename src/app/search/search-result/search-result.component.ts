import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Subject } from 'rxjs/Subject';
import { Properties, Accommodations } from '../../model/service-type';
import { UsersService } from '../../service/user.service';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchTerm$ = new Subject<string>();
  result: Accommodations[] = [];
  id: number;
  private searchPattern = '[A-Za-z ]{0,}[,]?[ A-Za-z ]{0,}';
  search = this.searchService.SearchParam ? this.searchService.SearchParam :
   new FormControl('', [Validators.required, Validators.pattern(this.searchPattern)]);
  private accommodation = this.service.accommodations;
  private prop: Properties[];
  private dateForm = this.searchService.DateFrom ? this.searchService.DateFrom : new Date();
  private dateTo = this.searchService.DateTo ? this.searchService.DateTo : new Date();
  private panel = new FormControl(this.searchService.Panel ? this.searchService.Panel : '1 room');
  private Num = this.searchService.Num ? this.searchService.Num : [{ text: ' room', number: 1 }];
  private minDate = new Date();

  private minDate2 = new Date(this.minDate.getDate() + 1);
  private maxDate = new Date(2020, 0, 1);
  private maxDate2 = new Date(2020, 0, 3);
  private overral_price = [];

  // private error = false;
  // private errorMessage = '';
  errorCheck = {error: false, errorMessage: ''};
  private navigationSubscription;
  constructor(
    private service: UsersService,
    private searchService: SearchService,
    public snackBar: MatSnackBar,
    private route: Router
  ) {
    for (let index = 1; index < 30; index++) {
      this.Num.push({ text: ' rooms', number: (index + 1) });
    }

    if (service.accommodations.length === 0) {
      if (localStorage.getItem('info#1')) {
        this.searchService.Search(
          this.dateForm,
          this.dateTo,
            this.panel.value,
            {country: localStorage.getItem('info#1').split(', ')[0],
              location: localStorage.getItem('info#1').split(', ')[1]}, this.errorCheck);

           this.search.setValue(localStorage.getItem('info#1'));
      }
      // else {
      //   searchService.GoBack('/home');
      // }

      this.prop = searchService.Property;
      console.log('Going Home');
    } else {
      console.log('Getting' + JSON.stringify(searchService.Property));
      this.prop = searchService.Property;
    }
    searchService.search(this.searchTerm$, 1, this.result);

    if (this.prop) {
      this.overral_price.splice(0);
      this.prop.forEach(
        element => {
          this.overral_price.push(element.accDetail[0].pricePerNight * +this.panel.value);
        }
      );
      console.log(this.overral_price[0]);
    // this.propCount = this.prop.length;
    }
  }

  ngOnInit() {
    this.dateForm.getDate() === this.dateTo.getDate() ?
     this.dateTo.setHours(48) :
      this.dateTo.getHours();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // const changeDate = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate());
    // changeDate.setHours(48);
    // this.dateTo = changeDate;
    // this.minDate2 = this.dateTo;

    if (this.dateTo.valueOf() < event.value.valueOf()) {
      this.dateTo = new Date(event.value.toDateString());
      this.dateTo.setHours(48);

      if (this.maxDate2.valueOf() < this.dateTo.valueOf()) {
        this.dateTo = new Date(this.maxDate2.toDateString());
      }
      this.minDate2 = this.dateTo;
    } else
    if (this.dateTo.toDateString() === event.value.toDateString()) {
      this.dateTo = new Date(event.value.toDateString());
      this.dateTo.setHours(48);

      if (this.maxDate2.valueOf() < this.dateTo.valueOf()) {
        this.dateTo = new Date(this.maxDate2.valueOf());
      }

      this.minDate2 = this.dateTo;
    } else {
      this.minDate2 = new Date(event.value.toDateString());
      this.minDate2.setHours(48);
    }
  }

  Find(search: FormControl): void {

    if (
      !this.search.invalid
  ) {
      // if (search.value.includes(',')) {
      // const arr = this.search.value.split(', ')+'';
      // console.log(arr);
      // console.log(this.result.find(m => m.country == arr[0] && m.location == arr[1]));
      // const display = this.service.accommodations.find(m => m.country === arr[0] && m.location === arr[1]);
      // this.result.splice(0).push(display);
      this.searchService.SearchParam = this.search;
      // if (display) {
        // console.log('Should redirect ' + display.accId.toString());
        this.errorCheck.error = false;
        this.searchService.Search(this.dateForm, this.dateTo, this.panel.value,
           search, this.errorCheck);
      // } else {
      // }
    // }
    } else if (search.untouched) {
      console.log('Untouched');
      search.markAsTouched();
      this.errorCheck.errorMessage = 'Please fill in search.';
    } else {
      this.errorCheck.error = false;
      const str = search.value + '';

      search.markAsPristine();
      search.hasError('required') ? this.errorCheck.errorMessage = 'Please fill in search.' :
      this.errorCheck.errorMessage = 'Input pattern invalid.';
      console.log('hear');
    }
  }

  ifLoggedIn(property: Properties) {
    this.service.serviceType = 'accommodation';
    console.log(property);
    if (this.service.User) {
      this.searchService.PaymentReceive('acc-detail',
        {
          Property: property,
          DateFrom: this.dateForm,
          DateTo: this.dateTo,
          str: this.panel.value
        });
    } else {
      this.service.check.errorMessage = 'Login or Register to book';
      this.service.check.error = true;
    }
  }

}

