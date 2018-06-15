import { Injectable, EventEmitter } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsersService } from './user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  Accommodations,
  Flights,
  Destinations,
  CarRentals,
  PickUps,
  dropOffs,
  AirDetails,
  ChangeNav,
  Properties,
  AccBooking,
  FlBooking,
  CarBooking,
  AirBooking
} from '../model/service-type';
import { FormControl } from '@angular/forms';
import { Success } from '../service/common-interface';
import { isObject } from 'util';

@Injectable()
export class SearchService {

  private property: Properties[] = [];
  private searchParam = new FormControl('');
  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  diff = 1;
  panel = '1 room';
  num = [{ text: ' room', number: 1 }];
  min: Date = new Date();
  max: Date = new Date();
  nights = 1;

  private rooms = 1;

  firstSearch = '';
  secondSearch = '';
  accommodation: Accommodations[] = [];

  /***Fight***/
  flight: Flights[] = [];
  dest: Destinations[] = [];
  fDateFrom = new Date();
  fDateTo = new Date();
  flightType = 'Economy';
  numOfTravellers = 1;
  /**End**/

  /***CarRental***/

  cDateFrom = new Date();
  cDateReturn: Date;
  /***End***/

  /***AirTaxi***/
  airSearch1: PickUps[] = [];
  airSearch2: dropOffs[] = [];
  airDetails: AirDetails[] = [];
  aDateFrom = new Date();
  aDateReturn: Date;
  numOfPassengers = 1;
  returnJourney = false;
  /***End***/

  private total = 1;
  private bookingObj: any;

  navigate: ChangeNav = new ChangeNav();
  success: Success[] = [{ success: false },
  { success: false },
  { success: false },
  { success: false }];
  routeString: string;

  constructor(
    private http: HttpClient,
    private service: UsersService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.navigate.nav = false;
    console.log(this.navigate.nav);
    console.log(this.flightType + ' Whats going on?');
  }

  /***Search Functions for Services***/

  search(terms: Observable<string>, id: number,
    result?, str?: FormControl) {
    switch (id) {
      case (1):
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.searchEntries(term))
          .subscribe(
            data => {
              console.log(data);
              console.log(result);
              try {
                result.splice(0);

                data.forEach(
                  // tslint:disable-next-line:no-shadowed-variable
                  element => {
                    result.push(element);
                  }
                );
                this.accommodation = result;
              } catch (Error) {
                console.error(Error);
              }
            },
            error => {
              console.error(error.message);
              // this.retry = error.message;


              // serviceSearch.search(this.searchTerm$).distinctUntilChanged;

            },
            () => {
              console.log('search done.');
            }
          );

      case (2):
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.searchEntriesFlightLocale(term))
          .subscribe(
            data => {
              console.log('searching');
              // let fl = data as Flight[];
              // console.log(fl);
              // result=data;
              console.log(result);
              try {
                // if(result)
                result.splice(0);
                // if(data)
                // {
                data.forEach(
                  // tslint:disable-next-line:no-shadowed-variable
                  element => {
                    result.push(new Flights(element));
                    console.log('In loop');
                  }
                );
                this.flight = result;
                // }
              } catch (Error) {
                console.error(Error);
              }
              // if(!this.result.find(s=>s.locale==arr.))

            },
            error => {
              console.error(error.message);
              // this.retry = error.message;

            },
            () => {
              console.log('search done.');
            }
          );

      case (3):
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.searchEntriesFlightDestination(term))
          .subscribe(
            data => {
              console.log('searching');
              console.log(result);
              // let Dest = data as Destination[];
              // console.log(Dest);
              try {

                result.splice(0);
                if (this.flight.length === 1) {
                  console.log(JSON.stringify(this.flight));
                  data.filter(s => s.flightId === this.flight[0].flightId)
                    .forEach(
                      // tslint:disable-next-line:no-shadowed-variable
                      element => {
                        result.push(element);
                      }
                    );
                  console.log('True ' + data.filter(s => s.flightId === this.flight[0].flightId));
                } else if (str.value !== '' && this.flight.length === 0) {
                  console.log(this.service.Flights);
                  data.filter(s => s.flightId === this.service.Flights[0].flightId)
                    .forEach(
                      // tslint:disable-next-line:no-shadowed-variable
                      element => {

                        result.push(element);
                      }
                    );
                } else {
                  data.forEach(
                    // tslint:disable-next-line:no-shadowed-variable
                    element => {

                      result.push(new Destinations(element));
                    }
                  );
                }
                console.log(this.flight.length);
              } catch (Error) {
                console.error(Error);
              }

            },
            error => {
              console.error(error.message);
            },
            () => {
              console.log('search done.');
            }
          );

      case (4):
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.searchEntriesPickUpLocation(term))
          .subscribe(
            data => {
              console.log(data);

              console.log(result);
              try {
                result.splice(0);

                data.forEach(
                  // tslint:disable-next-line:no-shadowed-variable
                  element => {
                    result.push(new CarRentals(element));
                  }
                );
              } catch (Error) {
                console.error(Error);
              }
            },
            error => {
              console.error(error.message);
            },
            () => {
              console.log('Done.');
            }
          );

      case (5):
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.searchEntriesAirTaxiPickUp(term))
          .subscribe(
            data => {
              console.log(data);

              console.log(result);
              try {
                result.splice(0);

                data.forEach(
                  // tslint:disable-next-line:no-shadowed-variable
                  element => {
                    result.push(element);
                  }
                );

                this.airSearch1 = result;
                console.log(result + ' Length == ' + this.airSearch1.length);
                // if (data) {
                console.log(result[0].pickUp);
                // }
              } catch (Error) {
                console.error(Error);
              }
            },
            error => {
              console.error(error.message);
            },
            () => {

            }
          );

      case (6):
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.searchEntriesAirTaxiDropOff(term))
          .subscribe(
            data => {
              console.log(data);
              console.log(result);
              // let airDropOff=new dropOffs[];
              // console.log(airDropOff);

              try {
                result.splice(0);
                if (this.airSearch1.length === 1) {
                  console.log(this.airSearch1);
                  console.log(data.filter(s => s.pickUpId === this.airSearch1[0].pickUpId));
                  data.filter(s => s.pickUpId === this.airSearch1[0].pickUpId)
                    .forEach(
                      // tslint:disable-next-line:no-shadowed-variable
                      element => {
                        result.push(new dropOffs(element));
                      });
                  this.airSearch2 = result;
                } else {
                  data.slice(0, 9).forEach(
                    // tslint:disable-next-line:no-shadowed-variable
                    element => {
                      // console.log(this.airSearch1.length);

                      result.push(new dropOffs(element));
                    });
                  this.airSearch2 = result;
                }
              } catch (Error) {
                console.error(Error);
              }

              console.log(this.airSearch2);
            },
            error => {
              console.error(error.message);
            },
            () => {

            }
          );

      default: break;
    }
  }

  /*Return Functions For Search*/

  searchEntries(term) {
    let concat = term;

    console.log(term.search(',') + ' concat ' + concat);
    if (term.includes(',')) {
      const split = term.split(',');
      concat = split[0];
    }
    console.log(concat);
    return this.http
      .get<Accommodations[]>(environment.base_url +
        `api/Accommodations/Search/${concat}`);
  }

  searchEntriesFlightLocale(term) {
    return this.http
      .get<Flights[]>(environment.base_url + `api/Flights/Search/${term}`);
  }

  searchEntriesFlightDestination(term) {
    return this.http
      .get<Flights[]>(environment.base_url + `api/Flights/Destinations/Search/${term}`);
  }

  searchEntriesPickUpLocation(term) {
    return this.http
      .get<Destinations[]>(environment.base_url + `api/CarRentals/Search/${term}`);

  }

  searchEntriesAirTaxiPickUp(term) {
    return this.http.get<PickUps[]>(environment.base_url +
      `api/AirTaxis/AirTaxiPickUps/Search/${term}`);
  }

  searchEntriesAirTaxiDropOff(term) {
    return this.http.get<dropOffs[]>(environment.base_url +
      `api/AirTaxis/AirTaxiDropOffs/Search/${term}`);
  }

  /***Additional Function For Services***/

  Search(value: number,
    dateForm: Date, dateTo: Date, panel: string, accommodationOrsearch?: Accommodations | FormControl):
    boolean {
    const accId = value;
    try {
      return this.http.get<Properties[]>(environment.base_url +
        `api/Accommodations/Properties/GetProperties/${accId}`)
        .subscribe(
          data => {
            console.log(data);

            this.property.splice(0);
            data.forEach(
              element => {
                this.property.push(element);
              }
            );
            // this.property = data;

            console.log(JSON.stringify(this.Property));

            // this.searchParam = search;
            this.DateFrom = dateForm;
            this.DateTo = dateTo;
            this.Panel = panel;
            this.Nights = this.diff;

            this.property.length > 0 ?
              this.route.navigate(['/acc-detail']) : this.route.navigate(['/home']);
            // if (this.route.isActive('/acc-detail', exact)) {
            //   console.log('*********In same dir');
            //    this.route.onSameUrlNavigation = 'reload';
            // } else {
            // this.route.navigate(['/acc-detail']); }
            // if (accommodationOrsearch isObject())
            const search = accommodationOrsearch as FormControl;
            /**Try FormControl conversion**/
            try {
              // console.log(search.status === null);
              if (localStorage.getItem('info#1') && search.status) {
                console.log(search);
                search.setValue(localStorage.getItem('info#1'));
              }
            } catch (error) {
              console.log(error);
            }
            /**
             * Trying Accommodations conversion
             */
            const accom = accommodationOrsearch as Accommodations;
            try {
              if (accom.country) {
                localStorage.setItem('info#1', accom.country + ', ' + accom.location + ':' + accId);
              }
            } catch (error) {
              console.log(error);
            }
          },
          error => {
            console.error(error.message);
          },
          () => {
            console.log('search done.');
          }
        ).closed;
    } catch (error) {
      console.error(error);
    }
  }


  propertySearch(value?: string) {
    if (this.Property != null) {
      return this.Property.find(m => m.propName.includes(value));
    } else {
      return false;
    }
  }

  // tslint:disable-next-line:no-shadowed-variable
  AirTaxis(pickUp: string, dropOff: string, loading?) {
    // tslint:disable-next-line:no-shadowed-variable
    // const PickUp = this.airSearch1.find(s => s.pickUp === pickUp);
    // const DropOff = this.airSearch2.find(s => s.dropOff === dropOff);
    // console.log(PickUp.pickUpId);
    // console.log(DropOff.dropOffId);
    console.log(pickUp + ', ' + dropOff);
    return this.http.get<AirDetails[]>(environment.base_url +
      `api/AirTaxis/AirDetails/GetAirDetail/${pickUp}&${dropOff}`)
      .subscribe(
        data => {
          console.log(data);
          // this.airDetails = data;
          if (data.length !== 0) {
            this.airDetails.splice(0);
            data.forEach(
              element => {
                this.airDetails.push(element);
              }
            );
            console.log(this.airDetails);
            /****/
            this.navigate.nav = true;
            console.log(this.navigate.nav);
            this.route.navigate(['/air-detail']);
            localStorage.setItem('info#4', pickUp + ':' + dropOff);
          } else {
            if (loading) {
              loading.errorMessage = 'AirTaxi not yet available';
            }
          }
        },
        error => {
          console.error(error.message);
        },
        () => {
          console.log('Done.');
        }
      );
  }

  /***Initial Payment Process***/

  PaymentReceive(myRoute: string, obj: any) {
    console.log('In payment!');
    if (this.service.User) {
      switch (myRoute) {

        case ('acc-detail'): {
          this.service.Property = obj.Property;
          this.DateFrom = obj.DateFrom;
          this.DateTo = obj.DateTo;
          this.Panel = obj.str;
          console.log(this.Panel);
          console.log(this.panel);
          this.Rooms = +obj.str.split(' ')[0];
          this.Total('accommodation');
        }

        // tslint:disable-next-line:no-switch-case-fall-through
        case ('flight-detail'): {
          this.service.flight = obj.Detail;

          // this.fDateFrom = obj.DateFrom;
          // //this.flightType = obj.Type;
          // this.numOfTravellers = obj.Travellers;
          console.log(this.service.flight);
          console.log('FlightType ' + this.flightType);
          // this.flightType="Economy";
          console.log('Should be ' + this.flightType);
          this.Total('flight');
        }

        // tslint:disable-next-line:no-switch-case-fall-through
        case ('car-detail'): {
          this.service.carRental = obj.Detail;
          console.log('carrental = ' + this.service.carRental);
          this.Total('carRental');
        }

        // tslint:disable-next-line:no-switch-case-fall-through
        case ('air-detail'): {
          this.service.airTaxi = obj.Detail;
          console.log('airTaxi = ' + this.service.airTaxi);
          this.Total('airTaxi');
        }
      }

      this.routeString = myRoute;

      this.route.navigate(['/payment']);
    } else {
      // this.snackBar.open("SignIn to book accommodation.")._dismissAfter(5000);
      this.service.check.error = true;
      this.service.check.errorMessage = 'SignIn or Register to book accommodation.';

    }
  }

  /***Calculate Total***/

  Total(serviceType?: string) {
    // let rooms = this.panel;
    console.log(serviceType);
    switch (serviceType) {
      case ('accommodation'):
        if (this.service.Property && this.Panel) {
          // let number = rooms.split(" ");
          this.total = this.service.Property.accDetail[0].pricePerNight * (this.Nights * (this.Rooms));

          console.log(this.total + ' service ' +
            this.service.Property.accDetail[0].pricePerNight + ' Nights ' + this.Nights + ' Panel number: ' +
            this.Rooms + ' Panel text: ' + this.panel + ' panel strigfy: ' + this.panel);
        }

      // tslint:disable-next-line:no-switch-case-fall-through
      case ('flight'):
        if (this.service.flight) {
          console.log('Flight type : ' + this.flightType);
          switch (this.flightType) {
            case ('Economy'): {
              this.total = (this.service.flight.price + environment.economy) * this.numOfTravellers;
              console.log(this.total + ' ' + environment.economy + ' ' + this.numOfTravellers);
            }

            // tslint:disable-next-line:no-switch-case-fall-through
            case ('Premium Economy'):
              this.total = (this.service.flight.price + environment.premium_economy) * this.numOfTravellers;

            // tslint:disable-next-line:no-switch-case-fall-through
            case ('Business'):
              this.total = (this.service.flight.price + environment.business) * this.numOfTravellers;

            // tslint:disable-next-line:no-switch-case-fall-through
            case ('First Class'):
              this.total = (this.service.flight.price + environment.first_class) * this.numOfTravellers;
          }
        }

      // tslint:disable-next-line:no-switch-case-fall-through
      case ('carRental'):
        {
          if (this.service.carRental) {
            this.total = this.service.carRental.price;
          }
        }

      // tslint:disable-next-line:no-switch-case-fall-through
      case ('airTaxi'):
        {
          if (this.service.airTaxi) {
            this.total = this.service.airTaxi.price * this.numOfPassengers;
          }
        }
    }
    return this.total;
  }

  /*Payment And Store Booking to database*/

  Book(): boolean {
    switch (this.routeString) {
      case ('acc-detail'): {

        this.bookingObj = new AccBooking({
          userId: this.service.User.userId,
          propId: this.service.Property.propId,
          bookDate: this.DateFrom,
          numOfNights: this.nights,
          payStatus: true,
          payType: 'PayPal',
          total: this.Total()
        });

        return this.http.post(environment.base_url + 'api/Accommodations/AccBookings/New', this.bookingObj)
          .subscribe(
            data => {
              console.log(data);
              this.success[0].success = true;
            },
            error => {
              console.log(error.message);
              this.service.check.errorMessage = 'Something went wrong. Please contact us.';
              this.service.check.error = true;
            },
            () => {
              console.log('Done.');
            }
          ).closed;
      }
      case ('flight-detail'):
        {

          this.bookingObj = new FlBooking({
            userId: this.service.User.userId,
            detailId: this.service.flight.detailId,
            flightType: this.flightType,
            bookDate: this.fDateFrom,
            travellers: this.numOfTravellers,
            payStatus: true,
            payType: 'PayPal',
            total: this.Total()
          });

          return this.http.post(environment.base_url + `api/Flights/FlBookings/New`, this.bookingObj)
            .subscribe(
              data => {
                console.log(data);
                this.success[1].success = true;
              },
              error => {
                console.log(error.message);
                this.service.check.errorMessage = 'Something went wrong. Please contact us.';
                this.service.check.error = true;
              },
              () => {

              }
            )
            .closed;
        }
      case ('car-detail'):
        {
          this.bookingObj = new CarBooking({
            userId: this.service.User.userId,
            carId: this.service.carRental.carId,
            bookDate: this.cDateFrom,
            returnDate: this.cDateReturn,
            payType: 'PayPal',
            payStatus: true,
            total: this.total
          });
          console.log(this.bookingObj);
          return this.http.post(environment.base_url + `api/CarRentals/CarBookings/New`, this.bookingObj)
            .subscribe(
              data => {
                console.log(data);
                this.success[2].success = true;
              },
              error => {
                console.log(error.message);
                this.service.check.errorMessage = 'Something went wrong. Please contact us.';
                this.service.check.error = true;
              },
              () => {

              }
            )
            .closed;
        }
      case ('air-detail'):
        {
          this.bookingObj = new AirBooking({
            userId: this.service.User.userId,
            airDetailId: this.service.airTaxi.airDetailId,
            bookDate: this.aDateFrom,
            returnJourney: this.aDateReturn,
            passengers: this.numOfPassengers,
            payType: 'PayPal',
            payStatus: true,
            total: this.total
          });
          return this.http.post(environment.base_url + `api/AirTaxis/AirBookings/New`, this.bookingObj)
            .subscribe(
              data => {
                console.log(data);
                this.success[3].success = true;
              },
              error => {
                console.log(error.message);
                // this.success[3].success = false;
                this.service.check.errorMessage = 'Something went wrong. Please contact us.';
                this.service.check.error = true;
              },
              () => {

              }
            )
            .closed;
        }
      default: console.error('Nothing Happened!'); return true;
    }

  }

  /*Routing Function*/

  GoBack(str: string) {
    this.route.navigate([str]);
  }

  /*****Set*****/

  set Property(property) {
    this.property = property;
  }

  set SearchParam(searchParam) {
    this.searchParam = searchParam;
  }

  set DateFrom(dateFrom) {
    this.dateFrom = dateFrom;
  }

  set DateTo(dateTo) {
    this.dateTo = dateTo;
  }

  set Diff(diff) {
    this.diff = diff;
  }

  set Min(min) {
    this.min = min;
  }

  set Max(max) {
    this.max = max;
  }

  set Panel(panel) {
    console.log('not undefined' + panel);
    this.panel = panel;
    // console.log(panel.number)
  }

  set Num(num) {
    this.num = num;
  }

  set Rooms(rooms) {
    this.rooms = rooms;
  }

  set Nights(nights) {
    this.nights = nights;
  }



  /*****Get*****/

  get Property() {
    return this.property;
  }

  get SearchParam() {
    return this.searchParam;
  }

  get DateFrom() {
    return this.dateFrom;
  }

  get DateTo() {
    return this.dateTo;
  }

  get Diff() {
    return this.diff;
  }

  get Min() {
    return this.min;
  }

  get Max() {
    return this.max;
  }

  get Panel() {
    console.log('not undefined' + JSON.stringify(this.panel));
    return this.panel;
  }

  get Num() {
    return this.num;
  }

  get Rooms() {
    return this.rooms;
  }

  get Nights() {
    return this.nights;
  }
}
