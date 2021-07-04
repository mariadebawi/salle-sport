import { Routes } from "@angular/router";
import { MangerComponent } from "./manger.component";
import { ClientDetailsComponent } from "./pages/clientDetails/clientDetails.component";
import { ClientsComponent } from "./pages/clients/clients.component";


export const ManagerLayoutRoutes: Routes = [
  {
    path: '',
    component: MangerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'clients'  },
      { path: 'clients',component: ClientsComponent},
      { path: "clients/:id", component: ClientDetailsComponent },
    ]
    }
];
