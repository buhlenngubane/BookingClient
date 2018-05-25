import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { retryWhen, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Property, Flight, FlightPic, Accommodation } from './common-interface';
import { Subject } from 'rxjs/Subject';
import { UsersService } from './user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class SearchService {

  private property: Property[];
  private searchParam: string = "";
  private dateFrom: Date = new Date();
  private dateTo: Date = new Date();
  private diff: number = 1;
  private panel: string = "1 room";
  private num = [{ text: " room", number: 1 }];
  private min: Date = new Date();
  private max: Date = new Date();
  private nights: number = 1;
  private total: number = 1;
  private bookingObj = {
    "userId": 0,
    "accId": 0,
    "numOfNights": 0,
    "bookDate": "2018-05-17T13:04:12.854Z",
    "payType": "string",
    "payStatus": false,
    "total": 0
  };
  private rooms: number = 1;
  private commonShare = {
    dateFrom: new Date(),
    dateTo: new Date(),
    diff: 1,
    min: new Date(),
    max: new Date(),
    min2: new Date(),
    max2: new Date()
  }
  flightShare = {
    firstSearch: "",
    secondSearch: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    diff: 1,
    flightType: ""
  }
  firstSearch = "";
  secondSearch = "";
  details:Flight[];
  //flightPics:FlightPic[];

  constructor(
    private http: HttpClient,
    private service: UsersService,
    private route:Router,
    private datePipe: DatePipe
  ) {
    this.property as Property[];
    this.details as Flight[];
  }

  search(terms: Observable<string>, id: number) {
    if (id == 1)
      return terms.debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this.searchEntries(term));

    if (id == 2)
      return terms.debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this.searchEntriesFlightLocale(term));

    if (id == 3)
      return terms.debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this.searchEntriesFlightDestination(term));
  }

  searchEntries(term) {
    return this.http
      .get(environment.base_url + `/Accommodations/Search/${term}`)
  }

  /*searchFlight(terms: Observable<string>) {

    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }*/

  searchEntriesFlightLocale(term) {
    return this.http
      .get(environment.base_url + `/Flights/Search/${term}`)
  }

  searchEntriesFlightDestination(term) {
    return this.http
      .get(environment.base_url + `/Flights/Destinations/Search/${term}`)
  }

  Search(value: string, dateForm:Date, dateTo:Date, panel:string, accommodation:Accommodation[]): boolean {
    var accId = +value;
    return this.http.get(environment.base_url + `/Properties/GetProperties/${accId}`)
    .subscribe(
      data => {
        console.log(data);
        let acc = accommodation.find(s=>s.accId==(+value));
        if(acc)
          this.SearchParam=acc.country+", "+acc.location;
          
        this.Property = data as Property[];
        console.log(JSON.stringify(this.Property))
        this.DateFrom = dateForm;
        this.DateTo = dateTo;
        this.Panel=panel;
        this.Nights = this.diff;
        this.route.navigate(["/search"]);
      },
      error => {
        console.error(error.message);
      },
      () => {
        console.log("search done.");
      }
    ).closed;
  }

  SearchFlights(id:number): boolean {
    console.log("Id = "+id)
    return this.http.get(environment.base_url + `/Flights/FlightDetails/GetDetail/${id}`)
    .subscribe(
      data=>{
        console.log(data);
        this.details=data as Flight[];
        let temp=this.details;
        let str="";
        let index=0;
        console.log(temp);
        temp.forEach(element => {
          if(index!=0)
            str+=",";
          str+=element.cid;
          index++;
        });
        console.log(str);
        this.service.getCompanyFlight(str)
        //this.route.navigate(["/detail"]);
      },
      error=>{
        console.error(error.message);
      },
      ()=>{
        console.log("Done");
      }
    ).closed;
  }

  /*SearchCompany()
  {
    let obj ={range:1};
    let term = JSON.stringify(obj);
    console.log(term);
    return this.http.get(environment.base_url+`/Companies/GetCompanies/${term}`)
    .subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.error(error.message);
      },
      ()=>{

      }
    )
  }*/

  //Flights()

  propertySearch(value?: string) {
    if (this.Property != null)
      return this.Property.find(m => m.propName.includes(value));
    else
      return false;
  }

  Book(): Observable<any> {
    this.bookingObj.userId = this.service.User.userId;
    this.bookingObj.accId = this.service.Property.accId;
    this.bookingObj.bookDate = this.datePipe.transform(this.DateFrom, "yyyy-MM-dd");
    this.bookingObj.numOfNights = this.Nights;
    this.bookingObj.payStatus = true;
    this.bookingObj.payType = "PayPal";
    this.bookingObj.total = this.Total;
    return this.http.post(environment.base_url + "/AccBookings/New", this.bookingObj);

  }

  /*****Set*****/

  set Property(property) {
    this.property = property;
  }

  set SearchParam(searchParam) {
    this.searchParam = searchParam;
  }

  set DateFrom(dateFrom) {
    this.dateFrom = dateFrom;
  }

  set DateTo(dateTo) {
    this.dateTo = dateTo;
  }

  set Diff(diff) {
    this.diff = diff;
  }

  set Min(min) {
    this.min = min;
  }

  set Max(max) {
    this.max = max;
  }

  set Panel(panel) {
    console.log("not undefined" + panel);
    this.panel = panel;
    //console.log(panel.number)
  }

  set Num(num) {
    this.num = num;
  }

  set Rooms(rooms) {
    this.rooms = rooms;
  }

  set Nights(nights) {
    this.nights = nights;
  }

  set CommonShare(common) {
    this.commonShare = common
  }

  /*****Get*****/

  get Property() {
    return this.property;
  }

  get SearchParam() {
    return this.searchParam;
  }

  get DateFrom() {
    return this.dateFrom;
  }

  get DateTo() {
    return this.dateTo;
  }

  get Diff() {
    return this.diff;
  }

  get Min() {
    return this.min;
  }

  get Max() {
    return this.max;
  }

  get Panel() {
    console.log("not undefined" + JSON.stringify(this.panel));
    return this.panel;
  }

  get Num() {
    return this.num;
  }

  get Rooms() {
    return this.rooms;
  }

  get Nights() {
    return this.nights;
  }

  get Total() {
    //let rooms = this.panel;
    if (this.service.Property && this.Panel) {
      //let number = rooms.split(" ");
      this.total = this.service.Property.pricePerNight * (this.Nights * (this.Rooms));

      console.log(this.total + " service " + this.service.Property.pricePerNight + " Nights " + this.Nights + " Panel number: " +
        this.Rooms + " Panel text: " + this.panel + " panel strigfy: " + this.panel);
    }
    return this.total;
  }

  get CommonShare() {
    return this.commonShare;
  }

}
