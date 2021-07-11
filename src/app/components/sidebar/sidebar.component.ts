import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle?: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [

  {
    path: "coachs",
    title: "coachs",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "coachs",
    title: "adhérents",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "activities",
    title: "activities",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "activities",
    title: "offers",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "activities",
    title: "Receptionsites",
    icon: "icon-chart-pie-36",
    class: ""
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
