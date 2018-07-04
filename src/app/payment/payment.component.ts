import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UsersService } from '../service/user.service';
import { SearchService } from '../service/search.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {


  // tslint:disable-next-line:no-inferrable-types
  // addScript: boolean = false;
  // // tslint:disable-next-line:no-inferrable-types
  // paypalLoad: boolean = true;
  // amount: number;
  serviceType = this.service.serviceType ? this.service.serviceType : null;
  numOfTravellers = this.searchService.numOfTravellers ? this.searchService.numOfTravellers : 1;
  from = 0;
  to = 2; // this.numOfTravellers;
  firstFormGroup: FormGroup;
  count = [];
  submit = false;
  tf = true;
  names = [];

  constructor(private service: UsersService,
    private searchService: SearchService, private _formBuilder: FormBuilder
  ) {
    console.log(service.User);
    if (service.User) {// {
      console.log('User logged in');
    } else {
      searchService.GoBack('/home');
    }
    if (this.service.flight === null && this.serviceType === 'flight') {
      console.log('We are in flights!!!');
      searchService.GoBack('/flight');
    }
    service.paypalLoad = true;
    searchService.success.forEach(
      element => {
        element.success = false;
      }
    );
    console.log(service.serviceType);
    this.firstFormGroup = this._formBuilder.group({
      0: ['', [Validators.required, Validators.pattern('[a-zA-Z]*[,]{1}[a-zA-Z]+')]]
    });
    if (this.count.length > 0) {
      this.count.splice(0);
      this.names.splice(0);
    }
    for (let index = 1; index < this.numOfTravellers; index++) {
      this.firstFormGroup.addControl (index + '', new FormControl('',
       [Validators.required, Validators.pattern('[a-zA-Z]*[,]{1}[a-zA-Z]+')]));
      this.count.push(index);
      this.names.push({name: ''});
    }
    // this.firstFormGroup.controls;
    // this.firstFormGroup.addControl (1 + '', new FormControl('', Validators.required));
    // }
    // else
      // this.load=true;
      // console.log(service.flight+" "+service.User);
  }

  getError(num: number) {
    try {
      return this.firstFormGroup.controls[num].hasError('required') ? 'You must enter a value' :
      // this.firstFormGroup.controls[num].hasError('minlength') ?
      // this.firstFormGroup.controls[num].errors.minlength.requiredLength -
      // control.errors.minlength.actualLength + ' Charrecters required' :
      this.firstFormGroup.controls[num].hasError('pattern') ?  'Must Contain Comma Seperator Between Letters' :
        '';
    } catch (error) {
      console.log(error);
    }
  }

  Decre(num: number) {
    this.firstFormGroup.controls[num].markAsTouched();
    this.from--;
    this.to--;
    console.log(this.firstFormGroup.controls[num].invalid);
     this.tf = this.firstFormGroup.controls[num].valid;
  }

  Incre(num: number) {
    this.firstFormGroup.controls[num].markAsTouched();
    this.from++;
    this.to++;
     this.tf = this.firstFormGroup.controls[num].valid;
    try {
      console.log(this.firstFormGroup.controls[num].invalid);
    } catch (Err) {
      console.log(Err);
    }
  }

  Names(num: number) {
    this.firstFormGroup.controls[num].markAsTouched();
    if (this.firstFormGroup.valid) {
      console.log('Valid');
    } else {console.log('Invalid'); }
    console.log(this.firstFormGroup.controls[num].valid);
     this.tf = this.firstFormGroup.controls[num].valid;
    console.log(this.tf);
    for (let index = 0; index < this.numOfTravellers - 1; index++) {
      const element = this.numOfTravellers;
      if (this.firstFormGroup.controls[index].invalid) {
        this.tf = false;
        console.log(this.tf + ' formControl is ' + index );
      }
    }
    this.tf ? this.submit = true : this.submit = false;
    if (this.submit) {
      // let index = 0;
      this.searchService.travellersNames.splice(0);
      this.searchService.travellersSurnames.splice(0);
      this.names.forEach(
        element => {
          this.searchService.travellersNames.push(element.name.split(',')[0]);
          this.searchService.travellersSurnames.push(element.name.split(',')[1]);
        }
      );
      console.log('Names = ' + this.searchService.travellersNames);
      console.log('Surnames = ' + this.searchService.travellersSurnames);
    }
  }

}
