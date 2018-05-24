import { Routes } from "@angular/router";
import { AccommodationComponent } from "./accommodation/accommodation.component";
import { FlightComponent } from "./flight/flight.component";
import { CarRentalComponent } from "./car-rental/car-rental.component";
import { AirTaxiComponent } from "./air-taxi/air-taxi.component";
import { AdminComponent } from "./admin/admin.component";
import { PaymentComponent } from "./payment/payment.component";
import { SearchResultComponent } from "./search/search-result/search-result.component";
import { DetailComponent } from "./search/detail/detail.component";

export const routes: Routes=[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', component:AccommodationComponent},
    {path:'flight',component:FlightComponent},
    {path:'car-rentals',component:CarRentalComponent},
    {path:'air-taxi',component:AirTaxiComponent},
    {path:'search',component:SearchResultComponent},
    {path:'detail', component:DetailComponent},
    {path:"admin", component:AdminComponent}, 
    {path: 'payment', component:PaymentComponent}
    
  ];