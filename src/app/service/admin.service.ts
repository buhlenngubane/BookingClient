import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Accommodations, Flights, CarRentals, AirDetails, CarRentalDetails, Properties } from '../model/service-type';
import { UsersService } from './user.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { User } from '../model/user';

@Injectable()
export class AdminService {

  users: User[];
  constructor(private service: UsersService, private http: HttpClient) {
    this.users = [] as User[];
   }

  GetAllUsers(usersData: User[], loading): boolean {
    // this.users=user;
    return this.http.get<User[]>(environment.base_url + `api/Users/GetAll`)
    .subscribe(
      data => {
        console.log(data);
        usersData.splice(0);
        data.forEach(
          element => {
            const ele = element;
            ele.password = '';
            usersData.push(ele);
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

  GetAllAccommodations(accData: object[], id: number, loading): boolean {
    return this.http.get<Properties[]>(environment.base_url + `api/AccDetails/GetAccDetail/${id}`)
    .subscribe(
      data => {
        console.log(data);
        accData.splice(0);
        try {
        data.forEach(
          element => {
            accData.push(element);
          }
        );
      } catch (Err) {
        console.log('Error : ' + Err);
        accData.push({'error': 'No accommodation found for id ' + id});
      }
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

  GetAllFlights(flightData: object[], id: number, loading): boolean {

    return this.http.get<Flights[]>(environment.base_url + `api/Flights/FlightDetails/GetAllDetails/${id}`)
    .subscribe(
      data => {
        console.log(data);
        flightData.splice(0);
        try {
        data.forEach(
          element => {
            flightData.push(element);
          }
        );
        flightData = data;
        console.log(flightData);
        } catch (Err) {
          console.log('Error : ' + Err);
          flightData.push({'error': 'No flight found for id ' + id});
        }
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

  GetAllCarRentals(carData: object[], id: number, loading): boolean {

    return this.http.get<CarRentalDetails[]>(environment.base_url + `api/CarRentals/Cars/GetAllCars/${id}`)
    .subscribe(
      data => {
        console.log(data);
        carData.splice(0);
        try {

        data.forEach(
          element => {
            carData.push(element);
          }
        );
      } catch (Err) {
        console.log('Error : ' + Err);
        carData.push({'error': 'No carRental found for id ' + id});
        // carData.push('No data found for id ' + id);
      }
        // carData = data;

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

  GetAllAirTaxis(airData: object[], id: number, loading): boolean {

    return this.http.get<AirDetails[]>(environment.base_url + `api/AirTaxis/AirDetails/GetDetails/${id}`)
    .subscribe(
      data => {
        console.log(data);
        airData.splice(0);
        try {
        data.forEach(
          element => {
            airData.push(element);
          }
        );
      } catch (Err) {
        console.log('Error : ' + Err);
        airData.push({'error': 'No airTaxi found for id ' + id});
      }
        // airData = data;
      },
      error => {
        console.log(error);

        loading.errorMessage = error.message;
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

  /***Post***/

  PostAccomm(accommodation, loading) {
    console.log('Accommodation');
    loading.load = true;
    return this.http.post(environment.base_url + `api/Accommodations/PostAccommodation`, accommodation)
    .subscribe(
      data => {
        console.log(data);
        accommodation = data;
        console.log(JSON.stringify(accommodation));
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  PostFlight(flight, loading) {
    console.log('Post Flight');
    loading.load = true;
    return this.http.post(environment.base_url + `api/Flights/PostFlight`, flight)
    .subscribe(
      data => {
        console.log(data);
        flight = data;
        console.log(JSON.stringify(flight));
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  PostCarRental(carRental, loading) {
    loading.load = true;
    return this.http.post(environment.base_url + `api/CarRentals/PostCarRental`, carRental)
    .subscribe(
      data => {
        console.log(data);
        carRental = data;
        console.log(JSON.stringify(carRental));
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  PostAirTaxi(airTaxi, loading) {
    loading.load = true;
    return this.http.post(environment.base_url + `api/AirTaxis/AirTaxiPickUps/PostAirTaxiPickUp`, airTaxi)
    .subscribe(
      data => {
        console.log(data);
        airTaxi = data;
        console.log(JSON.stringify(airTaxi));
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  /*Put*/

  // PutUser(user, loading) {
  //   loading.load = true;
  //   return this.http.delete(environment.base_url + `api/Users/UpdateUser`, user)
  //   .subscribe(
  //     data => {
  //       console.log(data);
  //       user = data;
  //       console.log(user);
  //     },
  //     error => {
  //       console.log(error.error);

  //       loading.errorMessage = JSON.stringify(error.error);
  //       loading.error = true;
  //       loading.load = false;
  //     },
  //     () => {
  //       console.log('Done');

  //       loading.errorMessage = '';
  //       loading.error = false;
  //       loading.load = false;
  //     }
  //   );
  // }

  PutAccomm(accommodation, loading) {
    loading.load = true;
    return this.http.put(environment.base_url + `api/Accommodations/PutAccommodation`, accommodation)
    .subscribe(
      data => {
        console.log(data);
        accommodation = data;
        console.log(accommodation);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  PutFlight(flight, loading) {
    loading.load = true;
    return this.http.put(environment.base_url + `api/Flights/PutFlight`, flight)
    .subscribe(
      data => {
        console.log(data);
        flight = data;
        console.log(flight);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  PutCarRental(carRental, loading) {
    loading.load = true;
    return this.http.put(environment.base_url + `api/CarRentals/PutCarRental`, carRental)
    .subscribe(
      data => {
        console.log(data);
        carRental = data;
        console.log(carRental);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  PutAirTaxi(airTaxi, loading) {
    loading.load = true;
    return this.http.put(environment.base_url + `api/AirTaxis/AirTaxiPickUps/PutAirTaxiPickUp/${7}`, airTaxi)
    .subscribe(
      data => {
        console.log(data);
        airTaxi = data;
        console.log(airTaxi);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  /*Delete*/

  DeleteUser(id: number, loading) {
    loading.load = true;
    return this.http.delete(environment.base_url + `api/Users/DeleteUser/${id}`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  DeleteAccomm( id: number, loading) {
    loading.load = true;
    return this.http.delete(environment.base_url + `api/Accommodations/DeleteAccommodation/${id}`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  DeleteFlight( id: number, loading) {
    loading.load = true;
    return this.http.delete(environment.base_url + `api/Flights/DeleteFlight/${id}`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  DeleteCarRental( id: number, loading) {
    loading.load = true;
    return this.http.delete(environment.base_url + `api/CarRentals/DeleteCarRental/${id}`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

  DeleteAirTaxi( id: number, loading) {
    loading.load = true;
    return this.http.delete(environment.base_url + `api/AirTaxis/AirTaxiPickUps/DeleteAirTaxiPickUp/${id}`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

        loading.errorMessage = JSON.stringify(error.error);
        loading.error = true;
        loading.load = false;
      },
      () => {
        console.log('Done');

        loading.errorMessage = '';
        loading.error = false;
        loading.load = false;
      }
    );
  }

}
