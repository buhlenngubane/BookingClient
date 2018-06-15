import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { AirDetails } from '../../model/service-type';

@Component({
  selector: 'app-air-details',
  templateUrl: './air-details.component.html',
  styleUrls: ['./air-details.component.css']
})
export class AirDetailsComponent implements OnInit {

  result = this.searchService.airDetails;
  // nav:boolean=true;
  constructor(private service: UsersService
  , private searchService: SearchService) {
      console.log(searchService.airDetails.length);
      console.log(this.result.length);
      if (searchService.airDetails.length === 0) {
        localStorage.getItem('info#4') ?
         searchService.AirTaxis(localStorage.getItem('info#4').split(':')[0],
          localStorage.getItem('info#4').split(':')[1]) :
           searchService.GoBack('/airTaxi');
      } /*else {
        searchService.GoBack('/air-taxi');
      }*/
   }

  ngOnInit() {

  }

  IfLoggedIn(airTaxi: AirDetails) {
    if (this.service.User) {
    this.searchService.Total('airTaxi');
    this.service.serviceType = 'airTaxi';
    // this.searchService.Check();
    console.log(airTaxi);

    this.searchService.PaymentReceive('air-detail', {Detail: airTaxi});
    }

  }

}
