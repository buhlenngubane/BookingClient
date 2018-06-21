import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
  MatSelectModule,
  MatTableModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatStepperModule,
  MatDividerModule,
  MatTooltipModule
} from '@angular/material';

import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule} from '@angular/common/http';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FlightComponent, SearchBarComponent } from './flight/flight.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { AirTaxiComponent, AirSearchBarComponent } from './air-taxi/air-taxi.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { httpInterceptorProviders } from './service/interceptor-barell/index';
import { routes } from './app.routes';
import { AdminComponent, AdminPostComponent, AdminPutComponent, AdminDeleteComponent } from './admin/admin.component';
import { PaymentComponent, PayLayoutComponent } from './payment/payment.component';
import { AdminService } from './service/admin.service';
import { SearchService } from './service/search.service';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { DatePipe } from '@angular/common';
import { DetailComponent } from './search/flight-detail/detail.component';
import { CarDetailsComponent } from './search/car-details/car-details.component';
import 'hammerjs';
import { PageNotFoundComponent } from './page-not-found';
import { AirDetailsComponent } from './search/air-details/air-details.component';
import { PcarRentalComponent } from './payment/pcar-rental/pcar-rental.component';
import { PairTaxiComponent } from './payment/pair-taxi/pair-taxi.component';
import { PflightComponent } from './payment/pflight/pflight.component';
import { PaccommodationComponent } from './payment/paccommodation/paccommodation.component';
import { GrowlModule } from 'primeng/primeng';
import { FooterComponent } from './footer.component';
import { AboutUsComponent } from './about-us/about-us.component';

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
    DetailComponent,
    CarDetailsComponent,
    PageNotFoundComponent,
    SearchBarComponent,
    AirSearchBarComponent,
    AirDetailsComponent,
    PcarRentalComponent,
    PairTaxiComponent,
    PflightComponent,
    PaccommodationComponent,
    PayLayoutComponent,
    AdminPostComponent,
    AdminPutComponent,
    AdminDeleteComponent,
    FooterComponent,
    AboutUsComponent
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
    MatTableModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    GrowlModule,
    MatStepperModule,
    MatDividerModule,
    MatTooltipModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
  ],
  exports: [RouterModule],
  providers: [UsersService,
    httpInterceptorProviders,
    AdminService,
    SearchService,
    DatePipe,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  entryComponents: [SignInComponent,
    RegisterComponent,
    AccountDetailsComponent],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
