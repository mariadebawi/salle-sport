import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerLayoutRoutes } from './manager-layout.routing';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientDetailsComponent } from './pages/clientDetails/clientDetails.component';
import { ActitviesListComponent } from './pages/actitviesList/actitviesList.component';
import { CoachsComponent } from './pages/coachs/coachs.component';
import { AddActivityComponent } from './pages/activites/add-activity/add-activity.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ManagerLayoutRoutes),

  ],
  declarations: [ ClientsComponent ,ClientDetailsComponent , ActitviesListComponent, CoachsComponent, AddActivityComponent]
})
export class MangerModule { }



