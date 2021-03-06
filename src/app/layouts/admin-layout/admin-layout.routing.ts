import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {OffersComponent} from './pages/offer/offers/offers.component';
import {MangersComponent} from "./pages/mangers/mangers.component";
import {GymsComponent} from "./pages/gym/gyms/gyms.component";
import {DetailsGymComponent} from "./pages/gym/details-gym/details-gym.component";
import { AdminProfileComponent } from "./pages/admin-profile/admin-profile.component";
import { SubscriptionsComponent } from "./pages/subscriptions/subscriptions.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'  },
      { path: 'dashboard',component: DashboardComponent},
      { path: 'managers',component: MangersComponent},
      { path: 'offers',component: OffersComponent},
      { path: 'gyms',component: GymsComponent},
      { path: 'gyms/:id',component: DetailsGymComponent},
      { path: 'my-profile',component: AdminProfileComponent},
      { path: 'subscriptions',component: SubscriptionsComponent},


    ]
    }

];
