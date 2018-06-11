import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Accommodations } from '../model/service-type';
import { SearchService } from '../service/search.service';
import { Subject } from 'rxjs/Subject';
import { Accommodation, Property } from '../service/common-interface';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {

  accommodation = this.service.accommodations; // : Accommodations[];
  search = new FormControl('');
  searchTerm$ = new Subject<string>();
  result: Accommodations[] = []; // = this.serviceSearch.accommodation;
  retry: string;
  dateForm = new Date(); // new Date());
  dateTo: Date;
  minDate = this.dateForm;
  minDate2: Date;
  maxDate2 = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateForm.getFullYear() + 1, 6, 30);
  diff;
  year = new Date(this.dateForm).getFullYear();
  month = (new Date(this.dateForm).getMonth());
  day = new Date(this.dateForm).getDate();
  panel = new FormControl('1 room');
  Num = [{ text: ' room', number: 1 }];
  value1: any;
  value2: any;
  error: boolean;
  errorStatus = '';

  constructor(
    private service: UsersService,
    private serviceSearch: SearchService,
    private datePipe: DatePipe
  ) {
      serviceSearch.success[0].success = false;
    // this.panel = this.Num[0].number + this.Num[0].text;
    // console.log(this.panel.value);
    // console.log(this.Num[0].number + " YES!!!!!!!!!!");
    for (let index = 1; index < 30; index++) {
      // this.Num=new Object()[index]=[{name:"sting"}];
      /*if(index==0)

      else*/
      this.Num.push({ text: ' rooms', number: (index + 1) });
      // serviceSearch.Num.push({text:" rooms",number:(index+1)});
      // console.log(this.Num[index].number);
    }
    serviceSearch.Num = this.Num;
    // console.log(JSON.stringify(serviceSearch.Num))
    serviceSearch.Panel = this.panel.value;

    // if(!service.initailized)
    // tslint:disable-next-line:no-unused-expression
    service.GetAccommodation;


    serviceSearch.search(this.searchTerm$, 1, this.result);
  }

  ngOnInit() {
    this.dateTo = new Date(/*this.year*/this.service.year, this.service.month, this.service.day);

    if (this.dateForm && this.dateTo) {

      this.value1 = this.dateTo;
      this.value2 = this.dateForm;
      console.log(this.value1 + '  ' + this.value2);
      this.diff = Math.round((this.value1 - this.value2) / 1000 / 60 / 60 / 24);
      console.log('runned ' + this.diff);
      console.log((this.dateTo.valueOf()) / 1000 / 60 / 60 / 24 + '  ' + (this.dateForm.valueOf() / 1000 / 60 / 60 / 24));
      this.serviceSearch.Diff = this.diff;

    }
    this.minDate2 = this.dateTo;
    console.log(this.datePipe.transform(this.dateForm, 'yyyy-MM-dd'));
    // this.dateForm.disable();
    // this.dateTo.disable();
  }

  Search(value: string): void {
    console.log('Value == ' + value);
    this.error = false;
    if (this.accommodation) {
      this.serviceSearch.Search(value, this.search, this.dateForm, this.dateTo, this.panel.value, this.accommodation);
    }
  }

  Find(): void {

    if (this.search && !this.search.value.startsWith(' ') && this.search.value.search(new RegExp('[0-9]', 'i'))) {
      const arr = this.search.value.split(', ');
      console.log(arr);
      // console.log(this.result.find(m => m.country == arr[0] && m.location == arr[1]));
      const display = this.serviceSearch.accommodation.find(m => m.country === arr[0] && m.location === arr[1]);
      // this.result.splice(0).push(display);
      console.log(display);
      this.serviceSearch.SearchParam = this.search.value;
      if (display) {
        console.log('Should redirect ' + display.accId.toString());
        this.error = false;
        this.serviceSearch.Search(display.accId.toString(),
        this.search, this.dateForm, this.dateTo, this.panel.value, this.accommodation);
      }
    } else {
      this.service.check.errorMessage = 'Search bar(letters only)';
      this.service.check.error = true;
      console.log('hear');
      // if(this.search)
      // console.log("In Errors "+ !this.search.search(new RegExp(/^[A-Za-z]/,"i")) + " " +!this.search.startsWith(" "));
    }
  }

}
