import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivityModel } from 'src/app/models/activity.model';
import { TypeSubscriptionModel } from 'src/app/models/offers.model';
import { OffersService } from 'src/app/services/offers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editOf',
  templateUrl: './editOf.component.html',
  styleUrls: ['./editOf.component.scss']
})
export class EditOfComponent implements OnInit {
  saveForm: FormGroup;
  submitted = false;id:number;
  typeSubscrptionUpdate:TypeSubscriptionModel ;
  allAvtivity:ActivityModel[];

  constructor(private _OfferSer:OffersService,private formBuilder: FormBuilder ,     private _route: ActivatedRoute, )
  {
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = +params.id;
    });

    this.saveForm =
      this.formBuilder.group({
          name: ['', [Validators.required]],
          description: [''],
          activity_id: ['', [Validators.required]],
          duration :['',[Validators.required]],
          unit:['',Validators.required],
          number_of_sessions:['',Validators.required],
          price:['',Validators.required]
    });

    this.getSubscrption(this.id) ;
    this.getAllActivity() ;
  }
  get f() { return this.saveForm.controls; }

  getSubscrption(id:number) {
    this._OfferSer.getTypeSubscrptionById(id).subscribe((res : any) =>{
      if(res.success) {
        this.typeSubscrptionUpdate = res.data;
        console.log(this.typeSubscrptionUpdate);
        
      }

    })
  }


  getAllActivity()
  {
    this._OfferSer.getAllActivites().subscribe((res : any) =>{
      this.allAvtivity=res.data;
      console.log(res.data)
    })
  }


  update() {
    this._OfferSer.changeStatusTypeSub(this.id, status).subscribe((res: any) => {

    })

  }


  updateTypeSypscritipn() {
    this.submitted = true;
    if (this.saveForm.invalid) {
        return;
    }
    
    this._OfferSer.updateTypeSub(this.id, this.saveForm.value).subscribe((res: any) => {
      if(res.success) {
        Swal.fire(
          'Modification !',
          'Votre offre est modifié avec succée.',
          'success'
        )  
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
