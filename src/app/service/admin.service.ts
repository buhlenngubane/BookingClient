import { Injectable } from '@angular/core';
import { Users } from './common-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Accommodations, Flights, CarRentals, AirDetails, CarRentalDetails } from '../model/service-type';
import { UsersService } from './user.service';

@Injectable()
export class AdminService {

  users: Users[];
  constructor(private service: UsersService, private http: HttpClient) {
    this.users = [] as Users[];
   }

  GetAllUsers(usersData: Users[], loading): boolean {
    // this.users=user;
    return this.http.get<Users[]>(environment.base_url + `api/Users/GetAll`)
    .subscribe(
      data => {
        console.log(data);
        usersData.splice(0);
        data.forEach(
          element => {
            usersData.push(element);
          }
        );
        console.log(usersData);
      },
      error => {
        console.error(error);
        loading.errorMessage = error.error;
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done.');
        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    ).closed;
  }

  GetAllAccommodations(accData: Accommodations[], loading): boolean {
    this.service.refreshCount = 0;
    return this.http.get<Accommodations[]>(environment.base_url + `api/Accommodations/Properties/GetAllProperties`)
    .subscribe(
      data => {
        console.log(data);
        // accData.splice(0);
        data.forEach(
          element => {
            accData.push(element);
          }
        );
      },
      error => {
        console.log(error);
        loading.errorMessage = '';
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');
        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    ).closed;
  }

  GetAllFlights(flightData: Flights[], loading): boolean {
    this.service.refreshCount = 0;

    return this.http.get<Flights[]>(environment.base_url + `api/Flights/FlightDetails/GetAllDetails`)
    .subscribe(
      data => {
        console.log(data);

        data.forEach(
          element => {
            flightData.push(element);
          }
        );
        console.log(flightData);
      },
      error => {
        console.log(error);
        loading.errorMessage = error.error;
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');
        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    ).closed;
  }

  GetAllCarRentals(carData: CarRentalDetails[], loading): boolean {
    this.service.refreshCount = 0;

    return this.http.get<CarRentalDetails[]>(environment.base_url + `api/CarRentals/Cars/GetAllCars`)
    .subscribe(
      data => {
        console.log(data);

        data.forEach(
          element => {
            carData.push(element);
          }
        );

        console.log(carData);
      },
      error => {
        console.log(error);
        loading.errorMessage = error.error;
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');
        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    ).closed;
  }

  GetAllAirTaxis(airData: AirDetails[], loading): boolean {
    this.service.refreshCount = 0;

    return this.http.get<CarRentals[]>(environment.base_url + `api/AirTaxis/AirDetails/GetAllDetails`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);

        loading.errorMessage = error.error;
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    ).closed;
  }

}
