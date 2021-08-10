import { Component, OnInit } from '@angular/core';
import {ActivityModel} from '../../../../../models/activity.model';
import { UserObject } from 'src/app/models/coach.model';
import {CoachsService} from '../../../../../services/coachs.service';
import {ActivityService} from '../../../../../services/activity.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs/operators";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  saveForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  allcoachs:UserObject[];
  constructor(private _CoachServ:CoachsService,private _ActivitySer:ActivityService,private formBuilder: FormBuilder  ) { }

  ngOnInit(): void {
    this.GetListCoach();
    this.saveForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      coach_id: [1, [Validators.required]],
    });
  }
  get f() { return this.saveForm.controls; }
  GetListCoach()
  {
    this._CoachServ.getAllCoach().subscribe((res : any) =>{
      this.allcoachs=res.data;
    })
  }

  save() {
    console.log(this.saveForm.value)
    this.submitted = true;
    // stop here if form is invalid
    if (this.saveForm.invalid) {
      return;
    }
    this._ActivitySer.add(this.saveForm.value)
      .pipe(first())
      .subscribe(
        (res :any) => {
          if (res.success) {
            Swal.fire(
              'Abonnement	!',
              'l\'insertion est effectué avec success.',
              'success'
            )
          } else {
            Swal.fire(
              'Abonnement	!',
              `erreur : ${res.message}`,
              'error'
            )
          }
        })
  }
  changeCoachId($event)
  {
    this.saveForm.controls['coach_id'].setValue($event.target.value)
  }
}
