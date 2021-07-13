import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerLayoutRoutes } from './manager-layout.routing';
import { ActitviesListComponent } from './pages/activites/actitviesList/actitviesList.component';
import { AddActivityComponent } from './pages/activites/add-activity/add-activity.component';
import { ListComponent } from './pages/employes/list/list.component';
import { AddEmpComponent } from './pages/employes/add-emp/add-emp.component';
import { AddAdherentComponent } from './pages/adherents/add-adherent/add-adherent.component';
import { ListAdComponent } from './pages/adherents/list-ad/list-ad.component';
import { ListOfComponent } from './pages/offers/list-of/list-of.component';
import { AddOfComponent } from './pages/offers/add-of/add-of.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ManagerLayoutRoutes),

  ],
  declarations: [   ActitviesListComponent, AddActivityComponent, ListComponent, AddEmpComponent, AddAdherentComponent, ListAdComponent, ListOfComponent, AddOfComponent]
})
export class MangerModule { }



