import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { AirDetails } from '../../model/service-type';
import { AirTaxiStorage } from '../../service/common-interface';

@Component({
  selector: 'app-air-details',
  templateUrl: './air-details.component.html',
  styleUrls: ['./air-details.component.css']
})
export class AirDetailsComponent implements OnInit {

  result = this.searchService.airDetails;

  constructor(private service: UsersService
    , private searchService: SearchService) {
    if (searchService.airDetails.length === 0) {
      if (localStorage.getItem('info#4')) {
        const items = JSON.parse(localStorage.getItem('info#4')) as AirTaxiStorage;
        searchService.AirTaxis(items.pickUp,
          items.dropOff,
          items.dateFrom,
          /**Check if dateTo is null**/
          items.returnDate !== null ?
            new Date(items.returnDate) : null,
          +items.passengers);
        console.log(items.returnDate + ' passengers ' + items.passengers);
        items.returnDate !== null ?
          searchService.returnJourney = true :
          searchService.returnJourney = false;
      } else {
        searchService.GoBack('/airTaxi');
      }
    }
    // const items = JSON.parse(localStorage.getItem('info#4')) ;
    // console.log(items);
    // console.log(items.pickUp);
  }

  ngOnInit() {

  }

  IfLoggedIn(airTaxi: AirDetails, num: number) {
    if (this.service.User) {
      this.service.serviceType = 'airTaxi';
      console.log(airTaxi);
      this.searchService.PaymentReceive('air-detail', { Detail: airTaxi });
      this.searchService.Total('airTaxi', num);
    } else {
      this.service.check.errorMessage = 'Login or Register to book';
      this.service.check.error = true;
    }

  }

}
