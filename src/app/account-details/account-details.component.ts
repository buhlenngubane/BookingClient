import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../service/user.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { User } from '../model/user';
import { AccBooking, CarBooking, FlBooking, AirBooking } from '../model/service-type';
// import { Loading, Booking } from '../model/service-type';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  step: number;
  Submited: boolean;
  postChanges: FormGroup;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  user: User;
  focus: boolean[] = [];
  loading: any;
  msLoading: any;
  accData: AccBooking[] = [];
  flightData: FlBooking[] = [];
  carRentalData: CarBooking[] = [];
  airTaxiData: AirBooking[] = [];

  private emailPattern =
    '^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$';
  private passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
  private phoneNumber =
    '[0]{1}[0-9]{9}';

  constructor(fb: FormBuilder,
    private service: UsersService,
    private dialogRef: MatDialogRef<AccountDetailsComponent>) {
      service.check.error = false;
    this.name = service.User.name;
    this.postChanges = fb.group(
      {
        'Name': new FormControl(''),
        'Surname': new FormControl(''),
        'Password': new FormControl('',
          [Validators.pattern(this.passwordPattern)]),
        'ConfirmPassword': new FormControl('',
          [ Validators.pattern('123')]),
        'Phone': new FormControl('',
          [Validators.pattern(this.phoneNumber)]),
        'Checked': new FormControl(false)
      }
    );

    this.msLoading = {
      load: false,
      error: false,
      message: '',

    };

    this.loading = { load: true, error: false, errorMessage: '' };
    // this.checked = false;
    // dialogRef.updateSize("30","30");
    if (service.AccData.length === 0) {
      this.focus[0] = true;
          this.focus[1] = false;
          this.focus[2] = false;
          this.focus[3] = false;
      this.service.AccountDetails(this.accData, this.loading, 'accommodation');
      console.log(this.accData);
    } else {
      this.loading = {load: false, error: false, errorMessage: ''};
      this.accData = service.AccData;
      console.log('Else' + service.AccData);
      this.loading.load = false;
    }
    console.log(this.accData);
  }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  getError(control: FormControl, str?: string) {
    try {
      if (str === 'Pass') {
        if (this.password !== '') {
          console.log('Validate');
        } else {
          console.log('Don\'t validate');
        }
      }
      return control.hasError('required') ? 'You must enter a value' :
      control.hasError('minlength') ?
      control.errors.minlength.requiredLength - control.errors.minlength.actualLength + ' Charrecters required' :
      control.hasError('pattern') ? 'Not a valid pattern' :
      str === 'ConfirmPassword' ?
       //  'Not a valid pattern' :
       // control.hasError('pattern') ?
       'Passwords don\'t match' : console.log('Should validate!!');
        // '';
    } catch (error) {
      console.log(error);
    }
  }

  confirmed() {
    console.log('userUpdate()');
    this.msLoading = { load: true };
    this.service.userUpdate({
      userId: this.service.User.userId,
      name: this.name ? this.name : this.service.User.name,
      surname: this.surname ? this.surname : this.service.User.surname,
      email: this.service.User.email,
      password: this.password ? this.password : this.service.User.password,
      phone: this.phone ? this.phone : this.service.User.phone,
      admin:  false
    }, this.msLoading);

    console.log('userUpdate() called!!');

    this.Submited = true;
    this.step++;
    this.postChanges.reset();
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    switch (tabChangeEvent.tab.textLabel) {
      case ('Accommodation'):
        if (this.service.AccData.length === 0) {
          // tslint:disable-next-line:no-unused-expression
          this.loading.error = false;
          this.loading.errorMessage = '';
          this.loading.load = true;
          this.service.AccountDetails(this.accData, this.loading , 'accommodation')
          ;
          this.focus[0] = true;
          this.focus[1] = false;
          this.focus[2] = false;
          this.focus[3] = false;

          console.log(tabChangeEvent.tab.textLabel);
          break;
        } else {
          console.log(this.service.AccData);
          this.focus[0] = true;
          this.focus[1] = false;
          this.focus[2] = false;
          this.focus[3] = false;
          this.accData = this.service.AccData;
          this.loading = {load: false, error: false, errorMessage: ''};
          break; }

      case ('Flight'):
        if (this.service.flightData.length === 0) {
           // tslint:disable-next-line:no-unused-expression
           this.loading.error = false;
          this.loading.errorMessage = '';
          this.loading.load = true;
           this.service.AccountDetails(this.flightData, this.loading, 'flight');
           this.focus[0] = false;
          this.focus[1] = true;
          this.focus[2] = false;
          this.focus[3] = false;
          console.log(tabChangeEvent.tab.textLabel);
           break;
          } else {
            this.focus[0] = false;
          this.focus[1] = true;
          this.focus[2] = false;
          this.focus[3] = false;
            this.flightData = this.service.flightData;
            this.loading = {load: false, error: false, errorMessage: ''};
            console.log(tabChangeEvent.tab.textLabel);
          break;
        }

      case ('Car Rental'):
        if (this.service.carRentalData.length === 0) {
          // tslint:disable-next-line:no-unused-expression
          this.loading.error = false;
          this.loading.errorMessage = '';
          this.loading.load = true;
          this.service.AccountDetails(this.carRentalData, this.loading, 'carRental');
          this.focus[0] = false;
          this.focus[1] = false;
          this.focus[2] = true;
          this.focus[3] = false;
          console.log(tabChangeEvent.tab.textLabel);
          break;
        } else {
          this.focus[0] = false;
          this.focus[1] = false;
          this.focus[2] = true;
          this.focus[3] = false;
          this.carRentalData = this.service.carRentalData;
          this.loading = {load: false, error: false, errorMessage: ''};
          console.log(tabChangeEvent.tab.textLabel);
          break;
        }

      case ('Air Taxi'):
        if (this.service.airTaxiData.length === 0) {
          // tslint:disable-next-line:no-unused-expression
          this.loading.error = false;
          this.loading.errorMessage = '';
          this.loading.load = true;
          this.service.AccountDetails(this.airTaxiData, this.loading, 'airTaxi');
          this.focus[0] = false;
          this.focus[1] = false;
          this.focus[2] = false;
          this.focus[3] = true;
          console.log(tabChangeEvent.tab.textLabel);
          break;
        } else {
          this.focus[0] = false;
          this.focus[1] = false;
          this.focus[2] = false;
          this.focus[3] = true;
          this.airTaxiData = this.service.airTaxiData;
          this.loading = {load: false, error: false, errorMessage: ''};
          console.log(tabChangeEvent.tab.textLabel); break; }

      default :
      console.log(tabChangeEvent.tab.textLabel);
    }
  }
}
