import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { ActivityModel } from 'src/app/models/activity.model';
import { ManagerModel } from 'src/app/models/gym.model';
import { ActivityService } from 'src/app/services/activity.service';
import { CoachsService } from 'src/app/services/coachs.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actitviesList',
  templateUrl: './actitviesList.component.html',
  styleUrls: ['./actitviesList.component.scss']
})
export class ActitviesListComponent implements OnInit {
  allAvtivity:ActivityModel[];
  activityForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';activityUpdated:ActivityModel;
  allcoachs:ManagerModel[];
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

  public labels: any = {
    previousLabel: '&nbsp;',
    nextLabel: '&nbsp;',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
};

  currentUser : ManagerModel ;
  
  constructor(private _activityServ:ActivityService ,private _CoachServ:CoachsService, private modalService: NgbModal , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;

    this.getALLactivities();
    this.GetListCoach();
    this.activityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      coach_id: ['', [Validators.required]],
    });

  }

  getALLactivities(){
    this._activityServ.getAllActivites().subscribe((res : any) =>{
      this.allAvtivity=res.data.list;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: this.allAvtivity.length
      };
     })
  }

  get f() { return this.activityForm.controls; }

  getPage(p) {   
    this.page = p.toString();
    }

    getDate(date) {
      return moment(date).format('DD-MM-YYYY')
    }

    
  GetListCoach()
  {
    this._CoachServ.getAllCoach().subscribe((res : any) =>{
      this.allcoachs=res.data;
    })
  }

  changeStatus(id,status) {
    if(status) {
      Swal.fire({
        title: 'Vous êtes sur ?',
        text: "vous êtes sur de bloquer cet activitée ?!!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Non',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui'
      }).then((result) => {
        if (result.isConfirmed) {
          this._activityServ.changeStatus(id, status).subscribe((res: any) => {
            this.getALLactivities();
            });
          Swal.fire(
            'Bloqué!',
            'cet activitée est bloquée.',
            'success'
          )
        }
        else {
          this.getALLactivities();
        }
      })
    }
    else {
      this._activityServ.changeStatus(id, status).subscribe((res: any) => {
        this.getALLactivities();
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

  // delete(id) {
  //     this._activityServ.deleteActivity(id).subscribe((res : any) =>{
  //  this.ngOnInit()
  //   });
  // }


  open(content ,  activity?:ActivityModel) {
  
    if(activity) {
      this.activityUpdated = activity ;
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
    this.activityForm.reset();
}


addActivity() {
  this.submitted = true;
  if (this.activityForm.invalid) {
    return;
  }
  this._activityServ.addActivity(this.activityForm.value)
    .pipe(first())
    .subscribe(
      (res :any) => {
        if (res.success) {
          Swal.fire(
            'Ajout !',
            'l\'ajout est effectué avec success.',
            'success'
          )
          this.getALLactivities() ;
        } 
      } , error => {
          Swal.fire(
            'Ajout!',
            `erreur : ${error}`,
            'error'
          )

      })
}


updateActivity() {
  this.submitted = true;
  if (this.activityForm.invalid) {
      return;
  }
  
  this._activityServ.updateActivity( this.activityForm.value , this.activityUpdated.id).subscribe((res : any) => {
    if(res.success) {
      Swal.fire(
        'Modification !',
        'Votre activitée est modifié avec succée.',
        'success'
      )  
      this.getALLactivities() ;
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

}
