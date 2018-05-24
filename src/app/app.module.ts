import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {UsersService} from './service/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, 
  MatCardModule, 
  MatToolbarModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatProgressSpinnerModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatSelectModule
} from '@angular/material';

import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule} from '@angular/common/http';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FlightComponent } from './flight/flight.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { AirTaxiComponent } from './air-taxi/air-taxi.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { httpInterceptorProviders } from './service/interceptor-barell/index';
import { routes } from './app.routes';
import { AdminComponent } from './admin/admin.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminService } from './service/admin.service';
import { SearchService } from './service/search.service';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { DatePipe } from '@angular/common';
import { DetailComponent } from './search/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AccommodationComponent,
    RegisterComponent,
    FlightComponent,
    CarRentalComponent,
    AirTaxiComponent,
    AccountDetailsComponent,
    AdminComponent,
    PaymentComponent,
    SearchResultComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
  ],
  providers: [UsersService, 
    httpInterceptorProviders, 
    AdminService, 
    SearchService, 
    DatePipe],
  entryComponents:[SignInComponent, 
    RegisterComponent, 
    AccountDetailsComponent],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
