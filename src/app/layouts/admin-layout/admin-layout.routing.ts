import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {OffersComponent} from './pages/offers/offers.component';
import {MangersComponent} from "./pages/mangers/mangers.component";
import {GymsComponent} from "./pages/gyms/gyms.component";
import {DetailsGymComponent} from "./pages/details-gym/details-gym.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'  },
      { path: 'dashboard',component: DashboardComponent},
      { path: 'mangers',component: MangersComponent},
      { path: 'offers',component: OffersComponent},
      { path: 'gyms',component: GymsComponent},
      { path: 'gyms/:id',component: DetailsGymComponent},
    ]
    }

];
