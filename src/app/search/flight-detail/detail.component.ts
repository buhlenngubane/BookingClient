import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { FlightDetails } from '../../model/service-type';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private myFlight =
    this.service.locale.value.split(' ')[0];

  private myDestination =
    this.service.dest.value.split(' ')[0];

  private myDetail = this.service.FlightDetail;

  constructor(private service: UsersService,
    private searchService: SearchService) {
    if (service.FlightDetail.length === 0) {
      if (localStorage.getItem('info#2')) {
        service.SearchFlights(localStorage.getItem('info#2').split('*')[0],
          localStorage.getItem('info#2').split('*')[1],
          new Date(localStorage.getItem('info#2').split('*')[2]),
          /**Check if dateTo is null**/
          localStorage.getItem('info#2').split('*')[3] === 'false' ? null :
            new Date(localStorage.getItem('info#2').split('*')[3]),
          localStorage.getItem('info#2').split('*')[4],
          +localStorage.getItem('info#2').split('*')[5]);

          localStorage.getItem('info#2').split('*')[3] === 'false' ? searchService.return = false :
          searchService.return = false;
      } else {
        searchService.GoBack('/flight');
      }
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
      this.searchService.PaymentReceive('flight-detail', { Detail: flight });
    } else {
      this.service.check.errorMessage = 'SignIn or Register to book';
    }
  }

}
