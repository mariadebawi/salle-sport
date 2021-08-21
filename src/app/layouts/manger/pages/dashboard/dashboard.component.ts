import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { CardsManager } from 'src/app/models/CardsManger.model';
import { SubscriptionAdherent } from 'src/app/models/SubscriptionAdherent.model';
import { StatsService } from 'src/app/services/stats.service';
@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
public CardsManager:CardsManager;
public subscriptionAdherentLast:SubscriptionAdherent[] = [];
public subscriptionAdherentFirst:SubscriptionAdherent[] = [];

  constructor( private _ServiceStats :StatsService) {}

  getStatus(status : boolean){
    if(status) {
      return 'accepter'
    }else {
      return 'pas en cours'
    }
 }
 getlogo(logo:string)
 {

   if(logo==null || logo=="")
   {
     return "https://img2.freepng.fr/20180714/hxu/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f52aa71.9002514115315676633386.jpg";
   }
   else{
     return logo;
   }
 }
 getPhone(phone:string)
 {

   if(phone==null || phone=="")
   {
     return "------";
   }
   else{
     return phone;
   }
 }
  getUnit(unit : string) {
    if(unit === 'day') { return 'jours' ;}
  if(unit === 'month') { return 'mois' ;}
  if(unit === 'year') { return 'année' ;}
 }

 getStatsManager()
  {
    this._ServiceStats.getManagerStats().subscribe((res:any)=>
    {
      this.CardsManager=res.data.cards;
      this.subscriptionAdherentLast=res.data?.tables?.last_add_list;
      this.subscriptionAdherentFirst=res.data?.tables?.last_terminated_list;
    })
  }
  ngOnInit() {
    this.getStatsManager()
  }
}
