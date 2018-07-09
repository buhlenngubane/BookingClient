import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Accommodations } from '../model/service-type';
import { SearchService } from '../service/search.service';
import { Subject } from 'rxjs/Subject';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material';
import { NgxGalleryAnimation } from 'ngx-gallery';

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
    // this.accommodation.forEach(element => {
    //   this.images.push('data:image/jpeg;base64,' + element.picture);
    // });
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

  // Sanitize(image) {
  //   let str = '';
  //   str = image;
  //   console.log(str);
  //   console.log(image);
  //   return this._sanitizer.bypassSecurityTrustStyle(`url(${str})`);
  // }

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
      this.serviceSearch.Search(this.dateForm, this.dateTo, this.panel, display);
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

        this.serviceSearch.Search(this.dateForm, this.dateTo, this.panel, display);
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
