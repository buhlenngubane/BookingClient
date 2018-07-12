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
  AirBooking,
  FlightDetails
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
  value1: any;
  value2: any;

  private rooms = 1;

  firstSearch = '';
  secondSearch = '';
  /**Accommodation**/
  accommodation: Accommodations[] = [];
  availDateFrom = false;
  availDateTo = false;
  availRooms = [];
  rows = 2;
  index = [];

  /***Fight***/
  searchFlight: Flights[] = [];
  // dest: Destinations[] = [];
  flightDetails: FlightDetails[] = this.service.FlightDetail;
  fDateFrom = new Date();
  fDateTo = null;
  return = false;
  flightType = 'Economy';
  numOfTravellers = 1;
  private fPrice = 1;
  numCount: [{ number: number }];
  names: FormControl[];
  names_valid = true;
  submitted = false;
  travellersNames: string[] = [];
  travellersSurnames: string[] = [];
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
  noTaxi = false;
  returnJourney = false;
  aTotal = [];
  /***End***/

  private total = 1;
  private bookingObj: any;

  navigate: ChangeNav = new ChangeNav();
  success: Success[] = [{ success: false },
  { success: false },
  { success: false },
  { success: false }];
  routeString: string;
  overralPrice = [{ detail: [] }];
  /***End***/

  constructor(
    private http: HttpClient,
    private service: UsersService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.navigate.nav = false;
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
              console.log(result);
              try {
                result.splice(0);

                data.forEach(
                  // tslint:disable-next-line:no-shadowed-variable
                  element => {
                    result.push(new Flights(element));
                    console.log('In loop');
                  }
                );
                this.searchFlight = result;
                // }
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

      case (3):
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.searchEntriesFlightDestination(term))
          .subscribe(
            data => {
              console.log('searching');
              console.log(result);
              try {

                result.splice(0);
                if (this.searchFlight.length === 1) {
                  console.log(JSON.stringify(this.searchFlight));
                  data.filter(s => s.flightId === this.searchFlight[0].flightId)
                    .forEach(
                      // tslint:disable-next-line:no-shadowed-variable
                      element => {
                        result.push(element);
                      }
                    );
                  console.log('True ' + data.filter(s => s.flightId === this.searchFlight[0].flightId));
                } else if (str.value !== '' && this.searchFlight.length === 0) {
                  console.log(this.service.Flights);
                  if (this.service.Flights) {
                  data.filter(s => s.flightId === this.service.Flights[0].flightId)
                    .forEach(
                      // tslint:disable-next-line:no-shadowed-variable
                      element => {

                        result.push(element);
                      }
                    );
                  } else {
                    data.filter(s => s.flightId === this.service.FlightDetail[0].dest.flightId)
                    .forEach(
                      // tslint:disable-next-line:no-shadowed-variable
                      element => {

                        result.push(element);
                      }
                    );
                  }
                  console.log('Should include flights ' + JSON.stringify(result));
                } else {
                  data.forEach(
                    // tslint:disable-next-line:no-shadowed-variable
                    element => {

                      result.push(element);
                    }
                  );
                }
                console.log(this.searchFlight.length);
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

    // Searching by first entry on searchbar
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

  Search(dateForm: Date, dateTo: Date, panel: FormControl, accommodationOrsearch?, errorCheck?):
    boolean {
    this.rows = 2;
    let country = '';
    let location = '';
    const accom = accommodationOrsearch as Accommodations;
    const search = accommodationOrsearch as FormControl;

    try {
      const value = search.value + '';
      if (value.includes(',')) {
        country = value.split(',')[0].trim();
        location = value.split(',')[1].trim();
      } else if (accom.country && accom.location) {
        country = accom.country;
        location = accom.location;
      } else {
        errorCheck.errorMessage = 'Accommodation not yet available';
                errorCheck.error = true;
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    try {
      return this.http.get<Properties[]>(environment.base_url +
        `api/Accommodations/Properties/GetProperties/${country}&${location}`)
        .subscribe(
          data => {
            console.log(data);
            const pip = new DatePipe('en-US');
            // let index = 0;
            this.value1 = dateTo;
            this.value2 = dateForm;

            this.diff = Math.round((this.value1 - this.value2) / 1000 / 60 / 60 / 24);
            this.property.splice(0);
            this.overralPrice.splice(0);
            this.service.rooms.splice(0);
            this.index.splice(0);
            this.availRooms.splice(0);
            console.log(panel.value);
            let count = 0;
            data.forEach(
              element => {
                this.property.push(element);

                element.accDetail.find(s => s.availableRooms >= +panel.value.split(' ')[0]) ?
                  this.availRooms.push(true) :
                  this.availRooms.push(false);

                this.service.rooms.push({ detail: [{ available: 1 }] });
                this.overralPrice.push({ detail: [] });
                this.index.push(0);
                console.log(this.overralPrice);
                this.service.rooms[count].detail.splice(0);
                // this.overralPrice[count].detail.splice(0);

                /**Check if date available**/
                for (let index = 0; index < element.accDetail.length; index++) {
                  // const element = element.accDetail[index];
                  const Fromdate = element.accDetail[index].dateAvailableFrom.toString().split('T')[0];
                  const FromY = Fromdate.split('-')[0];
                  const FromM = Fromdate.split('-')[1];
                  const Fromday = Fromdate.split('-')[2];
                  const nowY = pip.transform(dateForm, 'yyyy');
                  const nowM = pip.transform(dateForm, 'MM');
                  const nowDay = pip.transform(dateForm, 'dd');

                  const Todate = element.accDetail[index].dateAvailableTo.toString().split('T')[0];
                  const ToY = Todate.split('-')[0];
                  const ToM = Todate.split('-')[1];
                  const Today = Todate.split('-')[2];
                  const returnY = pip.transform(dateTo, 'yyyy');
                  const returnM = pip.transform(dateTo, 'MM');
                  const returnDay = pip.transform(dateTo, 'dd');

                  this.overralPrice[count].detail.push({
                    price:
                      element.accDetail[index].pricePerNight *
                      +panel.value.split(' ')[0] * this.diff
                  });
                  // Pushing rooms available for display
                  this.service.rooms[count].detail.push({ available: +element.accDetail[index].availableRooms });

                  if (
                    (+FromY <= +nowY)
                    && (
                      (
                        (+Fromday <= +nowDay) && FromM === nowM
                      )
                      ||
                      (
                        (
                          (+FromY < +nowY) && FromM < nowM
                        )
                        ||
                        (+FromY < +nowY)
                      )
                    )
                  ) {
                    this.availDateFrom = true;
                  } else {
                    this.availDateFrom = false;
                  }

                  if (
                    (+ToY >= +returnY)
                    &&
                    (
                      (
                        (+Today >= +returnDay) && ToM === returnM
                      )
                      ||
                      (
                        (ToY === returnY) && (+ToM > +returnM)
                      )
                      ||
                      (+ToY > +returnY)
                    )
                    && this.availDateFrom) {
                    this.availDateTo = true;
                    // When there is more than one accommodation detail
                    this.index[count++] = index;
                    break;
                  } else {
                    this.index[count++] = 0; this.availDateTo = false;
                  }
                  /*End*/
                  console.log(this.availDateFrom + ' ' + this.availDateTo);
                  console.log(this.availRooms);

                  console.log(
                    this.overralPrice.length + ' ' + this.index
                  );
                }
              }
            );
            this.rows += data.length;
            console.log(this.service.rooms);
            console.log(JSON.stringify(this.Property));
            console.log(this.overralPrice[0].detail[0].price);

            this.DateFrom = dateForm;
            this.DateTo = dateTo;
            this.Panel = panel.value;
            this.Nights = this.diff;

            if (this.Property.length > 0) {
              // tslint:disable-next-line:prefer-const
              let exact;
              if (!this.route.isActive('/acc-detail', exact)) {
                this.route.navigate(['/acc-detail']);
              }
            } else {
              panel.setErrors({ 'roomsAvailable': true });
            }

            localStorage.setItem('info#1', country + ', ' + location);
          },
          error => {
            console.error(error.message);
            // tslint:disable-next-line:prefer-const
            let exact;
            try {
              if (error.message.includes('404') && search.status) {
                if (this.route.isActive('/acc-detail', exact)) {
                  this.route.navigate(['/home']);
                }
                search.markAsUntouched();
                errorCheck.errorMessage = 'Accommodation not yet available';
                errorCheck.error = true;
              } else {
                this.service.check.errorMessage = 'Error Connecting To Server';
                this.service.error = true;
                if (this.route.isActive('/acc-detail', exact)) {
                  this.route.navigate(['/home']);
                }
              }
            } catch (Err) {
              this.service.check.errorMessage = 'Error occured';
              if (this.route.isActive('/acc-detail', exact)) {
                this.route.navigate(['/home']);
              }
            }
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
  AirTaxis(pickUp: string, dropOff: string, dateFrom: Date, dateTo?: Date, passengers?: number, loading?) {
    console.log(pickUp + ', ' + dropOff);
    return this.http.get<AirDetails[]>(environment.base_url +
      `api/AirTaxis/AirDetails/GetAirDetail/${pickUp}&${dropOff}`)
      .subscribe(
        data => {
          loading.load = true;
          console.log(data);
          // this.airDetails = data;
          this.aTotal.splice(0);
          if (data.length > 0) {
            this.airDetails.splice(0);
            data.forEach(
              element => {
                // this.airDetails.push(element);

                if (passengers) {
                  if (element.taxi.numOfSeats > passengers) {
                    this.airDetails.push(element);
                    this.noTaxi = false;
                  } else { this.noTaxi = true; }

                  this.returnJourney ?
                    this.aTotal.push(+element.price * 2) :
                    this.aTotal.push(+element.price);
                }
              }

            );
            console.log(this.airDetails);

            /**Navigation has changed**/
            this.navigate.nav = true;
            this.route.navigate(['/air-detail']);
            if (this.returnJourney) {
              const obj = {
                pickUp: pickUp, dropOff: dropOff,
                dateFrom: dateFrom, returnDate: dateTo, passengers: passengers
              };
              localStorage.setItem('info#4',
                JSON.stringify(obj));
            } else {
              const obj = {
                pickUp: pickUp, dropOff: dropOff,
                dateFrom: dateFrom, returnDate: null, passengers: passengers
              };
              localStorage.setItem('info#4',
                JSON.stringify(obj));
            }
          } else {
            if (loading) {
              loading.errorMessage = 'AirTaxi not yet available';
              loading.error = true;
            }
          }
          if (this.noTaxi) {
            loading.errorMessage = 'No Taxi for amount of Passengers';
            loading.error = true;
          }
          console.log('Passengers ' + passengers + ' Taxi ');
          this.numOfPassengers = passengers;
        },
        error => {
          console.error(error.message);
          try {
            if (error.message.includes('unknown url')) {
              this.service.check.errorMessage = 'Error connecting to server';
            } else { this.service.check.errorMessage = 'Error occured'; }
          } catch (Err) { this.service.check.errorMessage = 'Error occured'; }
          this.service.check.error = true;
          loading.load = false;
        },
        () => {
          loading.load = false;
          console.log('Done.');
        }
      );
  }

  /***Initial Payment Process***/

  PaymentReceive(myRoute: string, obj: any) {
    console.log('In payment!');
    if (this.service.User) {
      console.log(myRoute);
      console.log(obj.Property as Properties);
      switch (myRoute) {
        case ('acc-detail'): {
          this.service.property = obj.Property as Properties;
          console.log('Not undefined = ' + JSON.stringify(this.service.property));
          this.DateFrom = obj.DateFrom;
          this.DateTo = obj.DateTo;
          this.Panel = obj.str;
          console.log(this.Panel);
          console.log(this.panel);
          this.Rooms = +obj.str.split(' ')[0];
          this.Total('accommodation');
          break;
        }

        // tslint:disable-next-line:no-switch-case-fall-through
        case ('flight-detail'): {
          this.service.flight = obj.Detail;
          if (this.service.flight) {
            this.fPrice = obj.Detail.price;
          }
          console.log(this.service.flight);
          console.log('FlightType ' + this.flightType);
          // this.flightType="Economy";
          console.log('Should be ' + this.flightType);
          console.log(this.fPrice);
          this.Total('flight');
          break;
        }

        // tslint:disable-next-line:no-switch-case-fall-through
        case ('car-detail'): {
          this.service.carRental = obj.Detail;
          console.log('carrental = ' + this.service.carRental);
          console.log(this.Total('carRental'));
          break;
        }

        // tslint:disable-next-line:no-switch-case-fall-through
        case ('air-detail'): {
          this.service.airTaxi = obj.Detail;
          console.log('airTaxi = ' + this.service.airTaxi);
          this.Total('airTaxi');
          break;
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

  Total(serviceType?: string, index?: number) {
    // let rooms = this.panel;
    console.log(serviceType);
    switch (serviceType) {
      case ('accommodation'):
        try {
          if (this.service.property && this.Panel) {
            // let number = rooms.split(" ");
            this.total = +this.service.property.accDetail[0].pricePerNight * (this.Nights * (this.Rooms));

            console.log(this.total + ' service ' +
              this.service.property.accDetail[0].pricePerNight + ' Nights ' + this.Nights + ' Panel number: ' +
              this.Rooms + ' Panel text: ' + this.panel + ' panel stringfy: ' + this.panel);
            break;
          }
          console.log('What ?' + this.service.property);
        } catch (err) { console.log('Error occured : ' + err); break; }

      // tslint:disable-next-line:no-switch-case-fall-through
      case ('flight'):
        try {
          if (this.service.FlightDetail.length > 0) {
            console.log('Flight type : ' + this.flightType);
            switch (this.flightType) {
              case ('Economy'): {
                if (index !== null) {
                  this.total = (+this.fPrice + environment.economy) * this.numOfTravellers;
                  console.log(this.total + ' ' + environment.economy + ' ' + this.numOfTravellers);
                  break;
                }
              }

              // tslint:disable-next-line:no-switch-case-fall-through
              case ('Premium Economy'): {
                if (index !== null) {
                  this.total = (+this.fPrice + environment.premium_economy) * this.numOfTravellers;
                  break;
                }
              }

              // tslint:disable-next-line:no-switch-case-fall-through
              case ('Business'): {
                if (index !== null) {
                  this.total = (+this.fPrice + environment.business) * this.numOfTravellers;
                  break;
                }
              }

              // tslint:disable-next-line:no-switch-case-fall-through
              case ('First Class'): {
                if (index !== null) {
                  this.total = (+this.fPrice + environment.first_class) * this.numOfTravellers;
                  break;
                }
              }
            }
          }
        } catch (err) { break; }

      // tslint:disable-next-line:no-switch-case-fall-through
      case ('carRental'):
        {
          try {
            if (this.service.carRental) {
              console.log('Minused values are equal to :' +
                (+this.service.carRental.price * Math.round((this.cDateReturn.valueOf() -
                  this.cDateFrom.valueOf()) / 1000 / 60 / 60 / 24)));
              this.total = +this.service.carRental.price * Math.round((this.cDateReturn.valueOf() -
                this.cDateFrom.valueOf()) / 1000 / 60 / 60 / 24);
              break;
            }
          } catch (err) { break; }
        }

      // tslint:disable-next-line:no-switch-case-fall-through
      case ('airTaxi'):
        {
          console.log(this.service.airTaxi);
          try {
            if (this.returnJourney) {
              this.total = +this.service.airTaxi.price * this.numOfPassengers * 2;
              break;
            } else {
              this.total = +this.service.airTaxi.price * this.numOfPassengers;
              break;
            }
          } catch (err) { break; }
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
          detailId: this.service.property.accDetail[0].detailId,
          bookDate: this.DateFrom,
          roomsBooked: this.Rooms,
          numOfNights: this.nights,
          payStatus: true,
          payType: 'PayPal',
          total: this.Total()
        });

        console.log(JSON.stringify(this.bookingObj));

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
          let names = '';
          let index = 0;
          let surnames = '';
          this.travellersNames.length > 0 ? this.travellersNames.forEach(
            element => {
              surnames += this.travellersSurnames[index];
              if (index++ > 0) {
                names += ',';
                surnames += ',';
                console.log('Concatinationg');
              }
              names += element;
              console.log('Inserting element = ' + element);
            }
          ) : names = null;

          if (names === null) { surnames = null; }
          console.log(names + '   ' + surnames);
          this.bookingObj = new FlBooking({
            userId: this.service.User.userId,
            detailId: this.service.flight.detailId,
            flightType: this.flightType,
            bookDate: this.fDateFrom,
            returnDate: this.fDateTo,
            travellers: this.numOfTravellers,
            travellersNames: names,
            travellersSurnames: surnames,
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
            taxiName: this.service.airTaxi.taxi.name,
            bookDate: this.aDateFrom,
            returnJourney: this.returnJourney ? this.aDateReturn : null,
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
      default: console.error('Nothing Happened!'); return false;
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

  set Panel(panel) {
    console.log('not undefined' + panel);
    this.panel = panel;
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

  get BookingObj() {
    return this.bookingObj;
  }
}
