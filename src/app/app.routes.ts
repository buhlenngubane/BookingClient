import { Routes } from '@angular/router';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { FlightComponent } from './flight/flight.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { AirTaxiComponent } from './air-taxi/air-taxi.component';
import { AdminComponent } from './admin/admin.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { DetailComponent } from './search/flight-detail/detail.component';
import { CarDetailsComponent } from './search/car-details/car-details.component';
import { PageNotFoundComponent } from './page-not-found';
import { AirDetailsComponent } from './search/air-details/air-details.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: AccommodationComponent},
    {path: 'flight', component: FlightComponent},
    {path: 'car-rentals', component: CarRentalComponent},
    {path: 'air-taxi', component: AirTaxiComponent},
    {path: 'acc-detail', component: SearchResultComponent},
    {path: 'flight-detail', component: DetailComponent},
    {path: 'car-detail', component: CarDetailsComponent},
    {path: 'air-detail', component: AirDetailsComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'payment', component: PaymentComponent},
    { path: '**', component: PageNotFoundComponent }
  ];
