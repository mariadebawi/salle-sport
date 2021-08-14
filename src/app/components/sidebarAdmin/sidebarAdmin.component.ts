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
      title: "dashboard",
      icon: "icon-chart-bar-32",
      class: ""
    },
    {
      path: "/admin/offers",
      title: "offers",
      icon: "icon-light-3",
      class: ""
    },
  {
    path: "/admin/gyms",
    title: "salles de sport",
    icon: "icon-components",
    class: ""
  },
  {
    path: "/admin/managers",
    title: "mangers",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/admin/subscriptions",
    title: "gestion de caisse",
    icon: "icon-single-02",
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
