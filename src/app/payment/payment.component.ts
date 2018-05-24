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
export class PaymentComponent implements AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  success: boolean = false;
  amount: number;
  property: Property = this.service.Property?this.service.Property:{propId:1,picture:" ",accId:1,availableRooms:1,propName:" ",pricePerNight:1};
  displayProperty = [
    {
      name: "PropertyName",
      data: this.property.propName ? this.property.propName : " "
    }, {
      name: "Number of rooms to book",
      data: this.searchService.Panel ? this.searchService.Panel : " "
    },
    {
      name: "Number of nights to book",
      data: this.searchService.Nights ? this.searchService.Nights : " "
    },
    {
      name: "Book from",
      data: this.searchService.DateFrom ? this.searchService.DateFrom : " "
    },
    {
      name: "to",
      data: this.searchService.DateTo ? this.searchService.DateTo : " "
    },
    {
      name: "Total Price",
      data: this.searchService.Total ? this.searchService.Total : " "
    }
  ];

  constructor(private service: UsersService,
    private searchService: SearchService,
    private route: Router
  ) {
    if (!service.Property) {
      route.navigate(["/home"]);
      console.log("rerouting<<<");
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
            { amount: { total: this.searchService.Total, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        this.amount = this.searchService.Total;
        this.searchService.Book()
        .subscribe(
          data=>{
            console.log(JSON.stringify(data));
          },
          error=>{
            console.log(error.message);
          },
          ()=>{
            console.log("Done.");
          }
        );
        this.success = true;
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}
