import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';

declare let paypal: any;

@Component({
  selector: 'app-pflight',
  templateUrl: './pflight.component.html',
  styleUrls: ['./pflight.component.css']
})
export class PflightComponent implements OnInit {
  addScript = false;
  // tslint:disable-next-line:no-inferrable-types
  paypalLoad: boolean = true;
  total = Math.round(this.searchService.Total() / 13);

  flight = this.service.flight;
  // load:boolean=false;
  display = [
    {
      name: 'Company Booked with:',
      data: this.flight ? this.flight.c.companyName : ' '
    }, {
      name: 'Number of travellers book:',
      data: this.searchService.numOfTravellers ? this.searchService.numOfTravellers : ' '
    },
    {
      name: 'Flight type to book:',
      data: this.searchService.flightType ? this.searchService.flightType : ' '
    },
    {
      name: 'Book date:',
      data: this.searchService.DateFrom ? this.searchService.DateFrom : ' '
    },
    {
      name: 'Total Price',
      data: this.searchService.Total('flight') ? 'R ' + this.searchService.Total('flight') : ' '
    }
  ];
  state = this.searchService.success[1];


  constructor(private service: UsersService,
  private searchService: SearchService) {
    if (!this.service.flight) {
      searchService.GoBack('/flight');
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

      }// , (error) => {console.log(error); }
    ).catch(err => console.error('Error catched! ' + err));
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
