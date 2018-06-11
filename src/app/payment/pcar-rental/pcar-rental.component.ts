import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-pcar-rental',
  templateUrl: './pcar-rental.component.html',
  styleUrls: ['./pcar-rental.component.css']
})
export class PcarRentalComponent implements OnInit {

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
      data: this.searchService.Total('carRental')
    }
  ];

  state = this.searchService.success[2];
  constructor(private service: UsersService,
    private searchService: SearchService) {
    }

  ngOnInit() {
  }

}
