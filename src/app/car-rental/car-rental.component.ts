import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../service/search.service';
import { CarRental } from '../service/common-interface';
import { Cars, Destinations } from '../model/service-type';
import { Time } from '@angular/common';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {

  carRentalDtls = this.service.CarRentalDtls;
  dateForm = new Date(); // new Date());
  dateTo = new Date();
  minDate = this.dateForm;
  minDate2 = this.dateTo;
  maxDate2 = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  timeFrom = new FormControl('10:00'); // :Time={hours:this.dateForm.getHours(),minutes:this.dateForm.getMinutes()};
  timeTo = new FormControl('11:00');
  minTime1 = this.timeFrom;
  maxTime2 = this.maxDate.getTime();
  search: string;
  searchTerm$ = new Subject<string>();
  // panel=new FormControl("1 room");
  // hour1=new FormControl("10");
  // minute1=new FormControl("00");
  // hour2=new FormControl("10");
  // minute2=new FormControl("00");
  // timeIntervalH = [];
  // timeIntervalM = [{number:"00"},{number:"15"},{number:"30"},{number:"45"}]
  result: Destinations[] = [];

  constructor(private service: UsersService,
  private searchService: SearchService) {
    // for (let index = 0; index < 24; index++) {
    //   if(index<10)
    //   this.timeIntervalH.push({number:"0"+index});
    //   else
    //   this.timeIntervalH.push({number:""+index});
    // }

    searchService.search(this.searchTerm$, 4, this.result);

   }

  ngOnInit() {
  }

  // tslint:disable-next-line:member-ordering
  time: Time = {hours: 12, minutes: 3};
  Find() {
    if (this.search && !this.search.startsWith(' ') &&
    this.search.search(new RegExp('[0-9]', 'i'))) {
      // let des=this.searchService.searchResult as CarRental;
      // console.log(des)//+" CRentId = "+des.cRentId);
      const hour = this.timeFrom.value + '';
      const hour2 = this.timeTo.value;
      // const year = this.dateForm.getFullYear();
      // const month = this.dateForm.getMonth();
      // const day = this.dateForm.getDate();
      // this.time.hours = +hour.split(':')[0];
      // this.time.minutes = +hour.split(':')[1];
      console.log(this.time.valueOf());
      this.dateForm.setHours(+hour.split(':')[0]);
      this.dateForm.setMinutes(+hour.split(':')[1]);
      this.dateForm.setSeconds(0, 0);
      console.log(+hour.split(':')[0]);
      this.searchService.cDateFrom = this.dateForm;
      this.dateTo.setHours(+hour2.split(':')[0]);
      this.dateTo.setMinutes(+hour2.split(':')[1]);
      this.dateTo.setSeconds(0, 0);
      this.searchService.cDateReturn = this.dateTo;
      console.log('Time is ' + this.timeFrom.value);
      console.log(this.dateForm);
      console.log(this.dateTo);
      this.service.search = this.search;
      this.service.CarRentalDetails(this.search);
    }

  }

}
