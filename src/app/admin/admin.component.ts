import { Component } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Users } from '../service/common-interface';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  commonLayout=[
    {"userId": 0,
  "name": "string",
  "surname": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
    }];
  users;
  constructor(
    private service:UsersService,
    private admin:AdminService,
    private route:Router
  ) {
      //this.serviceType=service.ServiceType;
      if(!service.User)
      {
        route.navigate(["/home"]);
      }
      console.log(this.commonLayout[0]);
   }

  step = 0;
  serviceType:string;

  GetUsers():void
  {
    this.admin.GetAllUsers()
    .subscribe(
      data=>{
        console.log(data);
        this.users=data as Users[];
        console.log(this.users);
      },
      error=>{
        console.error(error);
      },
      ()=>{
        console.log("Done.");
      }
    ).closed;
    console.log("");
  }

  setStep(index: number) : void
  {
    this.step = index;
  }

  nextStep() :void
  {
    this.step++;
  }

  prevStep() :void
  {
    this.step--;
  }
}
