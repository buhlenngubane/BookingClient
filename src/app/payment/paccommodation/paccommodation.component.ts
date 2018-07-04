import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Properties } from '../../model/service-type';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { Success } from '../../service/common-interface';

declare let paypal: any;

@Component({
  selector: 'app-paccommodation',
  templateUrl: './paccommodation.component.html',
  styleUrls: ['./paccommodation.component.css']
})
export class PaccommodationComponent {

  addScript = false;
  // tslint:disable-next-line:no-inferrable-types
  paypalLoad: boolean = true;
  total = Math.round(this.searchService.Total() / 13);
  // state=this.searchService.success[0];
  property: Properties = this.service.Property ? this.service.Property : new Properties();
  display = [
    {
      name: 'PropertyName',
      data: this.property.propName ? this.property.propName : ' '
    }, {
      name: 'Number of rooms to book',
      data: this.searchService.Panel ? this.searchService.Panel : ' '
    },
    {
      name: 'Number of nights to book',
      data: this.searchService.Nights ? this.searchService.Nights : ' '
    },
    {
      name: 'Book from',
      data: this.searchService.DateFrom ? this.searchService.DateFrom : ' '
    },
    {
      name: 'to',
      data: this.searchService.DateTo ? this.searchService.DateTo : ' '
    },
    {
      name: 'Total Price',
      data: this.searchService.Total() ? 'R ' + this.searchService.Total() : ' '
    }
  ];
  state = this.searchService.success[0];

  constructor(
    private service: UsersService,
    private searchService: SearchService
  ) {
      if (service.Property) {
        this.property = service.Property;
      }
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
            { amount: { total: this.total, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment);
        // Do something when payment is successful.
        // this.amount = this.searchService.Total();
        this.searchService.Book();

      });
    }
  };

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.service.paypalLoad = false;
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
