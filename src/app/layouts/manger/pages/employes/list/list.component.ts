import { Component, OnInit } from '@angular/core';
import { ManagerModel } from 'src/app/models/gym.model';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listEmploye:ManagerModel[]=[] ;
  page='1';
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

 public labels: any = {
   previousLabel: '&nbsp;',
   nextLabel: '&nbsp;',
   screenReaderPaginationLabel: 'Pagination',
   screenReaderPageLabel: 'page',
   screenReaderCurrentLabel: `You're on page`
};

currentUser: ManagerModel ;
  constructor(private serviceEmploy:ProfileService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;
    this.getAllEmloyer(this.page);
  }

  getlistWithRole(value:string){
    switch (value)
    {
      case "coach":
      case "secretary":
        this.getAllEmloyer(this.page,value)
        break;
      default:
        this.getAllEmloyer(this.page)
    }
  }

  getAllEmloyer(page , role?:string) {
    if(role) {
      this.serviceEmploy.getListEmployer(page , role).subscribe((res : any) =>{
        this.listEmploye=res.data.list;
        this.config = {
          itemsPerPage: 10,
          currentPage: 1,
         totalItems: res.data.total
        };
      })
    }else {
      this.serviceEmploy.getListEmployer(this.page).subscribe((res : any) =>{
        this.listEmploye=res.data.list;
        this.config = {
          itemsPerPage: 10,
          currentPage: 1,
         totalItems: res?.data?.total
        };

      })
    }

  }

  getImage(photo:string) {
    if(photo == null || !photo || photo ==="" || photo === "path photo"   ){
      return 'https://cdn1.benouaiche.com/wp-content/uploads/2018/12/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg'
    }else {
      return photo
    }
  }

  getRole(role) {
    if(role === "secretary") {
      return 'receptioniste'
    }
    else {
      return 'coach'
    }
  }


  changeStatus(id,status) {
    if(!status) {
      Swal.fire({
        title: 'Vous êtes sur ?',
        text: "vous êtes sur de bloquer cet employe ?!!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Non',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui'
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceEmploy.changeStatus(id, status).subscribe((res: any) => {
            this.getAllEmloyer(this.page)
          });
          Swal.fire(
            'Bloqué!',
            'cet employer est bloquée.',
            'success'
          )
        }
        else {
          this.getAllEmloyer(this.page)
        }
      })
    }
    else {
      this.serviceEmploy.changeStatus(id, status).subscribe((res: any) => {
        this.getAllEmloyer(this.page)
      });
    }


  }
  getPage(p) {
    this.page = p.toString();
    this.getAllEmloyer(this.page)
    }

  getStatus(status : boolean){
    if(status) {
      return 'disponible'
    }else {
      return 'pas disponible'
    }
 }



}
