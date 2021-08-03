import { Component, OnInit } from '@angular/core';
import {ActivityModel} from '../../../../../models/activity.model';
import { UserObject } from 'src/app/models/coach.model';
import {CoachsService} from '../../../../../services/coachs.service';
import {ActivityService} from '../../../../../services/activity.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs/operators";

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
      console.log(this.allcoachs)
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
        data => {
          console.log('mergil');
        },
        error => {
          this.error = error;
        });
  }
  changeCoachId($event)
  {
    this.saveForm.controls['coach_id'].setValue($event.target.value)
  }
}
