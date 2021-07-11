import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MangersComponent } from './pages/mangers/mangers.component';
import { OffersComponent } from './pages/offers/offers.component';
import { GymsComponent } from './pages/gyms/gyms.component';
import { DetailsGymComponent } from './pages/details-gym/details-gym.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    MangersComponent,
    OffersComponent,
    GymsComponent,
    DetailsGymComponent,
  ]
})
export class AdminLayoutModule {}
