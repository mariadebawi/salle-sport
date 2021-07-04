import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle?: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "manager",

    icon: "icon-chart-pie-36",
    class: ""
  },
];

@Component({
  selector: 'app-sidebarAdmin',
  templateUrl: './sidebarAdmin.component.html',
  styleUrls: ['./sidebarAdmin.component.scss']
})
export class SidebarAdminComponent implements OnInit {
  menuItems: any[];

  constructor() { }

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
