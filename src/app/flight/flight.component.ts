import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Flight, Destination } from '../service/common-interface';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
//import { Flight } from '../model/service-type';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  flights:Flight[];
  result:Flight[];
  result2:Destination[];
  id:number;
  data:string[]=["Economy","Premium Economy","Business","FirstClass"];
  searchTerm$ = new Subject<string>();
  searchTerm$2=new Subject<string>();
  firstSearch=new FormControl("");
  //@ViewChild('firstsearch') first_searchRef:ElementRef;
  //@ViewChild('secondsearch') second_searchRef:ElementRef;
  secondSearch= new FormControl("");
  panel=new FormControl(this.data[0]);
  Type:string=this.data[0];

  dateFrom = new Date();//new Date());
  dateTo: Date;
  minDate = this.dateFrom;
  minDate2: Date;
  maxDate2 = new Date(this.dateFrom.getFullYear() + 1, 7, 1);
  maxDate = new Date(this.dateFrom.getFullYear() + 1, 6, 30);
  incr:number=1;
  
  maxTravellers=16;
  travellers=[];

  toppings = new FormControl();

  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(
    private service:UsersService,
  private searchService:SearchService,
  private route:Router,
  private snack:MatSnackBar
) 
  { 
    for (let index = 1; index <= this.maxTravellers; index++) {
      //const element = array[index];
      this.travellers.push(index);
    }
    service.GetFlight
    .subscribe(
      data=>{
        console.log(data);
        service.flights = data as Flight[];
        console.log(service.flights);
        console.log(service.flights[0].locale);
        this.firstSearch.setValue(service.flights[0].locale);
        service.Destination
        .subscribe(
          data=>{
            console.log(data);
            service.destination = data as Destination[];
            console.log(service.destination);
            this.secondSearch.setValue(service.destination[0].destination1);
          },
          error=>{
            console.log("Error :" + error.message);
          },
          ()=>{
            console.log("Done");
          }
        );
        
        
      },
      error=>{
        console.error(error.message);
        console.log("Why?")
      },
      ()=>{
        console.log("Done");
      }
    ).closed;
    
    this.searchService.search(this.searchTerm$,2)
      .subscribe(
        data => {
          console.log("searching");
          this.result = data as Flight[];
          console.log(this.result);
          //if(!this.result.find(s=>s.locale==arr.))

        },
        error => {
          console.error(error.message);
          //this.retry = error.message;

          //if (this.retry.search("Not Found")) {
            console.log("Retrying>>>");
            //serviceSearch.search(this.searchTerm$).distinctUntilChanged;
          //}
        },
        () => {
          console.log("search done.");
        }
      );

      this.searchService.search(this.searchTerm$2,3)
      .subscribe(
        data => {
          console.log("searching");
          this.result2 = data as Destination[];
        },
        error => {
          console.error(error.message);
          //this.retry = error.message;

          //if (this.retry.search("Not Found")) {
            console.log("Retrying>>>");
            //serviceSearch.search(this.searchTerm$).distinctUntilChanged;
          //}
        },
        () => {
          console.log("search done.");
        }
      );

  }

  ngOnInit() {
    this.dateTo=new Date(this.service.year,this.service.month,this.service.day);
    this.minDate2=this.dateTo;

  }
  
  swap():void
  {
    console.log("swap");
    let temp=this.firstSearch.value;
    this.firstSearch.setValue(this.secondSearch.value);
    this.secondSearch.setValue(temp);
  }



  Increment(data:string)
  {
    if(data=="Economy")
    {

    }
  }

  LoadDetails():void
  {
    if((this.firstSearch && !this.firstSearch.value.startsWith(" ") && this.firstSearch.value.search(new RegExp("[0-9]","i")))
      && (this.secondSearch && !this.secondSearch.value.startsWith(" ") && this.secondSearch.value.search(new RegExp("[0-9]","i")))
    )
    {
      let dest = this.service.destination.find(s=>s.destination1==this.secondSearch.value);
      if(dest)
        this.searchService.SearchFlights(dest.destId)
  }
  else{
    this.snack.open("Search Bar must contain letters")._dismissAfter(4000);
  }
    
  }

}
