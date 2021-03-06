import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerLayoutRoutes } from './manager-layout.routing';
import { ActitviesListComponent } from './pages/activites/actitviesList/actitviesList.component';
import { ListComponent } from './pages/employes/list/list.component';
import { AddEmpComponent } from './pages/employes/add-emp/add-emp.component';
import { AddAdherentComponent } from './pages/adherents/add-adherent/add-adherent.component';
import { ListAdComponent } from './pages/adherents/list-ad/list-ad.component';
import { ListOfComponent } from './pages/offers/list-of/list-of.component';
import { AddOfComponent } from './pages/offers/add-of/add-of.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToggleModule } from 'ng-toggle-button';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EditOfComponent } from './pages/offers/editOf/editOf.component';
import { EditEmplComponent } from './pages/employes/editEmpl/editEmpl.component';
import { GestionCaisseComponent } from './pages/gestionCaisse/gestionCaisse.component';
import { ManagerProfileComponent } from './manager-profile/manager-profile.component';
import { RenouvelementComponent } from './Renouvelement/Renouvelement.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
      CommonModule,
       RouterModule.forChild(ManagerLayoutRoutes), 
       FormsModule,
       ReactiveFormsModule ,
       NgToggleModule,
      NgxPaginationModule ,
      NgbModule,
      ChartsModule
    ],

   declarations: [   
    ActitviesListComponent,
     ListComponent,
      AddEmpComponent, 
      AddAdherentComponent, 
      ListAdComponent, 
      ListOfComponent,
       AddOfComponent,
         DashboardComponent,
         EditOfComponent,
         EditEmplComponent,
         GestionCaisseComponent,
         ManagerProfileComponent,
         RenouvelementComponent
        ]
})
export class MangerModule { }



