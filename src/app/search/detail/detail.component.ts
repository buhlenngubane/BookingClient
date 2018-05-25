import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  myFlight=this.service.flightAbbrev?this.service.flightAbbrev.split(" ")[0]:"";
  myDestination=this.service.destAbbrev?this.service.destAbbrev.split(" ")[0]:"";
  myDetail=this.searchService.details;
  flightPics=this.service.FlightPics;
  departTime:string[]=[];
  date:Date[]=[];
  depart:string[]=[];
  return:string[]=[];

  constructor(private service:UsersService,
    private searchService:SearchService,
    private route:Router) 
    {
      //console.log("Excuting request")
      //searchService.SearchCompany();
      if(!this.myDetail)
      {
        route.navigate(["/flight"]);
      }
      console.log(this.myDetail);
      console.log(this.flightPics);
      //this.departTime=this.flightPics.
      
      
    }

  ngOnInit() {

  }

}
