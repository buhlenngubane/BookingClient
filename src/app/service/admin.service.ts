import { Injectable } from '@angular/core';
import { Users } from './common-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {

  users:Users[];
  constructor(private http:HttpClient) {
    this.users=[] as Users[];
   }

  GetAllUsers()
  {
    //this.users=user;
    return this.http.get(environment.base_url+`/Users/GetAll`)
    
  }

}
