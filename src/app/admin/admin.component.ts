import { Component
  , ChangeDetectorRef
  , AfterViewChecked } from '@angular/core';
import { UsersService } from '../service/user.service';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { SearchService } from '../service/search.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { isUndefined } from 'util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  private repeat_statement = [{
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
  private active;
  private users;
  private property;
  private flight;
  private car;
  private taxi;
  private loading = { load: false, error: false, errorMessage: '' };
  private id: number;

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
export class AdminPostComponent implements AfterViewChecked {

  // user = new User();

  private accEdit = false;

  // creating model example for method use

  private AccommArr = ['country',
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

  private Accomm = {
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

  private FlightArr = [
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

  private Flight = {
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

  private CarArr = [
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

  private CarRental = {
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

  private AirArr = [
    'pickUp',
    'numOfDrops',
    'dropOff',
    'taxiCount',
    'driverPolicy',
    'price',
    'name',
    'type',
    'numOfSeats',
    'numOfBaggage'
  ];

  private AirTaxi = {
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
              'numOfBaggage': 1
            }
          }
        ]
      }
    ]
  };

  // strUser = JSON.stringify(this.user, undefined, '\t');
  private strAccomm = JSON.stringify(this.Accomm, undefined, '\t');
  private strFlight = JSON.stringify(this.Flight, undefined, '\t');
  private strCarRental = JSON.stringify(this.CarRental, undefined, '\t');
  private strAirTaxi = JSON.stringify(this.AirTaxi, undefined, '\t');

  private accommodation;
  private flight;
  private carRental;
  private airTaxi;

  loop = [
    {
      change: false,
      text: 'Accommodation',
      obj: this.AccommArr,
      arr1: 'property',
      arr2: 'accDetail',
      arr3: 'null',
      bind: this.Accomm
    },
    {
      change: false,
      text: 'Flight',
      obj: this.FlightArr,
      arr1: 'destination',
      arr2: 'flightDetail',
      arr3: 'c',
      bind: this.Flight
    },
    {
      change: false,
      text: 'CarRental',
      obj: this.CarArr,
      arr1: 'ccompany',
      arr2: 'car',
      arr3: 'ctype',
      bind: this.CarRental
    },
    {
      change: false,
      text: 'AirTaxi',
      obj: this.AirArr,
      arr1: 'airTaxiDropOff',
      arr2: 'airDetail',
      arr3: 'taxi',
      bind: this.AirTaxi
    }
  ];

  private loading = { load: false, error: false, errorMessage: '' };
  private files;
  private active: any;
  private firstFormGroup: FormGroup[] = [];
  private firstFormGroup0: FormGroup;
  private firstFormGroup1: FormGroup;
  private firstFormGroup2: FormGroup;
  private firstFormGroup3: FormGroup;
  private accommPicture = 2;
  private flightPicture = 1;
  private carRentalPicture = 2;

  constructor(
    private service: UsersService,
    private admin: AdminService,
    // private route: Router
    private searchService: SearchService,
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    if (!service.User) {
      // route.navigate(['/home']);
      searchService.GoBack('/home');
    }
    this.firstFormGroup.push(
      this.firstFormGroup0 = _formBuilder.group({
        'Accommodation0': new FormControl('')
      }));
    this['0'] = _formBuilder.group({
      'Accommodation0': new FormControl('')
    });

    this.firstFormGroup.push(
      this.firstFormGroup1 = _formBuilder.group({
        'Flight0': new FormControl('')
      }));

    this.firstFormGroup.push(
      this.firstFormGroup2 = _formBuilder.group({
        'CarRental0': new FormControl('')
      }));

    this.firstFormGroup.push(
      this.firstFormGroup3 = _formBuilder.group({
        'AirTaxi0': new FormControl('')
      }));

    for (let index = 1; index < this.AccommArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup0.addControl('Accommodation' + index.toString(),
        new FormControl(''));
    }
    for (let index = 1; index < this.AccommArr.length; index++) {
      // const element = array[index];
      this['0'].addControl('Accommodation' + index.toString(),
        new FormControl(''));
    }

    for (let index = 1; index < this.FlightArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup1.addControl('Flight' + index.toString(),
        new FormControl(''));
    }

    for (let index = 1; index < this.CarArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup2.addControl('CarRental' + index.toString(),
        new FormControl(''));
    }

    for (let index = 1; index < this.AirArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup3.addControl('AirTaxi' + index.toString(),
        new FormControl(''));
    }
  }

  ngAfterViewChecked() {
    // your code to update the model
    this.cdr.detectChanges();
 }

 ToString(data, section, arr1?, arr2?, arr3?) {
  try {
    if (arr1 === undefined) {
      // if (section === 'dateAvailableTo') {console.log('arr1 == null'); }
      if (!isUndefined(data.bind[section])) {
      return true;
      }
    } else
    if (arr1 && arr2 === undefined) {
      // if (section === 'dateAvailableTo') {console.log('arr1'); }
    if (!isUndefined(data.bind[arr1][0][section])) {
      return true;
    }
  } else

  if (arr3 === undefined) {

    if (!isUndefined(data.bind[arr1][0][arr2][0][section])) {
      return true;
    }
  } else {
    // if (section === 'dateAvailableTo') {console.log('arr3'); }
    if (!isUndefined(data.bind[arr1][0][arr2][0][arr3][section])) {
      return true;
    }
  }
    return false;
  } catch (Err) {return false; }
}

CheckIfArr(data , section, index, arr1?, arr2?, arr3?) {
  const i = this.Flight['destination'][0]['flightDetail'] ;
  const str = 'sd';
  const n = 1;
  // let str = 'sddf';
  // str.endsWith('id');
  if (section === 'picture') {
    // console.log(section + ' ' + index + ' ' + arr1 + ' ' + arr2);
    if (arr1 === undefined) {
      return true;
    }
    if (arr1 && arr2 === undefined
      // arr2 === null && arr3 === null
    ) {
      if (data.bind[arr1][0][data.obj[index - 1]]) {
        return true ;
      }
      // return true;
    }
    if (arr3 === null) {
      if (data.bind[arr1][0][arr2][data.obj[index - 1]]) { return true; }
    }
    if (arr3 != null) {
      if (data.bind[arr1][0][arr2][0][arr3][data.obj[index - 1]]) {
        // this.CarRental['ccompany'][0]['car'][0]['ctype']['numOfSeats'];
      return true;
    }
    // return true;
  }
  // console.log(index);
    return false;
  }

  return true;
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

  PostAll(data, Form: FormGroup) {
    data.change = false;
    this.files = null;
    switch (data.text) {

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
export class AdminPutComponent implements AfterViewChecked {

  private accEdit = false;

  // creating model example for method use

  private AccommArr = [
    'accId',
    'country',
    'location',
    'picture',
    'propId',
    'accId',
    'propName',
    'picture',
    'detailId',
    'propId',
    'propertyAttr',
    'pricePerNight',
    'availableRooms',
    'roomType',
    'dateAvailableFrom',
    'dateAvailableTo'];

  private Accomm = {
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

  private FlightArr = [
    'flightId',
    'locale',
    'avFlights',
    'destId',
    'flightId',
    'dest',
    'detailId',
    'destId',
    'cid',
    'departure',
    'returnTrip',
    'path',
    'price',
    'cid',
    'companyName',
    'picture'
  ];

  private Flight = {
    'flightId': 1,
    'locale': 'string',
    'avFlights': 1,
    'destination': [
      {
        'destId': 1,
        'flightId': 1,
        'dest': 'string',
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

  private CarArr = [
    'crentId',
    'location',
    'physicalAddress',
    'numOfSuppliers',
    'cmpId',
    'crentId',
    'companyName',
    'fuelPolicy',
    'mileage',
    'carCount',
    'picture',
    'carId',
    'cmpId',
    'ctypeId',
    'price',
    'ctypeId',
    'name',
    'type',
    'numOfSeats',
    'numOfDoors',
    'numOfAirbags',
    'transmission',
    'picture',
  ];

  private CarRental = {
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

  private AirArr = [
    'pickUpId',
    'pickUp',
    'numOfDrops',
    'dropOffId',
    'pickUpId',
    'dropOff',
    'taxiCount',
    'airDetailId',
    'dropOffId',
    'driverPolicy',
    'price',
    'taxiId',
    'name',
    'type',
    'numOfSeats',
    'numOfBaggage'
  ];

  private AirTaxi = {
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
  private strAccomm = JSON.stringify(this.Accomm, undefined, '\t');
  private strFlight = JSON.stringify(this.Flight, undefined, '\t');
  private strCarRental = JSON.stringify(this.CarRental, undefined, '\t');
  private strAirTaxi = JSON.stringify(this.AirTaxi, undefined, '\t');

  private loop = [
    {
      change: false,
      text: 'Accommodation',
      obj: this.AccommArr,
      arr1: 'property',
      arr2: 'accDetail',
      arr3: 'null',
      bind: this.Accomm
    },
    {
      change: false,
      text: 'Flight',
      obj: this.FlightArr,
      arr1: 'destination',
      arr2: 'flightDetail',
      arr3: 'c',
      bind: this.Flight
    },
    {
      change: false,
      text: 'CarRental',
      obj: this.CarArr,
      arr1: 'ccompany',
      arr2: 'car',
      arr3: 'ctype',
      bind: this.CarRental
    },
    {
      change: false,
      text: 'AirTaxi',
      obj: this.AirArr,
      arr1: 'airTaxiDropOff',
      arr2: 'airDetail',
      arr3: 'taxi',
      bind: this.AirTaxi
    }
  ];

  private loading = { load: false, error: false, errorMessage: '' };
  private files;
  private active: any;
  private firstFormGroup: FormGroup[] = [];
  private firstFormGroup0: FormGroup;
  private firstFormGroup1: FormGroup;
  private firstFormGroup2: FormGroup;
  private firstFormGroup3: FormGroup;

  constructor(
    private service: UsersService,
    private admin: AdminService,
    // private route: Router
    private searchService: SearchService,
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    if (!service.User) {
      // route.navigate(['/home']);
      searchService.GoBack('/home');
    }
    this.files = null;

    this.firstFormGroup.push(
      this.firstFormGroup0 = _formBuilder.group({
        'Accommodation0': new FormControl('')
      }));
    this['0'] = _formBuilder.group({
      'Accommodation0': new FormControl('')
    });

    this.firstFormGroup.push(
      this.firstFormGroup1 = _formBuilder.group({
        'Flight0': new FormControl('')
      }));

    this.firstFormGroup.push(
      this.firstFormGroup2 = _formBuilder.group({
        'CarRental0': new FormControl('')
      }));

    this.firstFormGroup.push(
      this.firstFormGroup3 = _formBuilder.group({
        'AirTaxi0': new FormControl('')
      }));

    for (let index = 1; index < this.AccommArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup0.addControl('Accommodation' + index.toString(),
        new FormControl(''));
    }
    for (let index = 1; index < this.AccommArr.length; index++) {
      // const element = array[index];
      this['0'].addControl('Accommodation' + index.toString(),
        new FormControl(''));
    }

    for (let index = 1; index < this.FlightArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup1.addControl('Flight' + index.toString(),
        new FormControl(''));
    }

    for (let index = 1; index < this.CarArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup2.addControl('CarRental' + index.toString(),
        new FormControl(''));
    }

    for (let index = 1; index < this.AirArr.length; index++) {
      // const element = array[index];
      this.firstFormGroup3.addControl('AirTaxi' + index.toString(),
        new FormControl(''));
    }
  }

  ngAfterViewChecked() {
    // your code to update the model
    this.cdr.detectChanges();
 }

 FileNull() {
  // this.files = null;
  console.log('Do Null');
 }

  DeleteProperty(data, section, arr1?, arr2?, arr3?) {
    console.log(JSON.stringify(data.bind));
    console.log(section + ' has ' + arr1);
    this.files = null;
    if (arr1 === undefined) {
      delete data.bind[section];
    } else

    if (arr1 && arr2 === undefined
      // arr2 === null && arr3 === null
    ) {
      delete data.bind[arr1][0][section];
      console.log('Hello');
    } else

    if (arr3 === undefined) {
      delete data.bind[arr1][0][arr2][0][section];
      console.log('arr3 == undefined');
    } else {
      delete data.bind[arr1][0][arr2][0][arr3][section];
    }
    console.log(JSON.stringify(data.bind));
  }

  ToString(data, section, arr1?, arr2?, arr3?) {
    try {
      if (arr1 === undefined) {
        // if (section === 'dateAvailableTo') {console.log('arr1 == null'); }
        if (!isUndefined(data.bind[section])) {
        return true;
        }
      } else
      if (arr1 && arr2 === undefined) {
        // if (section === 'dateAvailableTo') {console.log('arr1'); }
      if (!isUndefined(data.bind[arr1][0][section])) {
        return true;
      }
    } else

    if (arr3 === undefined) {

      if (!isUndefined(data.bind[arr1][0][arr2][0][section])) {
        return true;
      }
    } else {
      // if (section === 'dateAvailableTo') {console.log('arr3'); }
      if (!isUndefined(data.bind[arr1][0][arr2][0][arr3][section])) {
        return true;
      }
    }
      return false;
    } catch (Err) {return false; }
  }

  CheckIfArr(data , section, index, arr1?, arr2?, arr3?) {
    const i = this.Flight['destination'][0]['flightDetail'] ;
    const str = 'sd';
    const n = 1;
    // let str = 'sddf';
    // str.endsWith('id');
    if (section === 'picture') {
      // console.log(section + ' ' + index + ' ' + arr1 + ' ' + arr2);
      if (arr1 === undefined) {
        return true;
      }
      if (arr1 && arr2 === undefined
        // arr2 === null && arr3 === null
      ) {
        if (data.bind[arr1][0][data.obj[index - 1]]) {
          return true ;
        }
        // return true;
      }
      if (arr3 === null) {
        if (data.bind[arr1][0][arr2][data.obj[index - 1]]) { return true; }
      }
      if (arr3 != null) {
        if (data.bind[arr1][0][arr2][0][arr3][data.obj[index - 1]]) {
          // this.CarRental['ccompany'][0]['car'][0]['ctype']['numOfSeats'];
        return true;
      }
      // return true;
    }
    // console.log(index);
      return false;
    }

    return true;
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
    this.files = null;
    switch (data.text) {

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

  private idUser;
  private idAccomm;
  private idFlight;
  private idCarRental;
  private idAirTaxi;

  private loop = [
    {
      change: false,
      text: 'User',
      bind: this.idUser
    },
    {
      change: false,
      text: 'Accommodation',
      bind: this.idAccomm
    },
    {
      change: false,
      text: 'Flight',
      bind: this.idFlight
    }
    ,
    {
      change: false,
      text: 'CarRental',
      bind: this.idCarRental
    }
    ,
    {
      change: false,
      text: 'AirTaxi',
      bind: this.idAirTaxi
    }
  ];

  private loading = { load: false, error: false, errorMessage: '' };
  private active: any;

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
