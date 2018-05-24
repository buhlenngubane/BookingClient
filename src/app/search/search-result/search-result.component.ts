import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Property, Accommodation } from '../../service/common-interface';
import { Subject } from 'rxjs/Subject';
import { Properties } from '../../model/service-type';
import { Router } from '@angular/router';
import { UsersService } from '../../service/user.service';
import {MatSnackBar} from '@angular/material';
import { delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
//import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  result:Accommodation[];
  //id?:number;
  searchTerm$ = new Subject<string>();
  id:number;
  search=new FormControl("");
  prop:Property[];
  dateForm=this.searchService.DateFrom?this.searchService.DateFrom:new Date();//new Date());
  dateTo=this.searchService.DateTo?this.searchService.DateTo:new Date();
  panel=new FormControl(this.searchService.Panel?this.searchService.Panel:"1 room");
  Num=this.searchService.Num?this.searchService.Num:[{text:" room",number:1}];
  /*minDate = new Date();
  
  minDate2=new Date(this.minDate.setDate(this.minDate.getDate()+1));
  maxDate2=new Date(2020, 0, 1);
  maxDate = new Date(this.maxDate.setDate(this.maxDate2.getDate()-1));*/
  diff=this.searchService.Diff;
  constructor(
    private service:UsersService,
    private searchService:SearchService,
    private route:Router,
    public snackBar: MatSnackBar
  ) 
  {
    //this.panel= as common;
    //this.panel.number=1;
    //this.panel.text=" room";
    console.log(this.diff+" vs "+ searchService.Diff);
    console.log(this.panel +" panel "+this.panel);
    console.log(this.Num);
    let com=this.Num.filter(s=>s.number==3);
    console.log(com);
    //let Com=com as common;

    if(!searchService.Property)
      route.navigate(["/home"]);
      else
      this.prop=searchService.Property;

      searchService.search(this.searchTerm$,1)
      .subscribe(
        data => {
          console.log("searching");
        this.result=data as Accommodation[];
      },
      error => {
        console.error(error.message);
        
      },
      () => {
        console.log("search done.");
      } 
    );
  }
  

  ngOnInit() {
    //if(this.searchService.SearchParam)
    this.search.setValue=this.searchService.SearchParam?this.searchService.SearchParam.valueOf:"".valueOf;
  }

  ifLoggedIn(property:Property)
  {
    if(this.service.User){
      this.service.Property=property;
      this.searchService.DateFrom=this.dateForm;
      this.searchService.DateTo=this.dateTo;
      this.searchService.Panel=this.panel.value;
      console.log(this.searchService.Panel);
      console.log(this.panel);
      this.searchService.Rooms=+this.panel.value.split(" ")[0];
      this.route.navigate(["/payment"]);
    }
    else
    {
        this.snackBar.open("SignIn to book accommodation.")._dismissAfter(5000);
        
    }
  }

}

