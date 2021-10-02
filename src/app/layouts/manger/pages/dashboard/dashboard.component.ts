import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CardsManager } from 'src/app/models/CardsManger.model';
import { SubscriptionAdherent } from 'src/app/models/SubscriptionAdherent.model';
import { subscriptionGym } from 'src/app/models/subscriptionsGym.model';
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
public barChartOptions: ChartOptions = {
  responsive: true,
};0
public barChartLabels: Label[] = ['2020-08', '2020-09', '2020-10', '2020-11', '2020-12', '2021-01', '2021-02' ,' 2021-03'  ,' 2021-04' ,' 2021-05' ,' 2021-06' ,' 2021-07' ,' 2021-08'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
public barChartColors: Color[] = [
  { backgroundColor: '#1d8cf8'
  },
]
public barChartData: ChartDataSets[] = [
  { data: [], label: 'Année/Mois' },
];

public ListSubscriptionGymLast:subscriptionGym;
public ListSubscriptionGymFirst:subscriptionGym;
public lineChartData: ChartDataSets[] = [
  { data: [], label: 'Jours' },
];
public lineChartLabels: Label[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
public lineChartOptions = {
  responsive: true,
  scales: {
    xAxes: [{
      ticks: {
        fontColor: '#fff',
      },
    }],
    yAxes: [{
      ticks: {
        fontColor: '#fff',
      },
      scaleLabel: {
        fontColor: '#fff',
      }
    }]
  },
  legend: {
    display: true,
    labels: {
      fontColor: '#ff8d72', // legend color (can be hexadecimal too)
    },
  }
}
public lineChartColors: Color[] = [
  {
    borderColor: '#ff8d72',
    backgroundColor: 'transparent',
  },
];
public lineChartLegend = true;
public lineChartType = 'line';
public lineChartPlugins = [];
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
      this.lineChartData.forEach((dat :any) => {
        dat.data=Object.values(res.data.curve.number_subscription_of_day) ;
    })
    this.barChartData.forEach((dat :any) => {
     dat.data=Object.values(res.data.curve.price_of_months);    
   })

      this.CardsManager=res.data.cards;
      this.subscriptionAdherentLast=res.data?.tables?.last_add_list;
      this.subscriptionAdherentFirst=res.data?.tables?.last_terminated_list;
    })
  }
  ngOnInit() {
    this.getStatsManager()
  }
}
