import { Component, OnInit } from '@angular/core';
import { ManagerModel } from 'src/app/models/gym.model';
import { GymService } from 'src/app/services/gym.service';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.scss']
})
export class GymsComponent implements OnInit {
  page='1';
  allManagers:ManagerModel[];
  config: any;
  constructor( private gymSerrvic :GymService) { }

  ngOnInit(): void {
    this.GetAllManagers() ;
  }

  GetAllManagers() {
      this.gymSerrvic.getAllManger(this.page).subscribe((res:any)=>{
      this.allManagers=res.data.list;

      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: res.data.total
      };
    })
  }

  getImage(photo:string) {
    if(photo == null || !photo || photo ==="" || !photo.startsWith('https://cdn1.benouaiche.com/wp-content/uploads') ){
      return './assets/img/fitness-2.png'
    }else {
      return photo
    }
  }






  

}
