import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerLayoutRoutes } from './manager-layout.routing';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientDetailsComponent } from './pages/clientDetails/clientDetails.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ManagerLayoutRoutes),

  ],
  declarations: [ ClientsComponent ,ClientDetailsComponent]
})
export class MangerModule { }



