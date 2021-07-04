import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VetrineComponent } from './vetrine.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { VetrineRoutes } from './vetrine.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VetrineRoutes),

  ],
  declarations: [LoginComponent , RegisterComponent , LandingComponent]
})
export class VetrineModule { }
