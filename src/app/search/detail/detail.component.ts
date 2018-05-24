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
  myDetail=this.searchService.details;
  flightPics=this.service.FlightPics;
  departTime:string[]=[];
  date:Date[]=[];
  depart:string[]=[];
  return:string[]=[];
  span:number[]=[];

  constructor(private service:UsersService,
    private searchService:SearchService,
    private route:Router) 
    {
      //console.log("Excuting request")
      //searchService.SearchCompany();
      if(!service.flights)
      {
        route.navigate(["/flight"]);
      }
      console.log(this.myDetail);
      console.log(this.flightPics);
      //this.departTime=this.flightPics.
      //this.span[0]=2;
      if(this.myDetail){
        let index=0;
        this.myDetail.forEach(element=>{
          let str=element.path;
          this.depart[index]=str.split("-")[0];
          this.return[index++]=str.split("-")[1];
          if(this.return)
            this.span[index]=1;
          else
            this.span[index]=2;
        });
    }
    }

  ngOnInit() {

  }

}
