import { Component, OnInit } from '@angular/core';
import {ActivityModel} from '../../../../../models/activity.model';
import {ActivityService} from '../../../../../services/activity.service';
import { UserObject } from 'src/app/models/coach.model';
import {CoachsService} from '../../../../../services/coachs.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  allcoachs:UserObject[];
  constructor(private _CoachServ:CoachsService) { }

  ngOnInit(): void {
    this.GetListCoach();
  }
  GetListCoach()
  {
    this._CoachServ.getAllCoach().subscribe((res : any) =>{
      this.allcoachs=res.data;
      console.log(this.allcoachs)
    })
  }
}
