import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor( private route: ActivatedRoute, private router: Router, ) {
    this.wichRoute(JSON.parse(localStorage.getItem('currentUser')))
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
