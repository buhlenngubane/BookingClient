import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Accommodations } from '../model/service-type';
import { SearchService } from '../service/search.service';
import { Subject } from 'rxjs/Subject';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';


@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease-out', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.2s ease-in', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.1s ease-in', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.1s 0.2s ease-out', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AccommodationComponent implements OnInit {

  accommodation = this.service.accommodations; // : Accommodations[];
  search: FormControl;
  searchPattern = '[A-Za-z ]{0,}[,]?[ A-Za-z ]{0,}';
  searchTerm$ = new Subject<string>();
  result: Accommodations[] = []; // = this.serviceSearch.accommodation;
  retry: string;
  private dateForm = new Date(); // new Date());
  private dateTo: Date;
  private minDate = this.dateForm;
  private minDate2: Date;
  private maxDate2 = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  private maxDate = new Date(this.dateForm.getFullYear() + 1, 6, 30);
  private diff;
  private year = new Date(this.dateForm).getFullYear();
  private month = (new Date(this.dateForm).getMonth());
  private day = new Date(this.dateForm).getDate();
  private panel = new FormControl('1 room');
  private Num = [{ text: ' room', number: 1 }];
  value1: any;
  value2: any;
  checkError = {error: false,
  errorMessage: ''};

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
    // this.accommodation.forEach(element => {
    //   this.images.push('data:image/jpeg;base64,' + element.picture);
    // });
    console.log(service.to + ' against ' + service.accommodations.length + ' against ' + this.accommodation.length);
  }

  ngOnInit() {
    this.dateTo = new Date();
    this.dateTo.setHours(48);

    if (this.dateForm && this.dateTo) {

      this.value1 = this.dateTo;
      this.value2 = this.dateForm;
      console.log(this.value1 + '  ' + this.value2);
      this.diff = Math.round((this.value1 - this.value2) / 1000 / 60 / 60 / 24);
      console.log('runned ' + this.diff);
      console.log((this.dateTo.valueOf()) / 1000 / 60 / 60 / 24 + '  ' + (this.dateForm.valueOf() / 1000 / 60 / 60 / 24));
      this.serviceSearch.Diff = this.diff;

    }
    this.minDate2 = new Date(this.dateTo.toDateString());
    console.log(this.datePipe.transform(this.dateForm, 'yyyy-MM-dd'));
    // this.dateForm.disable();
    // this.dateTo.disable();
  }

  Check() {
    console.log('MiddleClick!!!');
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
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

      if (this.dateTo.valueOf() < this.minDate2.valueOf()) {
        this.dateTo = new Date(this.minDate2.toDateString());
      }
    }
  }

  From() {
    if (this.service.from > 1) {
      this.service.from--;
    this.service.to--;
    }
  }

  To() {
    if (this.service.to < this.service.accommodations.length) {
    this.service.from++;
    this.service.to++;
    console.log(this.service.to + ' ' + this.service.accommodations.length);
    }
  }

  onFocus(s: string) {
    console.log(s);
    this.search.setValue(s);
  }

  Search(value: string): void {
    console.log('Value == ' + value);
    this.checkError.error = false;
    const display = this.service.accommodations.find(m => m.accId === +value);
    // const arr = this.search.value.split(', ');
    if (display) {
      this.search.setValue(display.country + ', ' + display.location);
      this.serviceSearch.SearchParam = this.search;
    }
    // if (this.accommodation) {
      this.serviceSearch.Search(this.dateForm, this.dateTo, this.panel, display);
    // }
  }

  LOG() {
    console.log('Logging!!!');
  }

  Find(search: FormControl): void {

    if (
      !this.search.invalid
  ) {
      const arr = this.search.value + '';
      const str = ' sdfd';
      let display = null;
      console.log(str.trim());
      if (!arr.includes(',')) {
       display =
       this.result.find(m =>
         m.country.includes(arr.split(',')[0].trim()) && m.location.includes(arr.split(',')[1])) ?
         this.result.find(m =>
          m.country.includes(arr.split(',')[0].trim()) && m.location.includes(arr.split(',')[1].trim())) :
      this.result.find(m => m.country.includes(search.value.trim()) || m.location.includes(search.value.trim())) ?
      this.result.find(m => m.country.includes(search.value.trim()) || m.location.includes(search.value.trim())) :
      this.result[0]
      ; }

      console.log(display);
      this.serviceSearch.SearchParam = this.search;

      if (display) {
        console.log('Should redirect ' + display.accId.toString());
        this.checkError.error = false;

        this.serviceSearch.Search(this.dateForm, this.dateTo, this.panel, display);
        search.setValue(display.country + ', ' + display.location);

      } else {
        this.checkError.error = false;

        this.serviceSearch.Search(this.dateForm, this.dateTo, this.panel, search);
      }
    } else if (search.untouched) {
      console.log('Untouched');
      search.markAsTouched();
      this.checkError.errorMessage = 'Please fill in search.';
    } else {
      this.checkError.error = false;
      const str = search.value + '';

      search.markAsPristine();
      search.hasError('required') ? this.checkError.errorMessage = 'Please fill in search.' :
      this.checkError.errorMessage = 'Input pattern invalid.';
      console.log('hear');
    }
  }

}
