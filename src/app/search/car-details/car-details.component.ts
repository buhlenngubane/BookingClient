import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { Cars, CarRentalDetails } from '../../model/service-type';
import { SearchService } from '../../service/search.service';
// import { Car } from '../../service/common-interface';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  result = this.service.carRentalDtls;
  constructor(private service: UsersService,
  private searchService: SearchService) {
    if (service.carRentalDtls.length === 0) {
      localStorage.getItem('info#3') ?
      this.service.CarRentalDetails(localStorage.getItem('info#3')) :
      searchService.GoBack('/car-rentals');
    }
   }

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.result.length;
    // console.log(new Cars().deserialize(this.service.CarRentalDtls) + " What?");
  }

  IfLoggedIn(carRental: CarRentalDetails) {
    if (this.service.User) {
    this.searchService.Total('carRental');
    this.service.serviceType = 'carRental';
    // this.searchService.Check();
    console.log(carRental);

    this.searchService.PaymentReceive('car-detail', {Detail: carRental});
    } else {
      this.service.check.errorMessage = 'Login or Register to book';
      this.service.check.error = true;
    }

  }

}
