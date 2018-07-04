import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';

declare let paypal: any;

@Component({
  selector: 'app-pcar-rental',
  templateUrl: './pcar-rental.component.html',
  styleUrls: ['./pcar-rental.component.css']
})
export class PcarRentalComponent implements OnInit {

  addScript = false;
  // tslint:disable-next-line:no-inferrable-types
  paypalLoad: boolean = true;
  total = Math.round(this.searchService.Total() / 13);

  carRental = this.service.carRental;

  display = [
    {
      name: 'Company Booked with:',
      data: this.carRental ? this.carRental.cmp.companyName : ' '
    }, {
      name: 'Car to book:',
      data: this.carRental ? this.carRental.ctype.name : ' '
    },
    {
      name: 'Book date:',
      data: this.carRental ? this.searchService.cDateFrom : ' '
    },
    {
      name: 'Return date:',
      data: this.carRental ? this.searchService.cDateReturn : ' '
    },
    {
      name: 'Total Price',
      data: 'R ' + this.searchService.Total('carRental')
    }
  ];

  state = this.searchService.success[2];
  constructor(private service: UsersService,
    private searchService: SearchService) {
      if (!service.carRental) {
        searchService.GoBack('/car-rental');
      }
      try {
      console.log(this.carRental.ctype.picture);
      } catch (Err) {
        console.error(Err);
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
