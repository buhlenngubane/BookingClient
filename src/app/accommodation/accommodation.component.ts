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

  accommodation: Accommodation[];
  search=new FormControl("");
  searchTerm$ = new Subject<string>();
  result: Accommodation[];
  retry: string;
  dateForm = new Date();//new Date());
  dateTo: Date;
  minDate = this.dateForm;
  minDate2: Date;
  maxDate2 = new Date(this.dateForm.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateForm.getFullYear() + 1, 6, 30);
  diff;
  year = new Date(this.dateForm).getFullYear();
  month = (new Date(this.dateForm).getMonth());
  day = new Date(this.dateForm).getDate();
  panel=new FormControl("1 room");
  Num = [{ text: ' room', number: 1 }];
  value1: any;
  value2: any;
  error: boolean;
  errorStatus = "";

  constructor(
    private service: UsersService,
    private serviceSearch: SearchService,
    public route: Router,
    private datePipe: DatePipe
  ) {

    //this.panel = this.Num[0].number + this.Num[0].text;
    console.log(this.panel.value);
    console.log(this.Num[0].number + " YES!!!!!!!!!!");
    for (let index = 1; index < 30; index++) {
      //this.Num=new Object()[index]=[{name:"sting"}];
      /*if(index==0)

      else*/
      this.Num.push({ text: " rooms", number: (index + 1) });
      //serviceSearch.Num.push({text:" rooms",number:(index+1)});
      console.log(this.Num[index].number);
      //this.Num[index]=[{text:"rooms "},{number:(index+1)}];
    }
    serviceSearch.Num = this.Num;
    console.log(JSON.stringify(serviceSearch.Num))
    serviceSearch.Panel = this.panel.value;

    //if(!service.initailized)
    service.GetAccommodation
      .subscribe(
        data => {
          try {
            this.accommodation = data as Accommodation[];
          }
          catch (error) {
            console.log(service.AccData[0]);
            console.error(error.message);
          }
        },
        error => {
          console.log(error.message);
        },
        () => {
          console.log("Get done.");
        }
      )
      .closed;

    serviceSearch.search(this.searchTerm$,1)
      .subscribe(
        data => {
          console.log("searching");
          this.result = data as Accommodation[];
        },
        error => {
          console.error(error.message);
          this.retry = error.message;

          if (this.retry.search("Not Found")) {
            console.log("Retrying>>>");
            //serviceSearch.search(this.searchTerm$).distinctUntilChanged;
          }
        },
        () => {
          console.log("search done.");
        }
      );
  }

  ngOnInit() {
    /*if (this.month == 12 && this.day == 31) {
      this.year = new Date(this.dateForm).getFullYear() + 1;
      console.log(this.day);
    }
    else {
      this.year = new Date(this.dateForm).getFullYear();
      console.log(this.day + " year " + this.year);
    }

    if (this.month == (1 || 3 || 4 || 5 || 7 || 8 || 10 || 12) && new Date(this.dateForm).getDate() == 31) {
      if (this.month == 12) {
        this.month = 1;
        this.day = 2;
      }
      else {
        this.month++;
        this.day = 2
      }
    }
    else if (this.month == 2) {
      if (new Date(this.dateForm).getFullYear() % 4 == 0 && this.day == 29) {
        this.month++;
        this.day = 2;
      }
      else if (this.day == 28) {
        this.month++;
        this.day = 2;
      }
      else
        this.day += 2;
    }
    else if (this.day == 30) {
      this.month++;
      this.day = 2;
    }
    else
      this.day += 2;*/
    this.dateTo = new Date(/*this.year*/this.service.year, this.service.month, this.service.day);
    //console.log(this.dateForm.valueOf() + " dateTo "+ this.dateTo.valueOf());

    if (this.dateForm && this.dateTo) 
    {

      this.value1 = this.dateTo;
      this.value2 = this.dateForm;
      console.log(this.value1 + "  " + this.value2);
      this.diff = Math.round((this.value1 - this.value2) / 1000 / 60 / 60 / 24);
      console.log("runned " + this.diff);
      console.log((this.dateTo.valueOf()) / 1000 / 60 / 60 / 24 + "  " + (this.dateForm.valueOf() / 1000 / 60 / 60 / 24))
      this.serviceSearch.Diff = this.diff;

    }
    this.minDate2 = this.dateTo;

    /*this.serviceSearch.CommonShare.dateFrom=this.dateForm;
    this.serviceSearch.CommonShare.dateTo=this.dateTo;
    this.serviceSearch.CommonShare.diff=this.diff;
    this.serviceSearch.CommonShare.max=this.maxDate;
    this.serviceSearch.CommonShare.min=this.minDate;
    this.serviceSearch.CommonShare.max2=this.maxDate2;
    this.serviceSearch.CommonShare.min2=this.minDate2;*/
    console.log(this.datePipe.transform(this.dateForm,"yyyy-MM-dd"));
    //this.dateForm.disable();
    //this.dateTo.disable();
  }

  Search(value: string): void {
    console.log("Value == " + value);
    this.error = false;
    if(this.accommodation)
      this.serviceSearch.Search(value)
        .subscribe(
          data => {
            console.log(data);
            let acc = this.accommodation.find(s=>s.accId==(+value));
            if(acc)
              this.serviceSearch.SearchParam=acc.country+", "+acc.location;
              
            this.serviceSearch.Property = data as Property[];
            console.log(JSON.stringify(this.serviceSearch.Property))
            this.serviceSearch.DateFrom = this.dateForm;
            this.serviceSearch.DateTo = this.dateTo;
            this.serviceSearch.Panel=this.panel.value;
            this.serviceSearch.Nights = this.diff;
            this.route.navigate(["/search"]);
          },
          error => {
            console.error(error.message);
          },
          () => {
            console.log("search done.");
          }
        );
  }

  Find(): void {
    if (this.search && !this.search.value.startsWith(" ") && this.search.value.search(new RegExp("[0-9]","i"))) {
      let arr = this.search.value.split(", ");
      console.log(arr);
      //console.log(this.result.find(m => m.country == arr[0] && m.location == arr[1]));
      let display = this.result.find(m => m.country == arr[0] && m.location == arr[1]);
      //this.result.splice(0).push(display);
      this.serviceSearch.SearchParam=this.search.value;
      if (display) {
        console.log("Should redirect "+display.accId.toString());
        this.error = false;
        this.serviceSearch.Search(display.accId.toString())
          .subscribe(
            data => {
              console.log(data);
              this.serviceSearch.Property = data as Property[];
              console.log(JSON.stringify(this.serviceSearch.Property))
              console.log(this.panel);
              this.serviceSearch.DateFrom = this.dateForm;
              this.serviceSearch.DateTo = this.dateTo;
              this.serviceSearch.Panel=this.panel.value;
              this.serviceSearch.Nights = this.diff;
              this.route.navigate(["/search"]);
            },
            error => {
              console.error(error.message);
            },
            () => {
              console.log("search done.");
            }
          );
      }
    }
    else {
      this.errorStatus = "Search bar(letters only)";
      this.error = true;
      console.log("hear");
      //if(this.search)
      //console.log("In Errors "+ !this.search.search(new RegExp(/^[A-Za-z]/,"i")) + " " +!this.search.startsWith(" "));
    }
  }

}
