import { Routes } from '@angular/router';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { FlightComponent } from './flight/flight.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { AirTaxiComponent } from './air-taxi/air-taxi.component';
import { AdminComponent, AdminPostComponent, AdminPutComponent, AdminDeleteComponent } from './admin/admin.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { DetailComponent } from './search/flight-detail/detail.component';
import { CarDetailsComponent } from './search/car-details/car-details.component';
import { PageNotFoundComponent } from './page-not-found';
import { AirDetailsComponent } from './search/air-details/air-details.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: AccommodationComponent},
    {path: 'flight', component: FlightComponent},
    {path: 'car-rentals', component: CarRentalComponent},
    {path: 'air-taxi', component: AirTaxiComponent},
    {path: 'acc-detail/:dest', component: SearchResultComponent},
    {path: 'flight-detail', component: DetailComponent},
    {path: 'car-detail', component: CarDetailsComponent},
    {path: 'air-detail', component: AirDetailsComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'admin-post', component: AdminPostComponent},
    {path: 'admin-put', component: AdminPutComponent},
    {path: 'admin-delete', component: AdminDeleteComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: '**', component: PageNotFoundComponent}
  ];
