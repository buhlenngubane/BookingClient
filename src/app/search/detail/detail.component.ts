import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/user.service';
import { SearchService } from '../../service/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private service:UsersService,
    private searchService:SearchService,
    private route:Router) 
    {
      //console.log("Excuting request")
      //searchService.SearchCompany();
    }

  ngOnInit() {
  }

}
