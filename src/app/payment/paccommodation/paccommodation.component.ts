import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Properties } from '../../model/service-type';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { Success } from '../../service/common-interface';



@Component({
  selector: 'app-paccommodation',
  templateUrl: './paccommodation.component.html',
  styleUrls: ['./paccommodation.component.css']
})
export class PaccommodationComponent {
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



}
