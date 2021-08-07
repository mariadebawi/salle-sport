import { Component, OnInit } from '@angular/core';
import { ManagerModel } from 'src/app/models/gym.model';
import { GymService } from 'src/app/services/gym.service';

@Component({
  selector: 'app-mangers',
  templateUrl: './mangers.component.html',
  styleUrls: ['./mangers.component.scss']
})
export class MangersComponent implements OnInit {
  page='1';
  allManagers:ManagerModel[];
  config: any;
  configg = {
    value: false,
    name: "",
    disabled: false,
    height: 25,
    width: 50,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: "#56C128",
      unchecked: "#dcdcdc"
    },
    switchColor: {
      checked: "#3366FF",
      unchecked: "crimson"
    },
    labels: {
      unchecked: "off",
      checked: "on"
    },
    checkedLabel: "",
    uncheckedLabel: "",
    fontColor: {
      checked: "#fafafa",
      unchecked: "#ffffff"
    }
  };


  constructor( private gymSerrvic :GymService) { }

  ngOnInit(): void {
    this.GetAllManagers() ;
    
  }

  changeValue(id , value) {
    console.log(value);
    this.gymSerrvic.changeStatusMang(id,value).subscribe((res: any) => {
      console.log(res);
      this.GetAllManagers();
      });

  }




  GetAllManagers() {
      this.gymSerrvic.getAllManger(this.page).subscribe((res:any)=>{
      this.allManagers=res.data.list;
      console.log(this.allManagers);
      
  
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: this.allManagers.length
      };
    })
  }

}
