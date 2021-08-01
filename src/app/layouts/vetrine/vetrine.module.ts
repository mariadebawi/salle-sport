import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './pages/landing/landing.component';
import { VetrineRoutes } from './vetrine.routing';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/pages/login/login.component';
import { RegisterComponent } from './pages/pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VetrineRoutes),
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [LoginComponent , RegisterComponent , LandingComponent]
})
export class VetrineModule { }
