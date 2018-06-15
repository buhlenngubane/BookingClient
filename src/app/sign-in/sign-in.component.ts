import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, PatternValidator, FormControl } from '@angular/forms';
import { UsersService } from '../service/user.service';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-sign-in.component',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  _loginForm: FormGroup;
  loading = false;

  email: string;
  password: string;
  // user:User;
  // data:any;
  private emailPattern =
    '^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$';
  private passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

  constructor(fb: FormBuilder,
    private service: UsersService,
    private dialogRef: MatDialogRef<SignInComponent>
  ) {

    this._loginForm = fb.group(
      {
        'Email': new FormControl('',
        [Validators.required, Validators.pattern(this.emailPattern)]),
        'Password': new FormControl('',
        [Validators.required, Validators.minLength(8),
          Validators.pattern(this.passwordPattern)])
      }
    );
  }

  ngOnInit() {
  }

  onSignIn() {
    this.loading = true;
    console.log('Request service');
    this.dialogRef.disableClose = true;
    this.service.userLogin(this.email, this.password, this.dialogRef);
      // .subscribe();
    // this.dialogRef.close();
  }

  getError(control: FormControl) {
    try {
      return control.hasError('required') ? 'You must enter a value' :
      control.hasError('minlength') ?
      control.errors.minlength.requiredLength - control.errors.minlength.actualLength + ' Charrecters required' :
      control.hasError('pattern') ?  'Not a valid pattern' :
        '';
    } catch (error) {
      console.log(error);
    }
  }
}
