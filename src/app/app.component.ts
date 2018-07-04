import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';
import { UsersService } from './service/user.service';
// import { User } from './model/user';
import { RegisterComponent } from './register/register.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { User } from './model/user';
import { routes } from './app.routes';
import { Router } from '@angular/router';


@Component(
  {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  }
)
export class AppComponent {
  title = 'app';

  auth = false;
  admin = false;
  /*error=this.service.error;
  loading:boolean;
  errorState=this.service.errorState;*/
  error = this.service.check;
  Name: string;
  dialogId: string;
  offline: string;
  private dailogConfig = new MatDialogConfig;


  constructor(public dialog: MatDialog,
    private service: UsersService,
    public route: Router
  ) {
    // Checking if user was logged in
    if (!localStorage.getItem('currentUser')) {
    console.log('There is no current user.');
    } else {
      this.error.load = true;
      const me = service.Me.subscribe(data => {

          const user = new User(data);
          console.log(user.name);
          service.User = user;
          console.log(service.User);
          this.auth = true;
          this.Name = user.name;
          if (service.Admin) {
            console.log('true');
          this.admin = true;
          this.route.navigate(['/admin']);
          }

        },
      error => {
        console.log('Hello');
        console.error(error);
        this.error.error = false;
          localStorage.removeItem('currentUser');
          console.warn('Removed Token!!!');
          this.route.navigate(['/home']);
        // }
        this.admin = false;

      },
      () => {
        console.log('Got Token!!!');
        this.error.load = false;
      }).closed;
    }
  }

  openSignInDialog() {
    this.dialog.closeAll();

    this.error.error = false;
    this.error.load = true;
    this.dailogConfig.autoFocus = true;

    this.dialog.open(SignInComponent, this.dailogConfig).afterClosed().subscribe(
      result => {
        // this.service.userLogic('login');
        this.auth = this.service.Authenticated;
        // this.loading=false;
        console.log('Subscribing to AfterClosed()' + this.auth);

        if (this.auth) {
          this.Name = this.service.User.name;
          if (this.service.User.admin) {
            this.admin = true;
            this.route.navigate(['/admin']);
          }

        }

        console.log('Passed authentication!!!!!!!!!!!!!!!');
        this.error.load = false;
      });
  }

  openRegDialog() {
    this.dialog.closeAll();

    this.error.error = false;
    this.error.load = true;
    this.dailogConfig.autoFocus = true;
    this.dialog.open(RegisterComponent, this.dailogConfig).afterClosed().subscribe(
      result => {
        this.auth = this.service.Authenticated;

        if (this.auth) {
          this.Name = this.service.User.name;
        }
        this.error.load = false;
      });
  }

  openAccDet() {
    this.dialog.closeAll();
    this.dailogConfig.autoFocus = false;
    this.dialog.open(AccountDetailsComponent, this.dailogConfig);
  }

  public closeSession() {
    this.service.logOut();

    this.auth = false;
    this.dialog.closeAll();
  }
}
