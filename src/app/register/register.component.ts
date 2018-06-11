import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialogRef } from '@angular/material';
import { UsersService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  _regForm: FormGroup;
  loading: boolean;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  private namePattern =
    '[a-zA-Z]{2,}';
  private emailPattern =
    '[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}';
  private passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
  private phoneNumber =
    '[0]{1}[0-9]{9}';

  constructor(fb: FormBuilder,
    private service: UsersService,
    private dialogRef: MatDialogRef<RegisterComponent>) {
    this._regForm = fb.group(
      {
        'Name': new FormControl('', [Validators.required,
        Validators.pattern(this.namePattern)]),
        'Surname': new FormControl('', [Validators.required,
        Validators.pattern(this.namePattern)]),
        'Email': new FormControl('',
          [Validators.required, Validators.pattern(this.emailPattern)]),
        'Password': new FormControl('',
          [Validators.required,
          Validators.pattern(this.passwordPattern)]),
        'Phone': new FormControl('',
          [Validators.required, Validators.pattern(this.phoneNumber),
          Validators.minLength(10)])
      }
    );
  }

  ngOnInit() {
  }

  submitReg() {
    this.loading = true;
    this.dialogRef.disableClose = true;
    this.service.userRegister({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      phone: this.phone
    }, this.dialogRef);
  }

}
