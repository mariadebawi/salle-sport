import { Component, OnInit } from "@angular/core";
import { CardsAdmin } from "src/app/models/cards_admin.modal";
import { subscriptionGym } from "src/app/models/subscriptionsGym.model";
import { StatsService } from "src/app/services/stats.service";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {Color, Label } from 'ng2-charts';
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
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
  public CardsAdmin:CardsAdmin;
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
  getStatsAdmin()
  {
    this._ServiceStats.getAdminStats().subscribe((res:any)=>
    {
       this.lineChartData.forEach((dat :any) => {
       dat.data=Object.values(res.data.curve.number_subscription_of_day) ;
   })
   this.barChartData.forEach((dat :any) => {
    dat.data=Object.values(res.data.curve.price_of_months);    
  })
      this.CardsAdmin=res.data.cards;
      this.ListSubscriptionGymLast=res.data.tables.last_add_list;
      this.ListSubscriptionGymFirst=res.data.tables.last_terminated_list;
    })
  }
  getStatus(status : boolean){
    if(status) {
      return 'accepter'
    }else {
      return 'pas en cours'
    }
 }
 getlogo(photo:string)
 { if(photo == null || !photo || photo ===""  )
   {
     return "https://img2.freepng.fr/20180714/hxu/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f52aa71.9002514115315676633386.jpg";
   }
   else{
     return photo;
   }
 }

  getUnit(unit : string) {
    if(unit === 'day') { return 'jours' ;}
  if(unit === 'month') { return 'mois' ;}
  if(unit === 'year') { return 'année' ;}
 }
  ngOnInit() {
   this.getStatsAdmin();


  }

}
