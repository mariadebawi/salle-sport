import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MangersComponent } from './pages/mangers/mangers.component';
import { OffersComponent } from './pages/offer/offers/offers.component';
import { GymsComponent } from './pages/gym/gyms/gyms.component';
import { DetailsGymComponent } from './pages/gym/details-gym/details-gym.component';
import { NgxPaginationModule } from "ngx-pagination";
import { NgToggleModule } from 'ng-toggle-button';
import { AdminProfileComponent } from "./pages/admin-profile/admin-profile.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule ,
    ReactiveFormsModule,
    FormsModule,
    NgToggleModule

  ],
  declarations: [
    DashboardComponent,
    MangersComponent,
    OffersComponent,
    GymsComponent,
    DetailsGymComponent,
    AdminProfileComponent
  ]
})
export class AdminLayoutModule {}
