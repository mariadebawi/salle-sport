import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivityModel} from "../../../../../models/activity.model";
import {first} from "rxjs/operators";
import {OffersService} from "../../../../../services/offers.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-add-of',
  templateUrl: './add-of.component.html',
  styleUrls: ['./add-of.component.scss']
})
export class AddOfComponent implements OnInit {
  saveForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  allAvtivity:ActivityModel[];
  constructor(private _OfferSer:OffersService,private formBuilder: FormBuilder)
  {
  }
  ngOnInit(): void {
    this.getAllActivity()
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
  }
  get f() { return this.saveForm.controls; }


  getAllActivity()
  {
    this._OfferSer.getAllActivites().subscribe((res : any) =>{
      this.allAvtivity=res.data;
      console.log(res.data)
    })
  }

  reset(){
    this.saveForm.reset() ;
  }
 
  addNewTypeSypscritipn() {
    this.submitted = true;
    if (this.saveForm.invalid) {
      return;
    }
    
    this._OfferSer.addNewTypeSubscription(this.saveForm.value)
      .pipe(first())
      .subscribe(
        (res :any) => {
          if(res.success){
            Swal.fire(
              'Abonnement	!',
              'l\'insertion est effectué avec success',
              'success'
            )
          }
          else {
            Swal.fire(
              'Abonnement	!',
              `erreur : ${res.message}` ,
              'error'
            )
          }
        },
        error => {
          Swal.fire(
            'Abonnement	!',
            `erreur : ${error}` ,
            'error'
          )
        });
  }
  changeActivityId($event)
  {
    this.saveForm.controls['acitvity_id'].setValue($event.target.value)
  }

  changeUnit($event)
  {
    this.saveForm.controls['unit'].setValue($event.target.value)
  }
}
