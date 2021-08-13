import {  Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { ManagerModel } from "./models/gym.model";
import { LoaderService } from "./services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit  {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor( private route: ActivatedRoute, private router: Router,  
    private loaderService: LoaderService
    ) {}

    
  ngOnInit(): void {
    this.wichRoute(JSON.parse(localStorage.getItem('currentUser')))
  }

  wichRoute(currentUser : ManagerModel) {    
       if (currentUser  && currentUser.role === "admin") {            
             this.router.navigate(['/admin']);
            }else if(currentUser && currentUser.role === "manager" || currentUser && currentUser.role === "secretary" ) {
              this.router.navigate(['/manager']);
        }else {
            this.router.navigate(['/login']);
         }
}
 


}
