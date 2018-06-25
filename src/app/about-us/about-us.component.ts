import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from '../service/user.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  data: any;
  rows = 2;
  AboutUsContent = [
  {
    text: 'Legal',
    rows: 2
  },
  {
    text: 'Law Enforcement Guidelines',
    rows: 9
  }
  // ,
  // {
  //   text: 'Contact Us',
  //   rows: 2
  // }
];

path = 'About Booking';
  constructor(private fb: FormBuilder,
    private service: UsersService) {
    // service.Changed = this.obj;
  }
  ngOnInit(): void {
  }

  Change(str: string, row: number) {
    // if (!str.includes('2')) {
      this.path = str;
      this.rows = row;
    // }
  }

}

