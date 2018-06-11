import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-pflight',
  templateUrl: './pflight.component.html',
  styleUrls: ['./pflight.component.css']
})
export class PflightComponent implements OnInit {

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
      data: this.searchService.Total('flight') ? this.searchService.Total('flight') : ' '
    }
  ];
  state = this.searchService.success[1];

  constructor(private service: UsersService,
  private searchService: SearchService) {

  }

  ngOnInit() {
  }

}
