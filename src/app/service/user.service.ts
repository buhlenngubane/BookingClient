import { Injectable } from '@angular/core';
import { User } from '../model/user';
import 'rxjs/add/operator/map';
// import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { MatDialogRef } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RegisterComponent } from '../register/register.component';
import { changeLayout, Users } from './common-interface';
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
import { DatePipe } from '@angular/common';

@Injectable()
export class UsersService {
  serviceType: string;
  private user: User;
  private password: string;
  private admin = false;
  private myToken: Token;
  private body: object;
  private authenticated: boolean;
  private BASE_URL = environment.base_url;
  private getToken = '';
  private payment: number;
  myObservable;
  // timer = Observable.timer(10000, 1000);
  private sub: Subscription;

  /**Accommodation**/
  accommodations: Accommodations[] = [];
  property: Properties;
  roomsAvailable = true;
  rooms: [{ available: number }] = [{ available: 1 }];

  /**Flight**/
  private flights: Flights[];
  private destination: Destinations[];
  flight: FlightDetails;
  private flightDetail: FlightDetails[] = [];
  locale = new FormControl('', [Validators.required
    , Validators.pattern('[A-Za-z]{0,}[A-Za-z ,-]*')]);
  dest = new FormControl('', [Validators.required
    , Validators.pattern('[A-Za-z]{0,}[A-Za-z ,-]*')]);
  FdateFrom = new Date();
  FdateTo = new Date();
  FminDate = new Date();
  FminDate2: Date;
  FmaxDate2 = new Date(new Date().getFullYear() + 1, 7, 1);
  FmaxDate = new Date(new Date().getFullYear() + 1, 6, 30);
  flightPrice = [];

  /**CarRental**/
  carRental: CarRentalDetails;
  carRentalDtls: CarRentalDetails[] = [];
  price = [];
  priceDateFrom;
  priceDateTo;
  /**AirTaxi**/
  airTaxi: AirDetails;
  timeFrom: FormControl;
  timeTo: FormControl;

  /**Common logic**/
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

  images = [];

  paypalLoad = false;
  load: Loading = { error: false, load: true, errorMessage: '' };
  loggedOut = true;

  pipe = new DatePipe('en-US');
  private _hubConnection: HubConnection;
  msgs = [];

  from = 1;
  to: number;

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    // this.user=new User();
    this.error = false;
    this.FdateTo.setHours(48);
    this.FminDate2 = this.FdateTo;

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
            .catch(err => console.log('Error while establishing connection :( ' + err));
        }
      );

    this._hubConnection.on('BroadcastMessage', (message: string) => {
      this.msgs.push({ severity: 'warn', summary: message });
      if (this.rooms.length > 0) {
        this.rooms.forEach(element => {
          element.available--;
        });
      }
    });
    this._hubConnection.serverTimeoutInMilliseconds = 100000000;
  }

  /***User Function Calls***/

  userRegister(customer: object, regRef: MatDialogRef<RegisterComponent>): boolean {
    // this.body = customer;
    this.User = new User(customer);
    // console.log(this.user);

    return this.http.post<User>(this.BASE_URL + 'api/Users/Register',
      this.User)// , this.httpOptions)
      .map((response) => {
        console.log(response);
        this.SetToken(this.user.email, this.password)
          .subscribe(
            () => {
            },
            error => {
              console.error(error + ' for token!!!');
              this.body = error;
              regRef.disableClose = false;
              this.loggedOut = true;
            }, () => {
              console.log('Done auth');
              regRef.disableClose = false;
              if (regRef.componentInstance) { regRef.close(); }
              this.Authenticated = true;
            }

          );
      })
      .subscribe(() => { },
        (error) => {
          console.error(error + ' for signIn!!!');
          console.error(error);
          try {
            this.check.errorMessage = error.error.toString();

            if (this.check.errorMessage === 'Email exists') {
              this.check.errorMessage = 'Email exists';
            } else {
              this.check.errorMessage = 'Error occured.';
            }
          } catch (Err) { this.check.errorMessage = 'Error occured'; }
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
        // console.log(JSON.stringify(response));
        this.User = new User(response);
        /*if(this.user.userId==1)
          this.admin=true;*/
        this.password = this.user.password;
        // this.User.password = '';
        console.log('Token launch');
        this.SetToken(Email, Password)
          .subscribe(
            data => {
              // console.log(data);
            },
            error => {
              console.error(error + ' for token!!!');
              this.check.errorMessage = 'Something went wrong.';
              this.check.error = true;
              signInRef.disableClose = false;
              signInRef.close();
              this.loggedOut = true;
              // this.body = error;
            }, () => {
              console.log('Done auth');
              if (signInRef.componentInstance) {
                signInRef.disableClose = false;
                signInRef.close();
              }
              this.Authenticated = true;
            }
          );
      },
        error => {
          console.error(error.error + ' for signIn!!!');
          // this.data = error.error;
          try {
            this.check.errorMessage = error.error.toString();

            if (error.message.includes('unknown url')) {
              this.check.errorMessage = 'Cannot reach server';
            } else
              if (this.check.errorMessage.includes('Email')) {
                this.check.errorMessage = 'Email not found';
              } else
                if (this.check.errorMessage.includes('Password')) {
                  this.check.errorMessage = 'Password not found';
                } else {
                  this.check.errorMessage = 'Error occured.';
                }
          } catch (Err) { this.check.errorMessage = 'Error occured'; }

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

  userUpdate(userUpdate: any, loading: changeLayout): boolean {
    this.user.deserialize(userUpdate);

    return this.http.put(this.BASE_URL + 'api/Users/UpdateUser',
      this.user)// , this.httpOptions)
      .map(response => {
        console.log(response);
      })
      .subscribe(data => {
        console.log(data);
      },
        error => {
          this.check.error = true;
          try {
            this.check.errorMessage = error.error.toString();
            console.error(error.error);
            // console.error(this.httpOptions);
            if (this.check.errorMessage.includes('400')) {
              loading.errorMessage = 'Internal server error';
              this.check.errorMessage = 'Internal server error';
            }

            if (this.check.errorMessage.includes('unknown url')) {
              loading.errorMessage = 'Server unreachable.';
              this.check.errorMessage = 'Server unreachable.';
            }
          } catch (Err) { this.check.errorMessage = 'Error occured'; }

          loading.load = false;
          loading.error = true;
          // message.error="";
        },
        () => {
          console.log('Update Done uncheck interface');
          loading.load = false;
        }).closed;
  }

  /***Token Getting***/

  SetToken(email: string, password: string): Observable<any> {
    console.log('Email = ' + email + ' Password = ' + password);
    return this.http.get<Token>(this.BASE_URL + `api/Token/CreateToken/${email}&${password}`)
      .map((response) => {
        this.myToken = response as Token;
        console.log(this.myToken.token);
        this.getToken = 'Bearer ' + this.myToken.token;
        localStorage.setItem('currentUser', this.myToken.token);

        this.loggedOut = false;
        this.sub = Observable.interval(30000)
          .subscribe(
            tick => {
              if (this.sub && !this.loggedOut) {
                this.RefreshMe();
              }
            }
            ,
            error => {
              console.log(error.error);
              // location.reload();
              // tslint:disable-next-line:prefer-const
              let exact = false;
              if (this.route.isActive('/home', exact)) {
                location.reload();
              }
            }
          );

        console.log('Auth is true!!!!');
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  RefreshMe(): boolean {
    try {
      return this.http.get(environment.base_url + 'api/Token/Refresh')
        .map(data => {
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
            this.route.navigate(['/home']);
            // tslint:disable-next-line:prefer-const
            let exact = false;
            if (this.route.isActive('/home', exact)) {
              location.reload();
            }
            console.warn('Removed Token!!!');
            try {
              this.sub.unsubscribe();
            } catch (Err) {
              console.log(Err);
            }
          },
          () => {
            console.log('Done');
          }
        ).closed;
    } catch (error) {
      console.log('Error');
      return false;
    }
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
              try {
                loading.errorMessage = error.error.toString();
              } catch (Err) { loading.errorMessage = 'Error occured'; }
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
              service.splice(0);
              this.flightData.splice(0);
              data.forEach(
                element => {
                  service.push(element);
                  this.flightData.push(element);
                }
              );
            },
            error => {
              console.log(error);
              try {
                const err = error.error.toString();
                loading.errorMessage = err;
              } catch (Err) { loading.errorMessage = 'Error occured'; }
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
              const err = error.error.toString();
              loading.errorMessage = err;
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
              const err = error.error.toString();
              loading.errorMessage = err;
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
          console.log('What r u doing');
          this.flights = data;

          console.log(this.flights);
          console.log(this.flights[0].locale);
          if (!localStorage.getItem('info#2')) {
            this.locale.setValue(this.flights[0].locale);
            // console.log('What r u doing');
            console.log(this.locale.value);

            this.dest.setValue(this.flights[0].destination[0].dest);
            console.log(this.dest.value);
          } else {
            this.locale.setValue(localStorage.getItem('info#2').split('*')[0]);
            this.dest.setValue(localStorage.getItem('info#2').split('*')[1]);
          }
        },
        error => {
          console.error(error.message);
          try {
            this.check.errorMessage = error.error.toString();
            if (error.message.includes('unknown url')) {
              this.check.errorMessage = 'Error connecting with server';
            }
          } catch (Err) { this.check.errorMessage = 'Error occured'; }
          this.check.error = true;
        },
        () => {
          console.log('Done');
        }
      ).closed;
  }

  SearchFlights(loc: string, dest: string, dateLoc: Date, dateDest?: Date, flightType?: string, num?: number, Errors?): boolean {
    // console.log("Id = " + id)
    console.log('In SearchFlights');
    console.log(dateDest);
    this.locale.setValue(loc);
    this.dest.setValue(dest);
    const strLoc = this.pipe.transform(dateLoc, 'yyyy-MM-dd').toString();
    const strDest = dateDest ? this.pipe.transform(dateDest, 'yyyy-MM-dd').toString() : null;
    // Creating a url query so to return Location and optionally Destination
    const url = dateDest ? `api/Flights/FlightDetails/GetFlightDetail/` +
      `?locale=${loc}&destination=${dest}&` +
      `departureDate=${strLoc}` +
      `&returnDate=${strDest}` :
      `api/Flights/FlightDetails/GetFlightDetail/` +
      `?locale=${loc}&destination=${dest}&` +
      `departureDate=${strLoc}`;

    console.log(dest);
    return this.http.get<FlightDetails[]>(environment.base_url +
      url
    )
      .subscribe(
        data => {
          console.log(data);
          // this.flightDetail = data;
          this.flightDetail.splice(0);
          // let index = 0;
          this.flightPrice.splice(0);
          if (num >= 1 && num <= 30) {
            data.forEach(
              element => {

                this.flightDetail.push(element);

                /**Calculate total for each flight**/
                switch (flightType) {
                  case ('Premium Economy'): {
                    this.flightPrice.push({
                      price:
                        (+element.price + environment.premium_economy) * num,
                      travellers: num
                    });
                    break;
                  }

                  case ('Business'): {
                    this.flightPrice.push({
                      price:
                        (+element.price + environment.business) * num,
                      travellers: num
                    });
                    break;
                  }

                  case ('First Class'): {
                    this.flightPrice.push({
                      price:
                        (+element.price + environment.first_class) * num,
                      travellers: num
                    });
                    console.log(environment.first_class + ' Price ' + +element.price + ' Num ' + num);
                    console.log((+element.price + environment.first_class) * num);
                    break;
                  }

                  default: this.flightPrice.push({
                    price:
                      (element.price) * num,
                    travellers: num
                  });
                }
              }
            );
          }
          console.log(this.flightDetail);
          // tslint:disable-next-line:prefer-const
          let exact = false;

          this.route.navigate(['/flight-detail']);
          if (!dateDest) {
            localStorage.setItem('info#2',
             loc + '*' + dest + '*' + strLoc + '*' + false + '*' + flightType + '*' + num);
          } else {
            localStorage.setItem('info#2',
             loc + '*' + dest + '*' + strLoc + '*' + strDest + '*' + flightType + '*' + num);
          }
        },
        error => {
          console.error(error.message);
          const err = error.message.toString();
          const status = err;

          this.flightDetail.splice(0);

          if (status.includes('404') && Errors) {
            Errors.errorMessage = 'Flight not yet available.';
            Errors.error = true;
            this.locale.markAsUntouched();
            // this.locale.setValue('Heelo');
          } else {
            this.load.errorMessage = error.error;
            this.load.error = true;
          }
        },
        () => {
          console.log('Done');
        }
      ).closed;
  }

  CarRentalDetails(search: string, dateFrom: Date, dateTo: Date, timeFrom: string, timeTo: string, load?) {
    return this.http.get<CarRentalDetails[]>(this.BASE_URL +
      `api/CarRentals/Cars/GetDetails/${search}`)
      .subscribe(
        data => {
          console.log(data);
          this.priceDateFrom = dateFrom;
          this.priceDateTo = dateTo;
          console.log(new Date(this.priceDateFrom).valueOf());
          console.log(new Date(this.priceDateTo).valueOf());
          const pr = Math.round((new Date(this.priceDateTo).valueOf() - new Date(this.priceDateFrom).valueOf()) / 1000 / 60 / 60 / 24);
          console.log(pr);
          this.carRentalDtls.splice(0);
          this.price.splice(0);
          data.forEach(
            element => {
              this.carRentalDtls.push(element);
              if (pr > 0) {
                this.price.push(+element.price * +pr);
              } else {
                this.price.push(element.price);
                console.log(element.price);
              }
            }
          );
          console.log(this.carRentalDtls);

          this.route.navigate(['car-detail']);

          localStorage.setItem('info#3', JSON.stringify({
            search: search,
            dateFrom: dateFrom, dateTo: dateTo, timeFrom: timeFrom, timeTo: timeTo
          }));
        },
        error => {
          console.error(error.message);
          const err = error.error;
          const emsg = err;
          // console.log(emsg.includes('404'));
          if (error.message.includes('404')) {
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
            try {
              this.sub.unsubscribe();
            } catch (Err) {
              console.log(Err);
            }
            console.log('Refresh Gone');
          }
          this.user = null;
          if (this.sub.closed) {
            localStorage.removeItem('currentUser');
            location.reload();
          } else {
            console.log('Error logging out');
            localStorage.removeItem('currentUser');
          }
          this.loggedOut = true;
        },
        error => {
          console.error('Not logged out! ' + error.message);
          this.loggedOut = false;
        },
        () => {
          console.warn('Logged Out.');
          // tslint:disable-next-line:prefer-const
          let exact = false;
          if (this.route.isActive('/home', exact)) { }
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

    this.user = loggedIn;
    if (this.user.admin === true) {
      this.admin = true;
    }
  }

  set ServiceType(serviceType) {
    this.serviceType = serviceType;
  }

  // set Property(property) {
  //   this.property = property;
  // }

  // *******Get*******//

  /*Subcription In Getters; Was Testing*/
  get Me() {
    this.GetToken = 'Bearer ' + localStorage.getItem('currentUser');
    // if(){}
    this.sub = Observable.interval(30000)
      .subscribe(
        tick => {
          try {
            this.RefreshMe();
          } catch (error) {
            console.log(error);
          }
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

  get Accommodations() {
    return this.accommodations;
  }

  /*Subcription In Getters; Was Testing*/

  get GetAccommodation() {
    console.log(this.accommodations.length);

    if (this.accommodations.length > 0) {
      return true;
    }

    return this.http.get<Accommodations[]>(this.BASE_URL + `api/Accommodations/GetAll`)
      .subscribe(
        data => {

          console.log(data);
          for (let index = 0; index < data.length; index++) {
            this.accommodations[index] = data[index];
            // if (index === 14) {
            //   break;
            // }
          }
          if (this.accommodations.length > 5) {
            this.to = 5;
            console.log(this.to + ' ' + this.accommodations.length);
          } else {
            this.to = this.accommodations.length;
            console.log(this.to + ' ' + this.accommodations.length);
          }
          this.accommodations.forEach(element => {
            this.images.push('data:image/jpeg;base64,' + element.picture);
          });

        },
        error => {
          console.log(error.message);
          const err = error.error.toString();
          this.check.errorMessage = err;
          if (error.message.includes('unknown url')) {
            this.check.errorMessage = 'Error connecting with server';
          }
          this.check.error = true;
        },
        () => {
          console.log('Get done.');
        }
      );
  }

  /*End Of Subscription*/

  get GetProperty() {
    return this.http.get(this.BASE_URL + `api/Properties/GetAll`);
  }

  get Destination() {
    return this.destination;
  }

  get GetFlightDetails() {
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

  get Authenticated() {

    return this.authenticated;
  }

  get User() {
    return this.user;
  }

  get Admin() {
    return this.admin;
  }

  get AccData() {
    return this.accData;
  }

  private handleError(error: HttpErrorResponse) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
