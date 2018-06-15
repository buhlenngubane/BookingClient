import { Injectable } from '@angular/core';
import { Users } from './common-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Accommodations, Flights, CarRentals, AirDetails, CarRentalDetails } from '../model/service-type';
import { UsersService } from './user.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';

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

    return this.http.get<AirDetails[]>(environment.base_url + `api/AirTaxis/AirDetails/GetAllDetails`)
    .subscribe(
      data => {
        console.log(data);

        data.forEach(
          element => {
            airData.push(element);
          }
        );
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

  /***Post***/

  PostUser(user, loading) {
    return this.http.delete(environment.base_url + `api/Users/Register`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
        console.log('Done');
      }
    );
  }

  PostAccomm(accommodation, loading) {
    console.log('Accommodation');
    return this.http.post(environment.base_url + `api/Accommodations/PostAccommodation`, accommodation)
    .subscribe(
      data => {
        console.log(data);
        accommodation = data;
        console.log(JSON.stringify(accommodation));
      },
      error => {
        console.log(error.error);

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
    );
  }

  PostFlight(flight, loading) {
    console.log('Post Flight');
    return this.http.post(environment.base_url + `api/Flights/PostFlight`, flight)
    .subscribe(
      data => {
        console.log(data);
        flight = data;
        console.log(JSON.stringify(flight));
      },
      error => {
        console.log(error.error);

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
    );
  }

  PostCarRental(carRental, loading) {
    return this.http.post(environment.base_url + `api/CarRentals/PostCarRental`, carRental)
    .subscribe(
      data => {
        console.log(data);
        carRental = data;
        console.log(JSON.stringify(carRental));
      },
      error => {
        console.log(error.error);

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
    );
  }

  PostAirTaxi(airTaxi, loading) {
    return this.http.post(environment.base_url + `api/AirTaxis/AirTaxiPickUps/PostAirTaxiPickUp`, airTaxi)
    .subscribe(
      data => {
        console.log(data);
        airTaxi = data;
        console.log(JSON.stringify(airTaxi));
      },
      error => {
        console.log(error.error);

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
    );
  }

  /*Put*/

  PutUser(user, loading) {
    return this.http.delete(environment.base_url + `api/Users/UpdateUser`, user)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
        console.log('Done');
      }
    );
  }

  PutAccomm(accommodation, loading) {
    return this.http.put(environment.base_url + `api/Accommodations/PutAccommodation`, accommodation)
    .subscribe(
      data => {
        console.log(data);
        accommodation = data;
        console.log(accommodation);
      },
      error => {
        console.log(error.error);

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
    );
  }

  PutFlight(flight, loading) {
    return this.http.put(environment.base_url + `api/Flights/PutFlight`, flight)
    .subscribe(
      data => {
        console.log(data);
        flight = data;
        console.log(flight);
      },
      error => {
        console.log(error.error);

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
    );
  }

  PutCarRental(carRental, loading) {
    return this.http.put(environment.base_url + `api/CarRentals/PutCarRental`, carRental)
    .subscribe(
      data => {
        console.log(data);
        carRental = data;
        console.log(carRental);
      },
      error => {
        console.log(error.error);

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
    );
  }

  PutAirTaxi(airTaxi, loading) {
    return this.http.put(environment.base_url + `api/AirTaxis/AirTaxiPickUps/PutAirTaxiPickUp`, airTaxi)
    .subscribe(
      data => {
        console.log(data);
        airTaxi = data;
        console.log(airTaxi);
      },
      error => {
        console.log(error.error);

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
    );
  }

  /*Delete*/

  DeleteUser(user, loading) {
    return this.http.delete(environment.base_url + `api/Users/DeleteUser`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
        console.log('Done');
      }
    );
  }

  DeleteAccomm(accommodation, loading) {
    return this.http.delete(environment.base_url + `api/Accommodations/DeleteAccommodation`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

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
    );
  }

  DeleteFlight(flight, loading) {
    return this.http.delete(environment.base_url + `api/Flights/DeleteFlight`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

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
    );
  }

  DeleteCarRental(carRental, loading) {
    return this.http.delete(environment.base_url + `api/CarRentals/DeleteCarRental`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

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
    );
  }

  DeleteAirTaxi(airTaxi, loading) {
    return this.http.delete(environment.base_url + `api/AirTaxis/AirTaxiPickUps/DeleteAirTaxiPickUp`)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error);

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
    );
  }

}
