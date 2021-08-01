import { Routes } from "@angular/router";
import { MangerComponent } from "./manger.component";
import { ActitviesListComponent } from "./pages/activites/actitviesList/actitviesList.component";
import {AddActivityComponent} from './pages/activites/add-activity/add-activity.component';
import {ListComponent} from './pages/employes/list/list.component';
import {AddEmpComponent} from './pages/employes/add-emp/add-emp.component';
import {ListAdComponent} from './pages/adherents/list-ad/list-ad.component';
import {AddAdherentComponent} from './pages/adherents/add-adherent/add-adherent.component';
import {ListOfComponent} from './pages/offers/list-of/list-of.component';
import {AddOfComponent} from './pages/offers/add-of/add-of.component';
import {EditProfileComponent} from './pages/user/edit-profile/edit-profile.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';


export const ManagerLayoutRoutes: Routes = [
  {
    path: '',
    component: MangerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'  },
      { path: "dashboard", component: DashboardComponent },
      { path: "activities", component: ActitviesListComponent },
      { path: "activities/add", component: AddActivityComponent },
      { path: 'employees',component: ListComponent},
      { path: 'employees/add',component: AddEmpComponent},
      { path: 'adherents',component: ListAdComponent},
      { path: 'adherents/add',component: AddAdherentComponent},
      { path: 'offers',component: ListOfComponent},
      { path: 'offers/add',component: AddOfComponent},
      { path: 'profile/edit',component: EditProfileComponent},
    ]
    }
];
