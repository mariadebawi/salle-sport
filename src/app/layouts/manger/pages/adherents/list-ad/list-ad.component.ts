import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerModel } from 'src/app/models/gym.model';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-ad',
  templateUrl: './list-ad.component.html',
  styleUrls: ['./list-ad.component.scss']
})
export class ListAdComponent implements OnInit {
  adherentUpdated:ManagerModel ;
  listAdherent:ManagerModel[]=[] ;
  page='1';  closeResult = '';
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
 formAdherent: FormGroup;
 submitted = false;

 public labels: any = {
   previousLabel: '&nbsp;',
   nextLabel: '&nbsp;',
   screenReaderPaginationLabel: 'Pagination',
   screenReaderPageLabel: 'page',
   screenReaderCurrentLabel: `You're on page`
};
  currentUser:ManagerModel ;

  constructor(private serviceEmploy:ProfileService , private profileService :ProfileService ,private modalService: NgbModal , private formBuilder: FormBuilder ,) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;
    this.formAdherent = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    })

    this.getListAdherent(this.page);
  }

  get f() { return this.formAdherent.controls; }

  getListAdherent(page) {
    this.serviceEmploy.getAdherents(page).subscribe((res : any) =>{
      this.listAdherent=res.data.list;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: res?.data?.total
      };

    })
  }


  changeStatus(id,status) {
    if(!status) {
      Swal.fire({
        title: 'Vous êtes sur ?',
        text: "vous êtes sur de bloquer cet adherent ?!!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Non',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui'
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceEmploy.changeStatusAdherent(id, status).subscribe((res: any) => {
            this.getListAdherent(this.page);
          });
          Swal.fire(
            'Bloqué!',
            'cet adherent est bloquée.',
            'success'
          )
        }
        else {
          this.getListAdherent(this.page);
                }
      })
    }
    else {
      this.serviceEmploy.changeStatus(id, status).subscribe((res: any) => {
        this.getListAdherent(this.page);
       });
    }

  }


  getStatus(status : boolean){
    if(status) {
      return 'disponible'
    }else {
      return 'pas disponible'
    }
 }


 open(content ,  adherent?:ManagerModel) {

  if(adherent) {
    this.adherentUpdated = adherent ;
  }
  this.modalService.open(content).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


private getDismissReason(reason: any): string {
  this.onReset();
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


onReset() {
  this.submitted = false;
  this.formAdherent.reset();
}


addAdherent() {
  this.submitted = true;

  this.profileService.updateProfileFunction('adherent' ,this.formAdherent , 'addAdherent' )
    .subscribe(
      (res :any) => {
        if(res.success){
          Swal.fire(
            'Ajout	!',
            'l\'insertion est effectué avec success',
            'success'
          )
          this.getListAdherent(this.page)
        }
      }) ,error => {
        Swal.fire(
          'AJout	!',
          `erreur : ${error}` ,
          'error'
        )

   }
}

UpdateAdherent() {
  this.submitted = true;

  this.profileService.updateProfileFunction('adherent' ,this.formAdherent , 'editAdherent' , '' , this.adherentUpdated?.id )
    .subscribe(
      (res :any) => {
        if(res.success){
          Swal.fire(
            'modification	!',
            'la modification est effectué avec success',
            'success'
          )
          this.getListAdherent(this.page)
        }
      }) ,error => {
        Swal.fire(
          'modification	!',
          `erreur : ${error}` ,
          'error'
        )

   }
}


  getPage(p) {
    this.page = p.toString();
    this.getListAdherent(this.page);
  }


}
