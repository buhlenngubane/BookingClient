import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Subject } from 'rxjs/Subject';
import { Properties, Accommodations } from '../../model/service-type';
import { UsersService } from '../../service/user.service';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
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
  search = this.searchService.SearchParam ? this.searchService.SearchParam : new FormControl('');
  private accommodation = this.service.accommodations;
  private prop: Properties[];
  private dateForm = this.searchService.DateFrom ? this.searchService.DateFrom : new Date();
  private dateTo = this.searchService.DateTo ? this.searchService.DateTo : new Date();
  private panel = new FormControl(this.searchService.Panel ? this.searchService.Panel : '1 room');
  private Num = this.searchService.Num ? this.searchService.Num : [{ text: ' room', number: 1 }];
  private minDate = new Date();

  private minDate2 = new Date(this.minDate.getDate() + 1);
  private maxDate = new Date(2020, 0, 1);
  private maxDate2 = new Date(this.maxDate.getDate() + 1);
  private propCount;

  private error = false;
  private errorMessage = '';
  private navigationSubscription;
  constructor(
    private service: UsersService,
    private searchService: SearchService,
    public snackBar: MatSnackBar,
    private route: Router
  ) {
    // console.log(this.diff + ' vs ' + searchService.Diff);
    console.log(this.searchService.DateTo);
    console.log(this.panel + ' panel ' + this.panel);
    console.log(this.Num);

    // const com = this.Num.filter(s => s.number === 3);

    console.log(searchService.SearchParam.value);
    // let Com=com as common;

    if (service.accommodations.length === 0) {
      localStorage.getItem('info#1') ?
      this.searchService.Search(+localStorage.getItem('info#1').split(':')[1],
       this.dateForm,
        this.dateTo,
         this.panel.value,
          this.search) :
      searchService.GoBack('/home');

      this.prop = searchService.Property;
      console.log('Going Home');
    } else {
      console.log('Getting' + JSON.stringify(searchService.Property));
      this.prop = searchService.Property;
    }
    searchService.search(this.searchTerm$, 1, this.result);

    if (this.prop) {
    this.propCount = this.prop.length;
    }
  }

  ngOnInit() {
    this.dateForm.getDate() === this.dateTo.getDate() ?
     this.dateTo.setHours(48) :
      this.dateTo.getHours();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const changeDate = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate());
    changeDate.setHours(48);
    this.dateTo = changeDate;
    this.minDate2 = this.dateTo;
  }

  show() {console.log(JSON.stringify(this.searchService.Property));
    // this.prop = this.searchService.Property;
    console.log(JSON.stringify(this.prop) + this.prop.length); }

  Find(search: FormControl): void {

    if (
      !this.search.invalid
  ) {
    try {
      const arr = this.search.value.split(', ');
      console.log(arr);
      // console.log(this.result.find(m => m.country == arr[0] && m.location == arr[1]));
      const display = this.service.accommodations.find(m => m.country === arr[0] && m.location === arr[1]);
      // this.result.splice(0).push(display);
      console.log(display);
      this.searchService.SearchParam = this.search.value;
      if (display) {
        console.log('Should redirect ' + display.accId.toString());
        this.error = false;
        this.searchService.Search(display.accId, this.dateForm, this.dateTo, this.panel.value);
      } else {
        search.markAsUntouched();
        this.errorMessage = 'Accommodation not yet available';
        this.error = true;
        console.log('Set error ' + this.error);
      }
    } catch (error) {
      console.error(error);
    }
    } else if (search.untouched) {
      console.log('Untouched');
      search.markAsTouched();
      this.errorMessage = 'Please fill in search.';
    } else {
      this.error = false;
      const str = search.value + '';

      search.markAsPristine();
      search.hasError('required') ? this.errorMessage = 'Please fill in search.' :
      this.errorMessage = 'Input pattern invalid.';
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
    }
  }

}

