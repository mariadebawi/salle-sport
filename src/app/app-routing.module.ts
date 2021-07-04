import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { MangerComponent } from "./layouts/manger/manger.component";
import { VetrineComponent } from "./layouts/vetrine/vetrine.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "",
    component: VetrineComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/vetrine/vetrine.module#VetrineModule"
      }
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  }, 
  {
    path: "manger",
    component: MangerComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/manger/manger.module#MangerModule"
      }
    ]
  },

  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
