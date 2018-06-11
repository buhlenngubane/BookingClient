import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { FlightDetails } from '../../model/service-type';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  myFlight = this.service.flightAbbrev ?
  this.service.flightAbbrev.split(' ')[0] : '';

  myDestination = this.service.destAbbrev ?
  this.service.destAbbrev.split(' ')[0] : '';

  myDetail = this.service.FlightDetail;
  flightPics = this.service.FlightPics;
  departTime: string[] = [];
  date: Date[];
  depart: string[] = [];
  return: string[] = [];
  panel: FormControl[];
  travellers: FormControl[];

  constructor(private service: UsersService,
    private searchService: SearchService) {
      if (service.FlightDetail.length === 0) {
        searchService.GoBack('/flight');
      }
      console.log('Initial flightType' + searchService.flightType);
    }

  ngOnInit() {

  }

  IfLoggedIn(flight: FlightDetails) {
    if (this.service.User) {
    this.searchService.Total('flight');
    this.service.serviceType = 'flight';
    // this.searchService.Check();
    console.log(flight);
    console.log('Final flightType' + this.searchService.flightType);
    this.searchService.PaymentReceive('flight-detail', {Detail: flight});
    }
  }

}
