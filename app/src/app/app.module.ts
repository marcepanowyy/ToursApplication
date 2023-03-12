import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import {AppComponent } from './app.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {NavbarComponent } from './navbar/navbar.component';
import {FilterPipe} from "./pipes/filteredTours";
import { FilterComponent } from './filter/filter.component';
import {MatSelectModule} from "@angular/material/select";
import {ToursComponent } from './tours/tours.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { StartComponent } from './start/start.component';
import {RouterModule, Routes} from "@angular/router";
import { TourComponent } from './tours/tour/tour.component';
import { ErrorComponent } from './error/error.component';
import { BasketComponent } from './basket/basket.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { DatePipe } from '@angular/common';
import { MapComponent } from './map/map.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import { AdminViewComponent } from './admin-view/admin-view.component';
import {NgxPaginationModule} from 'ngx-pagination';

const appRoute: Routes = [
  {path: "Home", component: StartComponent},
  {path: "Tours", component: ToursComponent},
  {path: "AddTour", component: DialogComponent, canActivate: [RoleGuard]},
  {path: "Footer", component: FooterComponent},
  {path: "Basket", component: BasketComponent, canActivate: [AuthGuard]},
  {path: "Orders", component: OrdersComponent, canActivate: [AuthGuard]},
  {path: "Tours/Tour/:id", component: TourComponent},
  {path: "Register", component: RegisterComponent},
  {path: "Login", component: LoginComponent},
  {path: "AdminView", component: AdminViewComponent, canActivate: [RoleGuard]},
  { path: '', redirectTo: 'Home', pathMatch: 'full'}, // default route
  {path: "**", component: ErrorComponent}, // matches every route
]

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    NavbarComponent,
    FilterPipe,
    FilterComponent,
    ToursComponent,
    FooterComponent,
    StartComponent,
    TourComponent,
    ErrorComponent,
    BasketComponent,
    RegisterComponent,
    LoginComponent,
    OrdersComponent,
    MapComponent,
    AdminViewComponent,
  ],
  imports: [
    [BrowserModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      MatSelectModule,
      MatPaginatorModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FontAwesomeModule,
      RouterModule.forRoot(appRoute, {scrollPositionRestoration: 'enabled'}),
      CommonModule,
      NgxPaginationModule
  ],
  ],
  providers: [DatePipe, AuthService, AuthGuard, RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
