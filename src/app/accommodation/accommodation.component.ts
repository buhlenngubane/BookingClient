import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Accommodations } from '../model/service-type';
import { SearchService } from '../service/search.service';
import { Subject } from 'rxjs/Subject';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {

  accommodation = this.service.accommodations; // : Accommodations[];
  search: FormControl;
  searchPattern = '[A-Za-z ]{0,}[,]?[ A-Za-z ]{0,}';
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
  error = false;
  errorMessage = '';

  constructor(
    private service: UsersService,
    private serviceSearch: SearchService,
    private datePipe: DatePipe,
    private _sanitizer: DomSanitizer
  ) {
    service.check.error = false;
      serviceSearch.success[0].success = false;
    // this.panel = this.Num[0].number + this.Num[0].text;
    // console.log(this.panel.value);
    // console.log(this.Num[0].number + " YES!!!!!!!!!!");
    this.search = new FormControl('', [Validators.required, Validators.pattern(this.searchPattern)]);
    for (let index = 1; index < 30; index++) {
      this.Num.push({ text: ' rooms', number: (index + 1) });
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

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    // const changeDate = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate());
    // changeDate.setHours(48);
    // this.dateTo = changeDate;
    // new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate() + 2);
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
    // if ((this.service.FdateTo.valueOf() < event.value.valueOf())) {
    //   // if (this.service.FdateTo.getDay() === event.value.getDay()) {
    //     this.service.FdateTo = new Date(event.value.toDateString());
    //     this.service.FdateTo.setHours(48);
    //     if (this.service.FmaxDate2.valueOf() < this.service.FdateTo.valueOf()) {
    //       this.service.FdateTo = new Date(this.service.FmaxDate2.toDateString());
    //     }
    //     this.service.FminDate2 = this.service.FdateTo;
    //   // }
    // } else
    // if (this.service.FdateTo.toDateString() === event.value.toDateString()) {
    //   this.service.FdateTo = new Date(event.value.toDateString());
    //   this.service.FdateTo.setHours(48);
    //   if (this.service.FmaxDate2.valueOf() < this.service.FdateTo.valueOf()) {
    //     this.service.FdateTo = new Date(this.service.FmaxDate2.toDateString());
    //   }
    //   this.service.FminDate2 = this.service.FdateTo;
    // } else {
    //   this.service.FminDate2 = new Date(event.value.toDateString());
    //   this.service.FminDate2.setHours(48);
    // }
  }

  Sanitize(image) {
    let str = '';
    str = image;
    console.log(str);
    console.log(image);
    return this._sanitizer.bypassSecurityTrustStyle(`url(${str})`);
  }

  Search(value: string): void {
    console.log('Value == ' + value);
    this.error = false;
    const display = this.service.accommodations.find(m => m.accId === +value);
    // const arr = this.search.value.split(', ');
    if (display) {
      this.search.setValue(display.country + ', ' + display.location);
      this.serviceSearch.SearchParam = this.search;
    }
    // if (this.accommodation) {
      this.serviceSearch.Search(this.dateForm, this.dateTo, this.panel.value, display);
    // }
  }

  Find(search: FormControl): void {

    if (
      !this.search.invalid
      // this.search && !this.search.value.startsWith(' ') && this.search.value.search(new RegExp('[0-9]', 'i'))
  ) {
      const arr = this.search.value.split(', ');
      console.log(arr);
      // search current result of searchString
      const display = this.service.accommodations.find(m => m.country === arr[0] && m.location === arr[1]);
      // this.result.splice(0).push(display);
      console.log(display);
      this.serviceSearch.SearchParam = this.search;

      if (display) {
        console.log('Should redirect ' + display.accId.toString());
        this.error = false;

        this.serviceSearch.Search(this.dateForm, this.dateTo, this.panel.value, display);
      } else {
        // search.setErrors(Validators.pattern(''));
        search.markAsUntouched();
        this.errorMessage = 'Accommodation not yet available';
        this.error = true;
        console.log('Set error ' + this.error);
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

}
