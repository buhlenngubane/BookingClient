import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../service/user.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialogRef } from '@angular/material';
import { User } from '../model/user';
import { changeLayout, CheckAccommodation } from '../service/common-interface';

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
  checked: boolean;
  loading: any;
  accLoading: any;
  accData: any[];

  private emailPattern =
    "^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$";
  private passwordPattern =
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
  private phoneNumber =
    "[0]{1}[0-9]{9}";

  constructor(fb: FormBuilder,
    private service: UsersService,
    private dialogRef: MatDialogRef<AccountDetailsComponent>) {
    this.name = service.User.name;
    this.postChanges = fb.group(
      {
        'Name': new FormControl(''),
        'Surname': new FormControl(''),
        'Password': new FormControl('',
          [Validators.pattern(this.passwordPattern)]),
        'ConfirmPassword': new FormControl('',
          [Validators.pattern(this.password)]),
        'Phone': new FormControl('',
          [Validators.pattern(this.phoneNumber)]),
        'Checked': new FormControl(false)
      }
    );

    this.accLoading = {
      load: true,
      error: false,
      message: "",

    }
    /*this.accData = [
      {
        bookingId: 0,
        userId: 0,
        accId: 0,
        numOfNights: 0,
        bookDate: new Date(),
        payType: "",
        payStatus: false,
        total: 0
      }
    ]*/

    this.loading = { load: false, error: false, errorMessage: "" };
    this.checked = false;
    //dialogRef.updateSize("30","30");
    if (!service.AccData)
      service.AccountDetails()
        .subscribe(
          data => {
            console.log("Is service null "+ service.AccData);
            this.accData = data as CheckAccommodation[];
            service.AccData=this.accData;
            console.log(this.accData);
            console.log(this.accData[0].bookDate);

          },
          error => {
            this.accLoading.message = "Failed to load data.";
            this.accLoading.error = true;
            this.accLoading.load = false;
          },
          () => {
            console.log("Accounts Done");
            this.accLoading.error = false;
            this.accLoading.load = false;
          }
        )
        .closed;
    else
      this.accData = service.AccData;
    console.log(this.accData);
  }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  confirmed() {
    console.log("userUpdate()");
    this.loading = { load: true };
    this.service.userUpdate({
      userId: this.service.User.userId,
      name: this.name ? this.name : this.service.User.name,
      surname: this.surname ? this.surname : this.service.User.surname,
      email: this.service.User.email,
      password: this.password ? this.password : "",
      phone: this.phone ? this.phone : this.service.User.phone
    }, this.loading);

    console.log("userUpdate() called!!");

    this.Submited = true;
    this.step++;
    this.postChanges.reset();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
