import { Injectable } from '@angular/core';
import { User } from '../model/user';
import 'rxjs/add/operator/map';
// import 'rxjs';
import { Observable, Subscribable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { MatDialogRef } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RegisterComponent } from '../register/register.component';
import { changeLayout, Users} from './common-interface';
// tslint:disable-next-line:max-line-length
import {
  Accommodations,
  AirDetails,
  CarRentalDetails,
  Destinations,
  FlightDetails,
  Flights,
  Properties,
  AccBooking,
  FlBooking,
  CarBooking,
  AirBooking,
  Loading
} from '../model/service-type';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/interval';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';

@Injectable()
export class UsersService {
  accommodations: Accommodations[] = [];
  private flights: Flights[];
  serviceType: string;
  private user: User;
  private password: string;
  private admin = false;
  private myToken: Token;
  private body: object;
  private authenticated: boolean;
  private BASE_URL = environment.base_url;
  private data: string;
  private getToken = '';
  private payment: number;
  myObservable;
  // timer = Observable.timer(10000, 1000);
  sub: Subscription;
  property: Properties;
  /**Flight**/
  private destination: Destinations[];
  flight: FlightDetails;
  private flightDetail: FlightDetails[] = [];
  form = new FormControl('', [Validators.required
    , Validators.pattern('[A-Za-z]{0,}[A-Za-z ,-]*')]);
  form2 = new FormControl('', [Validators.required
    , Validators.pattern('[A-Za-z]{0,}[A-Za-z ,-]*')]);
  /**CarRental**/
  carRental: CarRentalDetails;
  carRentalDtls: CarRentalDetails[] = [];
  /**AirTaxi**/
  airTaxi: AirDetails;

  year = new Date().getFullYear();
  month = (new Date().getMonth());
  day = new Date().getDate();
  errorState = '';
  error = false;
  initailized = false;
  check: changeLayout = { error: false, errorMessage: '', load: false };
  destAbbrev: string;
  flightAbbrev: string;
  search: string;

  /**Booking**/
  accData: AccBooking[] = [];
  flightData: FlBooking[] = [];
  carRentalData: CarBooking[] = [];
  airTaxiData: AirBooking[] = [];

  load: Loading = { error: false, load: true, errorMessage: '' };

  // timer = Observable.timer(10000, 1000);
  refreshCount = 0;
  private _hubConnection: HubConnection;

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    // this.user=new User();
    this.error = false;
    // this.admin=false;
    // this.GetToken="";

    // this.check=[] as changeLayout;

    /******ServiceLogic*******/

    if (this.month === 12 && this.day === 31) {
      this.year = new Date().getFullYear() + 1;
      console.log(this.day);
    } else {
      // this.year = new Date().getFullYear();
      console.log(this.day + ' year ' + this.year);
    }

    if (this.month === (1 || 3 || 4 || 5 || 7 || 8 || 10 || 12) && new Date().getDate() === 31) {
      if (this.month === 12) {
        this.month = 1;
        this.day = 2;
      } else {
        this.month++;
        this.day = 2;
      }
    } else if (this.month === 2) {
      if (new Date().getFullYear() % 4 === 0 && this.day === 29) {
        this.month++;
        this.day = 2;
      } else if (this.day === 28) {
        this.month++;
        this.day = 2;
      } else {
        this.day += 2;
      }
    } else if (this.day === 30) {
      this.month++;
      this.day = 2;
    } else {
      this.day += 2;
    }

    this._hubConnection = new HubConnectionBuilder().
      withUrl(this.BASE_URL + 'async').
      build();

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection
      .onclose(
        () => {
          this._hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        }
      );
  }

  /***User Function Calls***/

  userRegister(customer: object, regRef: MatDialogRef<RegisterComponent>): boolean {
    // this.body = customer;
    this.User = new User(customer);
    console.log(this.user);

    return this.http.post<User>(this.BASE_URL + 'api/Users/Register',
      this.User)// , this.httpOptions)
      .map((response) => {
        console.log(response);
        // let cred = customer as Credetials;
        // console.log("Email = " + cred.email + cred.password);
        this.password = this.user.password;
        this.user.password = '';
        this.SetToken(this.user.email, this.password)
          .subscribe(
            () => {

              this.sub = Observable.interval(30000)
                .subscribe(
                  tick => {
                    this.RefreshMe();
                  }
                  ,
                  error => {
                    console.log(error.error);
                  }
                );
            },
            error => {
              console.error(error + ' for token!!!');
              this.body = error;
              regRef.disableClose = false;
            }, () => {
              console.log('Done auth');
              regRef.disableClose = false;
              if (regRef.componentInstance) { regRef.close(); }
            }

          );
      })
      .subscribe(() => { },
        (error) => {
          console.error(error + ' for signIn!!!');
          console.error(error);
          this.data = error.error;

          if (this.data === 'Email exists') {
            this.check.errorMessage = 'Email exists';
          } else {
            this.check.errorMessage = 'Error occured.';
          }
          this.check.error = true;

          if (regRef.componentInstance) {
            regRef.disableClose = false;
            regRef.close();
          }
        },
        () => {
          if (regRef.componentInstance) {
            console.log('Token not finised');
          }
        }).closed;
  }

  userLogin(Email: string, Password: string, signInRef: MatDialogRef<SignInComponent>) {
    // console.log("before stringfy: "+ user.email);
    this.body = { email: Email, password: Password }; // JSON.stringify(credetials);
    console.log('after stringfy: ' + this.body);


    return this.http.get<User>(this.BASE_URL + `api/Users/GetUser/${Email}&${Password}`)
      // this.Body, this.httpOptions)
      .subscribe((response) => {
        console.log(JSON.stringify(response));

        this.User = new User(response);
        /*if(this.user.userId==1)
          this.admin=true;*/
        this.password = this.user.password;
        this.User.password = '';
        console.log('Token launch');
        this.SetToken(Email, Password)
          .subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.error(error + ' for token!!!');
              this.check.errorMessage = 'Something went wrong.';
              this.check.error = true;
              signInRef.disableClose = false;
              signInRef.close();
              // this.body = error;
            }, () => {
              console.log('Done auth');
              if (signInRef.componentInstance) {
                signInRef.disableClose = false;
                signInRef.close();
              }
            }
          );
      },
        (error) => {
          console.error(error + ' for signIn!!!');
          // this.data = error.error;

          this.check.errorMessage = error.error;

          if (this.check.errorMessage.includes('unknown url')) {
            this.check.errorMessage = 'Cannot reach server';
          }
          if (this.check.errorMessage.includes('Email')) {
            this.check.errorMessage = 'Email not found';
          }
          if (this.check.errorMessage.includes('Password')) {
            this.check.errorMessage = 'Password not found';
          }

          this.check.error = true;
          if (signInRef.componentInstance) {
            signInRef.disableClose = false;
            signInRef.close();
          }
        },
        () => {
          if (signInRef.componentInstance) {
            console.log('Token not finised');
          }
        }).closed;
  }

  userUpdate(userUpdate: Users, loading: changeLayout): boolean {

    this.body = userUpdate;
    console.log(this.body);
    this.refreshCount = 0;
    if (userUpdate.password === '') {
      // userUpdate.password=this.user.password;
      this.user.deserialize(userUpdate);
      this.user.password = this.password;
    } else {
      this.user.deserialize(userUpdate);
    }

    return this.http.put(this.BASE_URL + 'api/Users/UpdateUser',
      this.user)// , this.httpOptions)
      .map(response => {
        console.log(response);
        this.password = this.user.password;
        this.user.password = '';
        // this.user = new User().deserialize(response);
      })
      .subscribe(data => {
        console.log(data);
      },
        error => {
          this.data = error.message;
          this.check.error = true;
          loading.errorMessage = error.error;
          // console.error(this.httpOptions);
          console.error(this.data);
          if (this.check.errorMessage.includes('400')) {
            loading.errorMessage = 'Internal server error';
          }

          if (loading.errorMessage.includes('unknown url')) {
            loading.errorMessage = 'Server unreachable.';
          }

          loading.load = false;
          loading.error = true;
          // message.error="";
        },
        () => {
          console.log('Update Done uncheck interface');
          loading.load = false;
         }).closed;
  }

  userLogic(type: string): void {
    if (this.User != null) {
      // auth = this.Authenticated;

      if (this.Authenticated) {
        console.log(this.Authenticated);
        this.check.error = false;
      } else {
        // this.check.errorMessage = "Failed to authenticate. " + this.Data + ".";
        // this.check.error = true;
        console.log(this.check.error);
      }
    } else {
      this.errorState = 'Failed to ' + type + '. ' + this.Data + '.';

    }
  }

  /***Token Getting***/

  SetToken(email: string, password: string): Observable<any> {
    console.log('Email = ' + email + ' Password = ' + password);
    return this.http.get(this.BASE_URL + `api/Token/CreateToken/${email}&${password}`)
      .map((response) => {
        // this.body = response;
        this.myToken = response as Token;
        console.log(this.myToken.token);
        this.getToken = 'Bearer ' + this.myToken.token;
        localStorage.setItem('currentUser', this.myToken.token);
        // console.log("currentUser = "+localStorage.getItem("currentUser"));
        this.Authenticated = true;

        this.sub = Observable.interval(30000)
          .subscribe(
            tick => {
              this.RefreshMe();
            }
            ,
            error => {
              console.log(error.error);
            }
          );

        console.log('Auth is true!!!!');
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  RefreshMe(): boolean {
    // this.GetToken = 'Bearer ' + localStorage.getItem('currentUser');
    return this.http.get(environment.base_url + 'api/Token/Refresh')
      .map(data => {
        localStorage.removeItem('currentUser');
        console.log('Removed Token!!! New token: ' + this.myToken);
        this.myToken = data as Token;
        this.getToken = 'Bearer ' + this.myToken.token;
        localStorage.setItem('currentUser', this.myToken.token);
      })
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        () => {
          console.log('Successfully refreshed!!!');
        },
        error => {
          console.log(error.error);
          localStorage.removeItem('currentUser');
          console.warn('Removed Token!!!');
          this.sub.unsubscribe();
        },
        () => {
          console.log('Done');
        }
      ).closed;
  }

  /***Get Account Details***/

  AccountDetails(service: any[], loading?: Loading, serType?: string) {
    switch (serType) {
      case ('accommodation'):
        return this.http.get<AccBooking[]>(this.BASE_URL +
           `api/Accommodations/AccBookings/GetBookings/${this.User.userId}`)
          .subscribe(
            data => {
              console.log(data);
              data.forEach(
                element => {
                  service.push(element);
                  this.accData.push(element);
                }
              );
              console.log(this.accData);
              console.log(service);
              console.log(this.accData);
              console.log(service);
            },
            error => {
              console.log(error);
              console.log(Loading);
              loading.errorMessage = error.error;
              loading.error = true;
              loading.load = false;
              console.log(loading);
            },
            () => {
              console.log('Accounts Done');
              loading.error = false;
              loading.load = false;
            }
          ).closed;

      case ('flight'):
        return this.http.get<FlBooking[]>(this.BASE_URL +
           `api/Flights/FlBookings/GetFlBooking/${this.User.userId}`)
          .subscribe(
            data => {
              console.log(data);
              // this.accData = data;
              // this.flightData = data;
              // service = data;
              service.splice(0);
              this.flightData.splice(0);
              data.forEach(
                element => {
                  service.push(element);
                  this.flightData.push(element);
                }
              );
              // accData = this.accData;
              /// console.log(service);
              // console.log(this.accData[0].bookDate);
            },
            error => {
              console.log(error);
              loading.errorMessage = error.error;
              loading.error = true;
              loading.load = false;
            },
            () => {
              console.log('Accounts Done');
              loading.error = false;
              loading.load = false;
            }
          ).closed;

      case ('carRental'):
        return this.http.get<CarBooking[]>(this.BASE_URL +
           `api/CarRentals/CarBookings/GetCarBooking/${this.User.userId}`)
          .subscribe(
            data => {
              console.log(data);

              service.splice(0);
              this.carRentalData.splice(0);
              data.forEach(
                element => {
                  service.push(element);
                  this.carRentalData.push(element);
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
              console.log('Accounts Done.');
              loading.error = false;
              loading.load = false;
            }
          ).closed;

      case ('airTaxi'):
        return this.http.get<AirBooking[]>(this.BASE_URL +
           `api/AirTaxis/AirBookings/GetAirBooking/${this.User.userId}`)
          .subscribe(
            data => {
              console.log(data);

              service.splice(0);
              this.airTaxiData.splice(0);
              data.forEach(
                element => {
                  service.push(element);
                  this.airTaxiData.push(element);
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
              console.log('Accounts Done.');
              loading.error = false;
              loading.load = false;
            }
          ).closed;
    }
  }

  /***Get and Store Service data locally***/

  GetFlight(): boolean {
    return this.http.get<Flights[]>(this.BASE_URL + `api/Flights/GetAll`)
      .subscribe(
        data => {
          console.log(data);
          this.flights = data;

          console.log(this.flights);
          console.log(this.flights[0].locale);
          if (!localStorage.getItem('info#2')) {
          this.form.setValue(this.flights[0].locale);
          console.log(this.flights.length);

          this.form2.setValue(this.flights[0].destination[0].destination1);
          }
        },
        error => {
          console.error(error.message);
          console.log('Why?');
        },
        () => {
          console.log('Done');
        }
      ).closed;
  }

  SearchFlights(loc: string, dest: string, dateLoc: Date, dateDest: Date, Errors?): boolean {
    // console.log("Id = " + id)
    console.log('In SearchFlights');
    // const locale = this.flights.find(s => s.locale === loc);
    // const dest =
    //   locale.destination.find(s => s.destination1 === des);

    // if (locale && dest) {
      return this.http.get<FlightDetails[]>(environment.base_url +
         `api/Flights/FlightDetails/GetFlightDetail/${dest}&${dateLoc}&${dateDest}`)
        .subscribe(
          data => {
            console.log(data);
            // this.flightDetail = data;
            this.flightDetail.splice(0);
            data.forEach(
              element => {
                this.flightDetail.push(element);
              }
            );
            console.log(this.flightDetail);
            console.log(this.flightDetail[0].departure);
            // tslint:disable-next-line:prefer-const
            let exact = false;
            if (!this.route.isActive('/flight-detail', exact)) {
              this.route.navigate(['/flight-detail']);
            }

            localStorage.setItem('info#2', loc + ':' + dest);
          },
          error => {
            console.error(error.message);
            const status = error.message + '';

            if (status.includes('404')) {
              Errors.errorMessage = 'Flight not yet available.';
              Errors.error = true;
              // tslint:disable-next-line:prefer-const
              let exact;
              if (this.route.isActive('/car-detail', exact)) {
                this.route.navigate(['/car-rentals']);
              }
            } else {
              this.load.errorMessage = error.error;
              this.load.error = true;
            }
          },
          () => {
            console.log('Done');
          }
        ).closed;
    // }  else {
    //     console.log('Setting hint');

    //   try {
    //     Errors.errorMessage = 'Flight not yet available.';
    //     Errors.error = true;
    //   } catch (error) {
    //     this.load.errorMessage = error.error;
    //     this.load.error = true;
    //   }

    //   return false;
    // }
  }

  CarRentalDetails(search: string, load?) {
    return this.http.get<CarRentalDetails[]>(this.BASE_URL +
       `api/CarRentals/Cars/GetDetails/${search}`)
      .subscribe(
        data => {
          console.log(data);
          this.carRentalDtls.splice(0);
          data.forEach(
            element => {
              this.carRentalDtls.push(element);
            }
          );
          console.log(this.carRentalDtls);
          this.route.navigate(['car-detail']);

          localStorage.setItem('info#3', search);

        },
        error => {
          console.error(error.message);
          const emsg = error.message + '';
          console.log(emsg.includes('404'));
          if (emsg.includes('404')) {
            console.log('In hear');
            load.errorMessage = 'Rental not available yet.';
            load.error = true;
            // tslint:disable-next-line:prefer-const
            let exact;
            if (this.route.isActive('/car-detail', exact)) {
              this.route.navigate(['/car-rentals']);
            }
          } else {
            this.load.errorMessage = error.error;
            this.load.error = true;
          }
        },
        () => {
          console.log('Done.');
        }
      );
  }

  /***User Payment Process***/

  PaymentSuccess(id: number): boolean {
    this.refreshCount = 0;
    return this.http.post(this.BASE_URL + `api/AccBookings/Book`,
      id
    )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error(error.message);
        },
        () => {
          console.log('Done.');
        }
      ).closed;
  }

  /***User Logs Out***/

  logOut(): boolean {

    return this.http.post(this.BASE_URL + `api/Token/LogOut`, User)
      .subscribe(
        data => {
          if (this.sub) {
            this.sub.unsubscribe();
            console.log('Refresh Gone');
          }
        },
        error => {
          console.error('Not logged out! ' + error.message);
        },
        () => {
          this.user = null;
          localStorage.removeItem('currentUser');
          console.warn('Logged Out.');
          console.log('Log|Out Done.');
          this.route.navigate(['/home']);
        }
      ).closed;
  }

  // *******Set*******//

  set Authenticated(state) {
    this.authenticated = state;
  }
  set GetToken(token) {
    this.getToken = token;
  }

  set User(loggedIn) {
    // this.user=new User();

    this.user = loggedIn;
    // this.Admin=new Object();
    if (this.user.admin === true) {
      this.admin = true;
    }
    console.log('setting user admin = ' + this.Admin);
  }

  set ServiceType(serviceType) {
    this.serviceType = serviceType;
  }

  set Property(property) {
    this.property = property;
  }

  set Flight(flight) {
    this.flight = flight;
  }

  set Payment(payment) {
    this.payment = payment;
  }

  set AccData(accData) {
    this.accData = accData;
  }

  // *******Get*******//

  /*Subcription In Getters; Was Testing*/
  get Me() {
    this.GetToken = 'Bearer ' + localStorage.getItem('currentUser');
    this.refreshCount = 0;
    // if(){}
    this.sub = Observable.interval(30000)
      .subscribe(
        tick => {
          this.RefreshMe();
        },
        error => {
          console.log(error.error);
        }
      );
    return this.http.get(this.BASE_URL + 'api/Token/SignIn')
      .pipe(
        catchError(this.handleError)
      );
  }
  /*End Of Subscription*/

  get GetToken() {
    return this.getToken;
  }

  get Admin() {
    return this.admin;
  }

  get ServiceType() {
    return this.serviceType;
  }

  get Accommodations() {
    return this.accommodations;
  }

  /*Subcription In Getters; Was Testing*/

  get GetAccommodation() {
    console.log(this.accommodations.length);

    if (this.accommodations.length > 0) {
      return true;
    }
    this.refreshCount = 0;

    return this.http.get<Accommodations[]>(this.BASE_URL + `api/Accommodations/GetAll`)
      .subscribe(
        data => {

          console.log(data);
          for (let index = 0; index < data.length; index++) {
            this.accommodations[index] = data[index];
            if (index === 14) {
              break;
            }
          }

        },
        error => {
          console.log(error.message);
        },
        () => {
          console.log('Get done.');
        }
      );
  }

  /*End Of Subscription*/

  get GetProperty() {
    this.refreshCount = 0;
    return this.http.get(this.BASE_URL + `api/Properties/GetAll`);
  }

  get Destination() {
    this.refreshCount = 0;
    return this.destination;
  }

  get GetFlightDetails() {
    this.refreshCount = 0;
    return this.http.get(this.BASE_URL + `api/Flights/FlightDetails/GetDetail`);
  }

  get Flights() {
    return this.flights;
  }

  get FlightDetail() {
    return this.flightDetail;
  }

  get CarRentalDtls() {
    return this.carRentalDtls;
  }

  get Data() {
    return this.data;
  }

  get Authenticated() {

    return this.authenticated;
  }

  get User(): User {
    return this.user;
  }

  get Property() {
    return this.property;
  }

  get Flight() {
    return this.flight;
  }

  get AccData() {
    return this.accData;
  }

  get Payment() {
    return this.payment;
  }

  private handleError(error: HttpErrorResponse) {
    this.sub.unsubscribe();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    this.Authenticated = false;
    console.log('authenticated = ' + this.Authenticated);
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

}
interface Token {
  token: string;
}
