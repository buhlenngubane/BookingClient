import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-pair-taxi',
  templateUrl: './pair-taxi.component.html',
  styleUrls: ['./pair-taxi.component.css']
})
export class PairTaxiComponent implements OnInit {

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

  ngOnInit() {
  }

}
