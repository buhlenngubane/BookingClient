import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { Cars, CarRentalDetails } from '../../model/service-type';
import { SearchService } from '../../service/search.service';
import { CarRentalStorage } from '../../service/common-interface';
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
  private price;
  private priceDateFrom;
  private priceDateTo;
  constructor(private service: UsersService,
  private searchService: SearchService) {

    if (service.carRentalDtls.length === 0) {
      const item = JSON.parse(localStorage.getItem('info#3')) as CarRentalStorage;
      localStorage.getItem('info#3') ?
      this.service.CarRentalDetails(item.search, item.dateFrom, item.dateTo, item.timeFrom, item.timeTo) :
      searchService.GoBack('/car-rentals');
      this.service.priceDateFrom = new Date(item.dateFrom).valueOf();
      this.service.priceDateTo = new Date(item.dateTo).valueOf();
    }
   }

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    // console.log(new Cars().deserialize(this.service.CarRentalDtls) + " What?");
  }

  IfLoggedIn(carRental: CarRentalDetails) {
    if (this.service.User) {
    console.log(this.searchService.Total('carRental'));
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
