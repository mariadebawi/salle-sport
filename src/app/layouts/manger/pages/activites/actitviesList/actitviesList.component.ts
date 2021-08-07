import { Component, OnInit } from '@angular/core';
import { ActivityModel } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity.service';
@Component({
  selector: 'app-actitviesList',
  templateUrl: './actitviesList.component.html',
  styleUrls: ['./actitviesList.component.scss']
})
export class ActitviesListComponent implements OnInit {
allAvtivity:ActivityModel[];
  constructor(private _activityServ:ActivityService) { }

  ngOnInit() {
    this._activityServ.getAllActivites().subscribe((res : any) =>{
     this.allAvtivity=res.data.list;
    })
  }

  delete(id) {
this._activityServ.deleteActivity(id).subscribe((res : any) =>{
   this.ngOnInit()
    });
  }
}
