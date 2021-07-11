import { Routes } from "@angular/router";
import { MangerComponent } from "./manger.component";
import { ActitviesListComponent } from "./pages/actitviesList/actitviesList.component";
import { ClientDetailsComponent } from "./pages/clientDetails/clientDetails.component";
import { ClientsComponent } from "./pages/clients/clients.component";
import {CoachsComponent} from './pages/coachs/coachs.component';
import {AddActivityComponent} from './pages/activites/add-activity/add-activity.component';


export const ManagerLayoutRoutes: Routes = [
  {
    path: '',
    component: MangerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'clients'  },
      { path: 'clients',component: ClientsComponent},
      { path: "clients/:id", component: ClientDetailsComponent },
      { path: "activities", component: ActitviesListComponent },
      { path: "activities/add", component: AddActivityComponent },
      { path: 'coachs',component: CoachsComponent},

    ]
    }
];
