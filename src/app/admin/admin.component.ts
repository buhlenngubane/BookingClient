import { Component } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Users } from '../service/common-interface';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  commonLayout = [
    //   {'userId': 0,
    // 'name': 'string',
    // 'surname': 'string',
    // 'email': 'string',
    // 'password': 'string',
    // 'phone': 'string'
    //   }
  ];

  repeat_statement = [{
    Users: {
    serviceType: 'Users',
    data: ['Displays here.']
  },
  Accommodations: {
    serviceType: 'Accommodations',
    data: ['Displays here.']
  },
  Flights: {
    serviceType: 'Flights',
    data: ['Displays here.']
  },
  CarRentals: {
    serviceType: 'CarRentals',
    data: ['Displays here.']
  },
  AirTaxis: {
    serviceType: 'AirTaxis',
    data: ['Displays here.']
  }
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
    if (!service.User) {
      route.navigate(['/home']);
    }
    console.log(this.commonLayout[0]);
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
          this.repeat_statement[service] = {
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
          this.repeat_statement[service] = {
            serviceType: service, data: this.flight
          };
          this.active = service;
          console.log(this.repeat_statement[service].data);
          break;
        }

      case ('CarRentals'):
      {
        this.car = [];
        this.admin.GetAllCarRentals(this.car, this.loading);

        this.repeat_statement[service] = {
          serviceType: service, data: this.car
        };
        this.active = service;
        console.log(this.repeat_statement[service].data);
        break;
      }

      case ('AirTaxis'):
      {
        this.taxi = [];
        this.admin.GetAllAirTaxis(this.taxi, this.loading);

        this.repeat_statement[service] = {
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
  repeat_statement = [{
    Users: {
    serviceType: 'Users',
    data: ['Displays here.']
  },
  Accommodations: {
    serviceType: 'Accommodations',
    data: ['Displays here.']
  },
  Flights: {
    serviceType: 'Flights',
    data: ['Displays here.']
  },
  CarRentals: {
    serviceType: 'CarRentals',
    data: ['Displays here.']
  },
  AirTaxis: {
    serviceType: 'AirTaxis',
    data: ['Displays here.']
  }
}];

constructor(
  private service: UsersService,
  private admin: AdminService,
  // private route: Router
  private searchService: SearchService
) {
  // this.serviceType=service.ServiceType;
  if (!service.User) {
    // route.navigate(['/home']);
    searchService.GoBack('/home');
  }
  // console.log(this.commonLayout[0]);
}
}

