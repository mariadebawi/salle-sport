import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../../../../services/offers.service';
import { OffersModel } from 'src/app/models/offers.model';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
   allOffers:OffersModel[];
   offreUpdated:OffersModel;
   closeResult = '';
   page="1" ;
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
   offreForm: FormGroup;
   submitted = false;
 
  public labels: any = {
      previousLabel: '&nbsp;',
      nextLabel: '&nbsp;',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
 
  constructor(private _offersService:OffersService ,  private modalService: NgbModal , private formBuilder: FormBuilder, 
    ) { }


  ngOnInit(): void {

    this.GetAllOffers();

    this.offreForm = this.formBuilder.group({
      unit:['', [Validators.required]],
      duration:['', [Validators.required]],
      name:['', [Validators.required]],
      price:['', [Validators.required]],
    });
  }

  GetAllOffers(){
    this._offersService.getAlOffers(this.page).subscribe((res:any)=>{
      this.allOffers=res.data;
  
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: this.allOffers.length
      };
    })
  }


  open(content , offre?:OffersModel) {
    if(offre) {
      this.offreUpdated = offre ;
    }
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  UpdateOffre() {
    this.submitted = true;
    if (this.offreForm.invalid) {
        return;
    }
    
    const offre  = {
      name: this.offreForm.value.name,
      duration:  this.offreForm.value.duration,
      price:  this.offreForm.value.price,
      unit:  this.offreForm.value.unit,
      status: this.offreUpdated.status,
  }
    this._offersService.updateOffre( offre , this.offreUpdated.id).subscribe((res : any) => {
      if(res.success) {
        Swal.fire(
          'Modification !',
          'Votre offre est modifié avec succée.',
          'success'
        )  
        this.GetAllOffers() ;
      }
     
    },
    error => {
      Swal.fire(
        'Modification!',
        `<b>Erreur :</b> ${error}` ,
        'error'
        )
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
    this.offreForm.reset();
}

get f() { return this.offreForm.controls; }

addOffre() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.offreForm.invalid) {return;}

  const newOffre = {
      name: this.offreForm.value.name,
      duration:  this.offreForm.value.duration,
      price:  this.offreForm.value.price,
      unit:  this.offreForm.value.unit,
      status: true,
  }
  this._offersService.addNewOffre(newOffre)
  .pipe(first())
  .subscribe(
    (res :any) => {
    if(res.success){
     Swal.fire(
       'Offre	!',
       'votre Offre a été effectuée avec succés.',
       'success'
       )

      this.GetAllOffers();
      this.onReset() ;
    }
    },
    error => {
     Swal.fire(
       'Abonnement	!',
       `<b>Erreur :</b> ${error}` ,
       'error'
       )
    });

}

  changeStatus(id,status) {
    if(!status) {
      Swal.fire({
        title: 'Vous êtes sur ?',
        text: "vous êtes sur de bloquer cet offre ?!!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Non',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui'
      }).then((result) => {
        if (result.isConfirmed) {
          this._offersService.changeStatus(id, status).subscribe((res: any) => {
            this.GetAllOffers();
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
      this._offersService.changeStatus(id, status).subscribe((res: any) => {
        this.GetAllOffers();
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

  getDate(date) {
    return moment(date).format('DD-MM-YYYY')
  }


  getUnit(unit : string) {
    if(unit === 'day') { return 'jours' ;}
  if(unit === 'month') { return 'mois' ;}
  if(unit === 'year') { return 'année' ;}
 }

 getPage(p) {   
  this.page = p.toString();
  }

}
