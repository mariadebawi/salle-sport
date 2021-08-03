import { Component, OnInit } from '@angular/core';
import {UserObject} from "../../../../../models/coach.model";
import {CoachsService} from "../../../../../services/coachs.service";

@Component({
  selector: 'app-add-of',
  templateUrl: './add-of.component.html',
  styleUrls: ['./add-of.component.scss']
})
export class AddOfComponent implements OnInit {

 coachList : UserObject[] = [] ;
  constructor(private coachService : CoachsService)
  {
    this.getAllCoach();
  }
  ngOnInit(): void {
  }
  getAllCoach() {
    this.coachService.getAllCoach().subscribe((res: any) => {
      this.coachList = res.data;
    });
  }
}
