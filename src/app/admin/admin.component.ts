import { Component } from '@angular/core';
import { UsersService } from '../service/user.service';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { SearchService } from '../service/search.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Accommodations } from '../model/service-type';

declare let files: any;

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
  id: number;
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
          this.property = [];
          this.flight = [];
          this.car = [];
          this.taxi = [];
          this.admin.GetAllUsers(this.users, this.loading);
          this.repeat_statement[0] = {
            serviceType: service, data: this.users
          };
          this.active = service;
          console.log(this.repeat_statement[0].data);
          break;
        }

      case ('Accommodations'):
        {
          this.property = [];
          this.flight = [];
          this.car = [];
          this.taxi = [];
          this.admin.GetAllAccommodations(this.property, this.id, this.loading);
          this.repeat_statement[1] = {
            serviceType: service, data: this.property
          };
          this.active = service;
          console.log(this.repeat_statement[1].data);
          break;
        }

      case ('Flights'):
        {
          this.property = [];
          this.flight = [];
          this.car = [];
          this.taxi = [];
          this.admin.GetAllFlights(this.flight, this.id, this.loading);
          this.repeat_statement[2] = {
            serviceType: service, data: this.flight
          };
          this.active = service;
          console.log(this.repeat_statement[2].data);
          break;
        }

      case ('CarRentals'):
        {
          this.property = [];
          this.flight = [];
          this.car = [];
          this.taxi = [];
          this.admin.GetAllCarRentals(this.car, this.id, this.loading);

          this.repeat_statement[3] = {
            serviceType: service, data: this.car
          };
          this.active = service;
          console.log(this.repeat_statement[3].data);
          break;
        }

      case ('AirTaxis'):
        {
          this.property = [];
          this.flight = [];
          this.car = [];
          this.taxi = [];
          this.admin.GetAllAirTaxis(this.taxi, this.id, this.loading);

          this.repeat_statement[4] = {
            serviceType: service, data: this.taxi
          };
          this.active = service;
          console.log(this.repeat_statement[4].data);
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

  // user = new User();

  accEdit = false;

  // creating model example for method use

  AccommArr = [ 'country',
   'location',
    'picture',
     'propName',
      'picture',
       'propertyAttr',
       'pricePerNight',
         'availableRooms',
          'roomType',
           'dateAvailableFrom',
            'dateAvailableTo'];

  Accomm = {
    // accId: 0,
    country: 'string',
    location: 'string',
    picture: 'string',
    property: [
      {
        // propId: 0,
        // accId: 0,
        propName: 'string',
        picture: 'string',
       accDetail: [
         {
          //  detailId: 0,
          //  propId: 0,
          'propertyAttr': 'string',
          'pricePerNight': 1,
          'availableRooms': 1,
          'roomType': 'string',
          'dateAvailableFrom': new Date(),
          'dateAvailableTo': new Date()
         }
       ]
     }
   ]
 };

 FlightArr = [
  'locale',
  'avFlights',
  'dest',
  'departure',
  'returnTrip',
  'path',
  'price',
  'companyName',
  'picture'
 ];

 Flight = {
  // 'flightId': 0,
  'locale': 'string',
  'avFlights': 1,
  'destination': [
    {
      // 'destId': 0,
      // 'flightId': 0,
      'dest': 'string',
      'flightDetail': [
        {
          // 'detailId': 0,
          // 'destId': 0,
          // 'cid': 0,
          'departure': new Date(),
          'returnTrip': new Date(),
          'path': 'string',
          'price': 1,
          'c': {
            // 'cid': 0,
            'companyName': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

CarArr = [
   'location',
   'physicalAddress',
   'numOfSuppliers',
   'companyName',
   'fuelPolicy',
   'mileage',
   'carCount',
   'picture',
   'price',
   'name',
   'type',
   'numOfSeats',
   'numOfDoors',
   'numOfAirbags',
   'transmission',
   'picture',
];

CarRental = {
  // 'crentId': 0,
  'location': 'string',
  'physicalAddress': 'string',
  'numOfSuppliers': 1,
  'ccompany': [
    {
      // 'cmpId': 0,
      // 'crentId': 0,
      'companyName': 'string',
      'fuelPolicy': 'string',
      'mileage': 'string',
      'carCount': 1,
      'picture': 'string',
      'car': [
        {
          // 'carId': 0,
          // 'cmpId': 0,
          // 'ctypeId': 0,
          'price': 1,
          'ctype': {
            // 'ctypeId': 0,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 1,
            'numOfDoors': 1,
            'numOfAirbags': 1,
            'transmission': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

AirArr = [
  'pickUp',
  'numOfDrops',
  'dropOff',
  'taxiCount',
  'driverPolicy',
  'price',
  'name',
  'type',
  'numOfSeats',
  'numOfBaggage',
  'driverPolicy'
];

AirTaxi = {
  // 'pickUpId': 0,
  'pickUp': 'string',
  'numOfDrops': 1,
  'airTaxiDropOff': [
    {
      // 'dropOffId': 0,
      // 'pickUpId': 0,
      'dropOff': 'string',
      'taxiCount': 1,
      'airDetail': [
        {
          // 'airDetailId': 0,
          // 'dropOffId': 0,
          // 'taxiId': 0,
          'driverPolicy': 'string',
          'price': 1,
          'taxi': {
            // 'taxiId': 0,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 1,
            'numOfBaggage': 1,
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

 accommodation;
 flight;
 carRental;
 airTaxi;

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
  obj:    this.AccommArr,
  bind:   this.Accomm
 },
 {
  change: false,
  text:   'Flight',
  obj:    this.FlightArr,
  bind:   this.Flight
 },
 {
  change: false,
  text:   'CarRental',
  obj:    this.CarArr,
  bind:   this.CarRental
 },
 {
  change: false,
  text:   'AirTaxi',
  obj:    this.AirArr,
  bind:   this.AirTaxi
 }
];

loading = { load: false, error: false, errorMessage: '' };
files;
  active: any;
  firstFormGroup: FormGroup;

  constructor(
    private service: UsersService,
    private admin: AdminService,
    // private route: Router
    private searchService: SearchService,
    private _formBuilder: FormBuilder
  ) {
    if (!service.User) {
      // route.navigate(['/home']);
      searchService.GoBack('/home');
    }
    this.firstFormGroup = _formBuilder.group({
      'Accommodation0': new FormControl('', Validators.required)
    });
    for (let index = 1; index < this.AccommArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup.addControl('Accommodation' + index.toString(),
       new FormControl('', Validators.required));
    }

    for (let index = 0; index < this.FlightArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup.addControl('Flight' + index.toString(),
       new FormControl('', Validators.required));
    }

    for (let index = 0; index < this.CarArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup.addControl('CarRental' + index.toString(),
       new FormControl('', Validators.required));
    }

    for (let index = 0; index < this.AirArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup.addControl('Accommodation' + index.toString(),
       new FormControl('', Validators.required));
    }
  }

  onFileChange(event) {
    try {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('In file ' + JSON.stringify(event.target.files));
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.files = {
          filename: file.name,
          filetype: file.type,
          base64: reader.result.split(',')[1]
        };
      };
      console.log(this.files);
    }
  } catch (Err) {
    console.log(Err);
  }
  }

  PostAll(data) {
    data.change = false;
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
        this.active = data.text;
        break;
      }

      case ('Flight'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PostFlight(data.bind, this.loading);
        this.active = data.text;
        break;
      }

      case ('CarRental'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PostCarRental(data.bind, this.loading);
        this.active = data.text;
        break;
      }

      case ('AirTaxi'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PostAirTaxi(data.bind, this.loading);
        this.active = data.text;
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

  // creating model example for method use

  Accomm = {
    accId: 1,
    country: 'string',
    location: 'string',
    picture: 'string',
    property: [
      {
        propId: 1,
        accId: 1,
        propName: 'string',
        picture: 'string',
       accDetail: [
         {
          'detailId': 1,
          'propId': 1,
          'propertyAttr': 'string',
          'pricePerNight': 1,
          'availableRooms': 1,
          'roomType': 'string',
          'dateAvailableFrom': new Date(),
          'dateAvailableTo': new Date()
         }
       ]
     }
   ]
 };

 Flight = {
  'flightId': 1,
  'locale': 'string',
  'avFlights': 1,
  'destination': [
    {
      'destId': 1,
      'flightId': 1,
      'destination1': 'string',
      'flightDetail': [
        {
          'detailId': 1,
          'destId': 1,
          'cid': 1,
          'departure': new Date(),
          'returnTrip': new Date(),
          'path': 'string',
          'price': 1,
          'c': {
            'cid': 1,
            'companyName': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

CarRental = {
  'crentId': 1,
  'location': 'string',
  'physicalAddress': 'string',
  'numOfSuppliers': 1,
  'ccompany': [
    {
      'cmpId': 1,
      'crentId': 1,
      'companyName': 'string',
      'fuelPolicy': 'string',
      'mileage': 'string',
      'carCount': 1,
      'picture': 'string',
      'car': [
        {
          'carId': 1,
          'cmpId': 1,
          'ctypeId': 1,
          'price': 1,
          'ctype': {
            'ctypeId': 1,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 1,
            'numOfDoors': 1,
            'numOfAirbags': 1,
            'transmission': 'string',
            'picture': 'string'
          }
        }
      ]
    }
  ]
};

AirTaxi = {
  'pickUpId': 1,
  'pickUp': 'string',
  'numOfDrops': 1,
  'airTaxiDropOff': [
    {
      'dropOffId': 1,
      'pickUpId': 1,
      'dropOff': 'string',
      'taxiCount': 1,
      'airDetail': [
        {
          'airDetailId': 1,
          'dropOffId': 1,
          'taxiId': 1,
          'driverPolicy': 'string',
          'price': 1,
          'taxi': {
            'taxiId': 1,
            'name': 'string',
            'type': 'string',
            'numOfSeats': 1,
            'numOfBaggage': 1,
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
files: any;
  active: any;

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

  Check() {
    console.log(JSON.stringify(this.files));
  }

  onFileChange(event) {
    try {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('In file ' + JSON.stringify(event.target.files));
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.files = {
          filename: file.name,
          filetype: file.type,
          base64: reader.result.split(',')[1]
        };
        // this.form.get('avatar').setValue({
        //   filename: file.name,
        //   filetype: file.type,
        //   value: reader.result.split(',')[1]
        // })
        console.log(this.files);
      };
    }
  } catch (Err) {
    console.log(Err);
  }
  }


  PutAll(data) {
    switch (data.text) {

      // case ('User'):
      // {
      //   console.log(data.text);
      //   console.log(data.bind);
      //   this.admin.PutUser(data.bind, this.loading);
      //   console.log(JSON.stringify(data.bind));
      //   break;
      // }

      case ('Accommodation'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutAccomm(data.bind, this.loading);
        console.log(JSON.stringify(data.bind));
        this.active = data.text;
        break;
      }

      case ('Flight'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutFlight(data.bind, this.loading);
        this.active = data.text;
        break;
      }

      case ('CarRental'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutCarRental(data.bind, this.loading);
        this.active = data.text;
        break;
      }

      case ('AirTaxi'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.PutAirTaxi(data.bind, this.loading);
        this.active = data.text;
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
  active: any;

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
        this.active = data.text;
        break;
      }

      case ('Accommodation'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.DeleteAccomm(data.bind, this.loading);
        console.log(JSON.stringify(data.bind));
        this.active = data.text;
        break;
      }

      case ('Flight'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.DeleteFlight(data.bind, this.loading);
        this.active = data.text;
        break;
      }

      case ('CarRental'):
      {
        console.log(data.text);
        console.log(data.bind);
        this.admin.DeleteCarRental(data.bind, this.loading);
        this.active = data.text;
        break;
      }

      case ('AirTaxi'):
      {
        console.log(data.text);
        console.log(data.bind);
        console.log('Id is ' + this.idAirTaxi);
        this.admin.DeleteAirTaxi(data.bind, this.loading);
        this.active = data.text;
        break;
      }

      default: console.log('No binding! ' + data.text);
    }
  }
}
