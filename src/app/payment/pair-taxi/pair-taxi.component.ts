import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';

declare let paypal: any;

@Component({
  selector: 'app-pair-taxi',
  templateUrl: './pair-taxi.component.html',
  styleUrls: ['./pair-taxi.component.css']
})
export class PairTaxiComponent implements OnInit {

  addScript = false;
  // tslint:disable-next-line:no-inferrable-types
  paypalLoad: boolean = true;
  total = Math.round(this.searchService.Total() / 13);

  state = this.searchService.success[3];
  airTaxi = this.service.airTaxi;
  display = [
    {
      name: 'Taxi to book:',
      data: this.airTaxi ? this.airTaxi.taxi.name : ' '
    }, {
      name: 'Number of passengers to book:',
      data: this.airTaxi ? this.searchService.numOfPassengers : ' '
    },
    {
      name: 'Book date:',
      data: this.airTaxi ? this.searchService.aDateFrom : ' '
    },
    {
      name: 'Return date:',
      data: this.airTaxi ? this.searchService.aDateReturn : ' '
    },
    {
      name: 'Total Price',
      data: 'R ' + this.searchService.Total('airTaxi')
    }
  ];
  returnJourney = this.searchService.returnJourney ? this.searchService.returnJourney : this.searchService.returnJourney;
  constructor(private service: UsersService,
    private searchService: SearchService) {
      if (!service.airTaxi) {
        searchService.GoBack('/air-taxi');
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

  ngOnInit() {
  }

  // tslint:disable-next-line:member-ordering


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
