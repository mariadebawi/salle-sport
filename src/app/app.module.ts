import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { MangerComponent } from "./layouts/manger/manger.component";
import { VetrineComponent } from "./layouts/vetrine/vetrine.component";
import { BasicAuthInterceptor } from "./services/basic-auth.interceptor";
import { ErrorInterceptor } from "./services/error.interceptor";
import { LoaderService } from "./services/loading.service";
import { LoaderInterceptor } from "./services/loadertercept.service";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent , MangerComponent , VetrineComponent],
  providers: [
    LoaderService ,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }

],
  bootstrap: [AppComponent]
})
export class AppModule {}
