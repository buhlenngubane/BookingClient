import { Component } from '@angular/core';
import { UsersService } from '../service/user.service';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { SearchService } from '../service/search.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Accommodations } from '../model/service-type';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  commonLayout = [
  ];

  repeat_statement = [{
      serviceType: 'Users',
      data: ['Displays here.']
    }, {
      serviceType: 'Accommodations',
      data: ['Displays here.']
    }, {
      serviceType: 'Flights',
      data: ['Displays here.']
    }, {
      serviceType: 'CarRentals',
      data: ['Displays here.']
    }, {
      serviceType: 'AirTaxis',
      data: ['Displays here.']
    }
  ];
  // : User[] = new User({userId: 0, name: "string"})[1];
  active;
  users;
  property;
  flight;
  car;
  taxi;
  loading = { load: false, error: false, errorMessage: '' };
  constructor(
    private service: UsersService,
    private admin: AdminService,
    private route: Router
  ) {
    // this.serviceType=service.ServiceType;
    service.check.error = false;
    if (!service.User) {
      route.navigate(['/home']);
    }
    // console.log(this.commonLayout[0]);
  }

  step = 0;
  serviceType: string;

  GetAll(service: string): void {
    // tslint:disable-next-line:no-unused-expression
    switch (service) {
      case ('Users'):
        {
          this.users = [];
          this.admin.GetAllUsers(this.users, this.loading);
          this.repeat_statement[1] = {
            serviceType: service, data: this.users
          };
          this.active = service;
          break;
        }

      case ('Accommodations'):
        {
          this.property = [];
          this.admin.GetAllAccommodations(this.property, this.loading);
          break;
        }

      case ('Flights'):
        {
          this.flight = [];
          this.admin.GetAllFlights(this.flight, this.loading);
          this.repeat_statement[1] = {
            serviceType: service, data: this.flight
          };
          this.active = service;
          console.log(this.repeat_statement[1].data);
          break;
        }

      case ('CarRentals'):
        {
          this.car = [];
          this.admin.GetAllCarRentals(this.car, this.loading);

          this.repeat_statement[2] = {
            serviceType: service, data: this.car
          };
          this.active = service;
          console.log(this.repeat_statement[2].data);
          break;
        }

      case ('AirTaxis'):
        {
          this.taxi = [];
          this.admin.GetAllAirTaxis(this.taxi, this.loading);

          this.repeat_statement[3] = {
            serviceType: service, data: this.taxi
          };

          break;
        }
    }
    console.log('None');
  }
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminPostComponent {
//   repeat_statement = [{
//     serviceType: 'Users',
//     data: ['Displays here.']
//   }, {
//     serviceType: 'Accommodations',
//     data: ['Displays here.']
//   }, {
//     serviceType: 'Flights',
//     data: ['Displays here.']
//   }, {
//     serviceType: 'CarRentals',
//     data: ['Displays here.']
//   }, {
//     serviceType: 'AirTaxis',
//     data: ['Displays here.']
//   }
// ];

  // user = new User();

  accEdit = false;

  Accomm = {
    accId: 0,
    country: 'string',
    location: 'string',
    picture: 'string',
    property: [
      {
        propId: 0,
        accId: 0,
        propName: 'string',
        picture: 'string',
       accDetail: [
         {
           detailId: 0,
           propId: 0,
           pricePerNight: 0,
           availableRooms: 0,
           dateAvailable: new Date()
         }
       ]
     }
   ]
 };

 Flight = {
  'flightId': 0,
  'locale': 'string',
  'avFlights': 0,
  'destination': [
    {
      'destId': 0,
      'flightId': 0,
      'destination1': 'string',
      'flightDetail': [
        {
          'detailId': 0,
          'destId': 0,
          'cid': 0,
          'departure': new Date(),
          'returnTrip': new Date(),
          'path': 'string',
          'price': 0,
          'c': {
            'cid': 0,
            'companyName': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

CarRental = {
  'crentId': 0,
  'location': 'string',
  'physicalAddress': 'string',
  'numOfSuppliers': 0,
  'ccompany': [
    {
      'cmpId': 0,
      'crentId': 0,
      'companyName': 'string',
      'fuelPolicy': 'string',
      'mileage': 'string',
      'carCount': 0,
      'picture': 'string',
      'car': [
        {
          'carId': 0,
          'cmpId': 0,
          'ctypeId': 0,
          'price': 0,
          'ctype': {
            'ctypeId': 0,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 0,
            'numOfDoors': 0,
            'numOfAirbags': 0,
            'transmission': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

AirTaxi = {
  'pickUpId': 0,
  'pickUp': 'string',
  'numOfDrops': 0,
  'airTaxiDropOff': [
    {
      'dropOffId': 0,
      'pickUpId': 0,
      'dropOff': 'string',
      'taxiCount': 0,
      'airDetail': [
        {
          'airDetailId': 0,
          'dropOffId': 0,
          'taxiId': 0,
          'driverPolicy': 'string',
          'price': 0,
          'taxi': {
            'taxiId': 0,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 0,
            'numOfBaggage': 0,
            'driverPolicy': 'string'
          }
        }
      ]
    }
  ]
};

// strUser = JSON.stringify(this.user, undefined, '\t');
 strAccomm = JSON.stringify(this.Accomm, undefined, '\t');
 strFlight = JSON.stringify(this.Flight, undefined, '\t');
 strCarRental = JSON.stringify(this.CarRental, undefined, '\t');
 strAirTaxi = JSON.stringify(this.AirTaxi, undefined, '\t');

 loop = [
  // {
  //   change: false,
  //   text:   'User',
  //   obj:    this.user,
  //   bind:   this.strUser
  //  },
  {
  change: false,
  text:   'Accommodation',
  obj:    this.Accomm,
  bind:   this.strAccomm
 },
 {
  change: false,
  text:   'Flight',
  obj:    this.Flight,
  bind:   this.strFlight
 }
 ,
 {
  change: false,
  text:   'CarRental',
  obj:    this.CarRental,
  bind:   this.strCarRental
 }
 ,
 {
  change: false,
  text:   'AirTaxi',
  obj:    this.AirTaxi,
  bind:   this.strAirTaxi
 }
];

loading = { load: false, error: false, errorMessage: '' };

  constructor(
    private service: UsersService,
    private admin: AdminService,
    // private route: Router
    private searchService: SearchService
  ) {
    if (!service.User) {
      // route.navigate(['/home']);
      searchService.GoBack('/home');
    }
  }

  PostAll(data) {
    switch (data.text) {
      // case ('User'):
      // {

      //   break;
      // }

      case ('Accommodation'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PostAccomm(data.bind, this.loading);
        console.log(JSON.stringify(data.bind));
        break;
      }

      case ('Flight'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PostFlight(data.bind, this.loading);
        break;
      }

      case ('CarRental'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PostCarRental(data.bind, this.loading);
        break;
      }

      case ('AirTaxi'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PostAirTaxi(data.bind, this.loading);
        break;
      }

      default: console.log('No binding! ' + data.text);
    }
  }
}

@Component({
  selector: 'app-put',
  templateUrl: 'put.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminPutComponent {

  accEdit = false;

  user = new User();

  Accomm = {
    accId: 0,
    country: 'string',
    location: 'string',
    picture: 'string',
    property: [
      {
        propId: 0,
        accId: 0,
        propName: 'string',
        picture: 'string',
       accDetail: [
         {
           detailId: 0,
           propId: 0,
           pricePerNight: 0,
           availableRooms: 0,
           dateAvailable: new Date()
         }
       ]
     }
   ]
 };

 Flight = {
  'flightId': 0,
  'locale': 'string',
  'avFlights': 0,
  'destination': [
    {
      'destId': 0,
      'flightId': 0,
      'destination1': 'string',
      'flightDetail': [
        {
          'detailId': 0,
          'destId': 0,
          'cid': 0,
          'departure': new Date(),
          'returnTrip': new Date(),
          'path': 'string',
          'price': 0,
          'c': {
            'cid': 0,
            'companyName': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

CarRental = {
  'crentId': 0,
  'location': 'string',
  'physicalAddress': 'string',
  'numOfSuppliers': 0,
  'ccompany': [
    {
      'cmpId': 0,
      'crentId': 0,
      'companyName': 'string',
      'fuelPolicy': 'string',
      'mileage': 'string',
      'carCount': 0,
      'picture': 'string',
      'car': [
        {
          'carId': 0,
          'cmpId': 0,
          'ctypeId': 0,
          'price': 0,
          'ctype': {
            'ctypeId': 0,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 0,
            'numOfDoors': 0,
            'numOfAirbags': 0,
            'transmission': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

AirTaxi = {
  'pickUpId': 0,
  'pickUp': 'string',
  'numOfDrops': 0,
  'airTaxiDropOff': [
    {
      'dropOffId': 0,
      'pickUpId': 0,
      'dropOff': 'string',
      'taxiCount': 0,
      'airDetail': [
        {
          'airDetailId': 0,
          'dropOffId': 0,
          'taxiId': 0,
          'driverPolicy': 'string',
          'price': 0,
          'taxi': {
            'taxiId': 0,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 0,
            'numOfBaggage': 0,
            'driverPolicy': 'string'
          }
        }
      ]
    }
  ]
};

  strUser = JSON.stringify(this.user, undefined, '\t');
 strAccomm = JSON.stringify(this.Accomm, undefined, '\t');
 strFlight = JSON.stringify(this.Flight, undefined, '\t');
 strCarRental = JSON.stringify(this.CarRental, undefined, '\t');
 strAirTaxi = JSON.stringify(this.AirTaxi, undefined, '\t');

 loop = [
  {
    change: false,
    text:   'User',
    obj:    this.user,
    bind:   this.strUser
   },
  {
  change: false,
  text:   'Accommodation',
  obj:    this.Accomm,
  bind:   this.strAccomm
 },
 {
  change: false,
  text:   'Flight',
  obj:    this.Flight,
  bind:   this.strFlight
 }
 ,
 {
  change: false,
  text:   'CarRental',
  obj:    this.CarRental,
  bind:   this.strCarRental
 }
 ,
 {
  change: false,
  text:   'AirTaxi',
  obj:    this.AirTaxi,
  bind:   this.strAirTaxi
 }
];

loading = { load: false, error: false, errorMessage: '' };

  constructor(
    private service: UsersService,
    private admin: AdminService,
    // private route: Router
    private searchService: SearchService
  ) {
    if (!service.User) {
      // route.navigate(['/home']);
      searchService.GoBack('/home');
    }
  }

  PutAll(data) {
    switch (data.text) {

      case ('User'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutUser(data.bind, this.loading);
        console.log(JSON.stringify(data.bind));
        break;
      }

      case ('Accommodation'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutAccomm(data.bind, this.loading);
        console.log(JSON.stringify(data.bind));
        break;
      }

      case ('Flight'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutFlight(data.bind, this.loading);
        break;
      }

      case ('CarRental'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutCarRental(data.bind, this.loading);
        break;
      }

      case ('AirTaxi'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutAirTaxi(data.bind, this.loading);
        break;
      }

      default: console.log('No binding! ' + data.text);
    }
  }
}

@Component({
  selector: 'app-delete',
  templateUrl: 'delete.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminDeleteComponent {

  accEdit = false;

 idUser;
 idAccomm;
 idFlight;
 idCarRental;
 idAirTaxi;

 loop = [
  {
  change: false,
  text:   'User',
  bind:   this.idUser
  },
  {
  change: false,
  text:   'Accommodation',
  bind:   this.idAccomm
 },
 {
  change: false,
  text:   'Flight',
  bind:   this.idFlight
 }
 ,
 {
  change: false,
  text:   'CarRental',
  bind:   this.idCarRental
 }
 ,
 {
  change: false,
  text:   'AirTaxi',
  bind:   this.idAirTaxi
 }
];

loading = { load: false, error: false, errorMessage: '' };

  constructor(
    private service: UsersService,
    private admin: AdminService,
    // private route: Router
    private searchService: SearchService
  ) {
    if (!service.User) {
      // route.navigate(['/home']);
      searchService.GoBack('/home');
    }
  }

  DeleteAll(data) {
    switch (data.text) {
      case ('User'):
      {
        this.admin.DeleteUser(data.bind, this.loading);
        break;
      }

      case ('Accommodation'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.DeleteAccomm(data.bind, this.loading);
        console.log(JSON.stringify(data.bind));
        break;
      }

      case ('Flight'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.DeleteFlight(data.bind, this.loading);
        break;
      }

      case ('CarRental'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.DeleteCarRental(data.bind, this.loading);
        break;
      }

      case ('AirTaxi'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.DeleteAirTaxi(data.bind, this.loading);
        break;
      }

      default: console.log('No binding! ' + data.text);
    }
  }
}
