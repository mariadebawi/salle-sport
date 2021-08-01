import { Routes } from "@angular/router";
import { LandingComponent } from "./pages/landing/landing.component";
import { LoginComponent } from "./pages/pages/login/login.component";
import { RegisterComponent } from "./pages/pages/register/register.component";




export const VetrineRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: LandingComponent },

];
