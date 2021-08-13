import { Component, OnInit } from '@angular/core';
import { ManagerModel } from 'src/app/models/gym.model';
import { GymService } from 'src/app/services/gym.service';
import Swal from 'sweetalert2';

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
    if(value) {
      Swal.fire({
        title: 'Vous êtes sur ?',
        text: "vous êtes sur de bloquer ce manager ?!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Non',

        cancelButtonColor: '#d33',
        confirmButtonText: 'oui'
      }).then((result) => {
        if (result.isConfirmed) {
          this.gymSerrvic.changeStatusMang(id).subscribe((res: any) => {
            this.GetAllManagers();
            });
          Swal.fire(
            'Bloqué!',
            'ce manager est bloqué.',
            'success'
          )
        }
      })
    }
    else {
      this.gymSerrvic.changeStatusMang(id).subscribe((res: any) => {
        this.GetAllManagers();
        });
        Swal.fire(
          'Débloqué!',
          'ce manager est debloqué.',
          'success'
        )
    }
    

  }

  GetAllManagers() {
      this.gymSerrvic.getAllManger(this.page).subscribe((res:any)=>{
      this.allManagers=res.data.list;
      
  
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: this.allManagers.length
      };
    })
  }

}
