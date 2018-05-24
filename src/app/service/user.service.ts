import { Injectable } from '@angular/core';
import { User } from '../model/user'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MatDialogRef } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RegisterComponent } from '../register/register.component';
import { changeLayout, Property, CheckAccommodation, Users, Flight } from './common-interface';
import {Accommodations} from '../model/service-type';

@Injectable()
export class UsersService {
  private flight: Flight[];
  private serviceType: any;
  private user: User;
  private password:string;
  private admin:boolean=false;
  private myToken: Token;
  private body: object;
  private authenticated: boolean;
  private BASE_URL = environment.base_url;
  private data: string;
  private getToken: string;
  private payment:number;
  private accData:Accommodations[];
  private property:Property;
  year = new Date().getFullYear();
  month = (new Date().getMonth());
  day = new Date().getDate();
  errorState: string="";
  error: boolean=false;
  initailized:boolean;
  check:changeLayout;

  constructor(
    private http: HttpClient
  ) {
    //this.user=new User();
    this.error = false;
    this.admin=false;
    this.GetToken="";
    //this.check=[] as changeLayout;

    /******ServiceLogic*******/

    if (this.month == 12 && this.day == 31) {
      this.year = new Date().getFullYear() + 1;
      console.log(this.day);
    }
    else {
      //this.year = new Date().getFullYear();
      console.log(this.day + " year " + this.year);
    }

    if (this.month == (1 || 3 || 4 || 5 || 7 || 8 || 10 || 12) && new Date().getDate() == 31) 
    {
      if (this.month == 12) {
        this.month = 1;
        this.day = 2;
      }
      else {
        this.month++;
        this.day = 2
      }
    }
    else if (this.month == 2) {
      if (new Date().getFullYear() % 4 == 0 && this.day == 29) {
        this.month++;
        this.day = 2;
      }
      else if (this.day == 28) {
        this.month++;
        this.day = 2;
      }
      else
        this.day += 2;
    }
    else if (this.day == 30) {
      this.month++;
      this.day = 2;
    }
    else
      this.day += 2;

  }

  userRegister(customer: object, regRef: MatDialogRef<RegisterComponent>) :boolean
  {
    //this.body = customer;
    this.User = new User().deserialize(customer);
    console.log(this.user);

    return this.http.post<User>(this.BASE_URL + "/Users/Register",
      this.User)//, this.httpOptions)
      .map((response) => {
        console.log(response);
        //let cred = customer as Credetials;
        //console.log("Email = " + cred.email + cred.password);
        this.password=this.user.password;
        this.user.password="";
        this.SetToken(this.user.email, this.password)
          .subscribe(
            (data: any) => {},
            (error) => {
              console.error(error + " for token!!!");
              this.body = error;
              regRef.disableClose=false;
            }, () => { console.log("Done auth");
            regRef.disableClose=false;
             if (regRef.componentInstance) regRef.close(); }
            /*.pipe(
              catchError(this.handleError)*/

          );
      })
      .subscribe((data: any) => { }, 
      (error) => {
        console.error(error + " for signIn!!!");
        console.error(error);
        this.data = error.error;

        if (this.data == "Email exists")
          this.data;
        else
          this.data = "Error occured.";
        this.error = true;
        
        if (regRef.componentInstance){
          regRef.disableClose=false;
         regRef.close();
        }
      }, 
      () => 
      { 
        if (regRef.componentInstance) 
        console.log("Token not finised"); 
      }).closed;
  }

  userLogin(Email: string, Password: string, signInRef: MatDialogRef<SignInComponent>) : boolean
  {
    //console.log("before stringfy: "+ user.email);
    this.body = { email: Email, password: Password };//JSON.stringify(credetials);
    console.log("after stringfy: " + this.body);

    return this.http.get(this.BASE_URL + `/Users/GetUser/${Email}&${Password}`)
      //this.Body, this.httpOptions)
      .subscribe((response) => {
        console.log(JSON.stringify(response));

        this.User = new User().deserialize(response);
        /*if(this.user.userId==1)
          this.admin=true;*/
        this.password=this.user.password;
        this.User.password="";
        console.log("Token launch");
        this.SetToken(Email, Password)
          .subscribe(
            (data: any) => { },
            (error) => {
              console.error(error + " for token!!!");
              this.body = error;
            }, () => { console.log("Done auth"); 
            if (signInRef.componentInstance) {
              signInRef.disableClose=false;
            signInRef.close();
          }
           }
            /*.pipe(
              catchError(this.handleError)*/

          );
      }, (error) => {
        console.error(error + " for signIn!!!");
        this.data = error.message;

        if (this.data.search("unknown url") >= 1)
          this.data = "Cannot reach server";
        if (this.data.search("Email") >= 1)
          this.data = "Email not found";
        if (this.data.search("Password") >= 1)
          this.data = "Password not found";

        this.error = true;
        if (signInRef.componentInstance){
          signInRef.disableClose=false;
         signInRef.close();
        }
      }, 
      () => { 
        if (signInRef.componentInstance) 
        console.log("Token not finised"); 
      }).closed;
  }

  userUpdate(userUpdate: Users, loading:changeLayout) : boolean
  {

    this.body = userUpdate;
    console.log(this.body);
    if(userUpdate.password=="")
    {
      //userUpdate.password=this.user.password;
      this.user.deserialize(userUpdate);
      this.user.password=this.password;
    }
    else
      this.user.deserialize(userUpdate);

      return this.http.put(this.BASE_URL + "/Users/UpdateUser",
        this.user)//, this.httpOptions)
        .map(response => {
          console.log(response);
          this.password = this.user.password;
          this.user.password="";
          //this.user = new User().deserialize(response);
        })
        .subscribe(data => {
          console.log(data);
        }
          , error => {
            this.data = error.message;
            this.error = true;
            //console.error(this.httpOptions);
            console.error(this.data);
            if(this.data.search("400"))
              loading.errorMessage="Internal server error";

            if(this.data.search("unknown url"))
              loading.errorMessage="Server unreachable.";

            loading.load=false;
            loading.error=true;
            //message.error="";
          }, () => { console.log("Update Done uncheck interface");loading.load=false; }).closed;
  }

  userLogic(type: string) : void
  {
    if (this.User != null) {
      //auth = this.Authenticated;

      if (this.Authenticated) {
        console.log(this.Authenticated);
        this.error = false;
      }
      else {
        this.errorState = "Failed to authenticate. " + this.Data + ".";
        this.error = true;
        console.log(this.error)
      }
    }
    else {
      this.errorState = "Failed to " + type + ". " + this.Data + ".";

    }
  }

  serviceLogic() : void
  {
    
  }

  SetToken(email: string, password: string) : Observable<any>
  {
    console.log("Email = " + email + " Password = " + password);
    return this.http.get(this.BASE_URL + `/Token/CreateToken/${email}&${password}`)//, this.httpOptions)
      .map((response) => {
        //this.body = response;
        this.myToken = response as Token;
        console.log(this.myToken.token);
        this.GetToken = "Bearer "+this.myToken.token;
        localStorage.setItem("currentUser", this.myToken.token);
        //console.log("currentUser = "+localStorage.getItem("currentUser"));
        this.Authenticated = true;

        console.log("Auth is true!!!!");
      });
  }

  AccountDetails()
  {
    //console.log(accData);
    return this.http.get(this.BASE_URL+`/AccBookings/GetBookings/${this.User.userId}`);
    
  }

  PaymentSuccess(id:number) :boolean
  {
    return this.http.post(this.BASE_URL+`/AccBookings/Book`, 
  id
  )
  .subscribe(
    data =>{

    }, 
    error => {

    }, 
    () => {

    }
  ).closed;
  }

  logOut():boolean
  {
    return this.http.post(this.BASE_URL+`/Token/LogOut`,User)
    .subscribe(
      data=>{
        
      },
      error=>{

      },
      ()=>{

      }
    ).closed
  }

  //*******Set*******//

  set Authenticated(state) {
    this.authenticated = state;
  }
  set GetToken(token) {
    this.getToken = token;
  }

  set User(loggedIn)
  {
    //this.user=new User();
    
    this.user=loggedIn;
    //this.Admin=new Object();
    if(this.user.userId==1)
      this.admin=true;
      console.log("setting user admin = "+this.Admin);
  }

  set ServiceType(serviceType)
  {
    this.serviceType=serviceType;
  }

  set Property(property)
  {
    this.property=property;
  }

  set Flight(flight)
  {
    this.flight=flight;
  }

  set Payment(payment)
  {
    this.payment=payment;
  }

  set AccData(accData)
  {
    this.accData=accData;
  }



//*******Get*******//

  get Me()
  {
    this.GetToken="Bearer "+localStorage.getItem("currentUser");
    //if(){}
    return this.http.get(this.BASE_URL+"/Token/SignIn");//,
    //{headers:new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("currentUser"))})
    /*.pipe(
      catchError(this.handleError)
    );*/
  }

  get GetToken() {
    /*if(localStorage.getItem("currentUser"))
    return localStorage.getItem("currentUser");
    else
    return "null";*/
    return this.getToken;
  }

  get Admin()
  {
    return this.admin;
  }

  get ServiceType()
  {
    return this.serviceType;
  }

  get GetAccommodation()
  {
    return this.http.get(this.BASE_URL+`/Accommodations/GetAll`);
  }

  get GetProperty()
  {
    return this.http.get(this.BASE_URL+`/Properties/GetAll`);
  }

  get GetFlight()
  {
    return this.http.get(this.BASE_URL+`/Flights/GetAll`);
  }

  get GetFlightDetails()
  {
    return this.http.get(this.BASE_URL+`/Flights/FlightDetails/GetDetail`);
  }

  get Data() {
    return this.data;
  }
  get Authenticated() {

    return this.authenticated;
  }

  get User(): User {
    return this.user;
  }

  get Property()
  {
    return this.property;
  }

  get Flight()
  {
    return this.flight;
  }

  get AccData()
  {
    return this.accData;
  }

  get Payment()
  {
    return this.payment;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    this.Authenticated = false;
    console.log("authenticated = " + this.Authenticated);
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
interface Token {
  token: string;
}

/*interface Credetials {
  email: string;
  password: string;
}*/
