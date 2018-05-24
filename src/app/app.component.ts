import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material'
import { SignInComponent } from './sign-in/sign-in.component';
import { UsersService } from './service/user.service';
//import { User } from './model/user';
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

  auth: boolean=false;
  admin:boolean=false;
  error=this.service.error;
  loading:boolean;
  errorState=this.service.errorState;
  Name: string;
  dialogId: string;
  offline:string;

  constructor(public dialog: MatDialog,
    private service: UsersService,
    public route:Router
  ) 
  {
    //localStorage.clear();
    if(!localStorage.getItem("currentUser"))
    console.log("There is no current user.");
    else
    {
      this.loading=true;
      let me=service.Me.subscribe(data=>
        {
          
          let user = new User().deserialize(data);
          console.log(user.name);
          service.User=user;
          //this.user.name=data.toString();
          console.log(service.User);
          this.auth=true;
          this.Name=user.name;
          if(service.Admin){
            console.log("true");
          this.admin=true;
          //this.route=new Router();
          this.route.navigate(["/admin"]);
          }
          
          //this.Authenticated=true;
        }, 
      error=>
      {
        console.log("Hello");
        console.error(error.message);
        this.loading=false;
        this.offline=error.message;
        /*this.errorState="Server Error.";
        this.error=true;*/
        if(this.offline.search("Unauthorized"))
        {
          localStorage.removeItem("__paypal_storage__");
          localStorage.removeItem("currentUser");
          console.warn("Removed Token!!!");
          //this.route.navigateByUrl("/home");
          this.route.navigate(["/home"]);
        }
        this.admin=false;
        
      }, 
      ()=>
      {
        console.log("Got Token!!!");
        this.loading=false;
      }).closed;
      
    }
  }

  openSignInDialog() 
  {
    this.dialog.closeAll();

    this.error = false;
    this.loading=true;
    this.dialog.open(SignInComponent).afterClosed().subscribe(
      result => {
        this.service.userLogic("login");
        this.auth=this.service.Authenticated;
        //this.loading=false;
        console.log("Subscribing to AfterClosed()" + this.auth)

        if(this.auth){
          this.Name=this.service.User.name;
          if(this.service.Admin){
            console.log("U r admin true");
          this.admin=true;
          //this.route=new Router();
          this.route.navigate(["/admin"]);
          }
        }

        console.log("Passed authentication!!!!!!!!!!!!!!!")

        this.error=this.service.error;
        this.errorState=this.service.errorState;
        this.loading=false;
      });
  }

  openRegDialog() 
  {
    this.dialog.closeAll();

    this.error=false;
    this.loading=true;
    this.dialog.open(RegisterComponent).afterClosed().subscribe(
      result =>{
        this.service.userLogic("register");
        this.auth=this.service.Authenticated;

        if(this.auth)
          this.Name=this.service.User.name;

        this.error=this.service.error;
        this.errorState=this.service.errorState;
        this.loading=false
      });
  }

  openAccDet() 
  {
    this.dialog.closeAll();

    this.dialog.open(AccountDetailsComponent);
  }
  
  Error(error:boolean, message:string)
  {
    this.errorState=message;
    this.error=error;
  }

  public closeSession() 
  {
    this.service.logOut();
    localStorage.removeItem("currentUser");
    this.auth = false;
    this.dialog.closeAll();
  }
}
