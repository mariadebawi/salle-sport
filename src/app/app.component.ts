import {  Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoaderService } from "./services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent   {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor( private route: ActivatedRoute, private router: Router,  
    private loaderService: LoaderService
    ) {

    this.wichRoute(JSON.parse(localStorage.getItem('currentUser')))
    
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  wichRoute(currentUser) {    
       if (currentUser  && currentUser.role === "admin") {            
             this.router.navigate(['/admin']);
         }else if(currentUser && currentUser.role === "manager") {
             this.router.navigate(['/manager']);
        }else {
            this.router.navigate(['/login']);
         }
}
 


}
