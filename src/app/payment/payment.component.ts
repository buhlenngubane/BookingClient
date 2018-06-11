import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Property } from '../service/common-interface';
import { Router } from '@angular/router';
import { SearchService } from '../service/search.service';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {


  // tslint:disable-next-line:no-inferrable-types
  addScript: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  paypalLoad: boolean = true;
  amount: number;
  serviceType = this.service.serviceType;

  constructor(private service: UsersService,
    private searchService: SearchService
  ) {
    // console.log(service.flight+" "+ service.User);
    if (!service.User) {// {
      searchService.GoBack('/home');
    }

    console.log(service.serviceType);

    switch (service.serviceType) {
      case ('accommodation'):
        if (!service.Property) {
          // console.log('In Accommodation');
          searchService.GoBack('/home');
          break;
        } else { break; }

      case ('flight'):
        if (!service.flight) {
          searchService.GoBack('/flight');
          break;
        } else { break; }

      case ('carRental'):
        if (!service.carRental) {
          searchService.GoBack('/carRental');
          break;
        }  else { break; }

      case ('airTaxi'):
        if (!service.airTaxi) {
          searchService.GoBack('/airTaxi');
          break;
        } else { break; }
    }
    // }
    // else
      // this.load=true;
      // console.log(service.flight+" "+service.User);

  }
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ARz50aaTtvo38GVuFbu9P94vO5rDKaY_W01dgBgRuWE6iT1einowz1xooOvzw0WF7gVLkOvDUafazUQ5',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.searchService.Total(), currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment);
        // Do something when payment is successful.
        this.amount = this.searchService.Total();
        this.searchService.Book();

        // this.state.success = true;
      });
    }
  };

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

}

@Component({selector: 'app-layout',
  templateUrl: 'pay-layout.component.html',
  styleUrls: ['./payment.component.css']})

  export class PayLayoutComponent {
    state; // =this.searchService.success[];
    constructor(private service: UsersService, private searchService: SearchService) {
    }

  }
