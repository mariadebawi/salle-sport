import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }
  getAdminStats()
  {
    return this.http.get(this.BASEURL+`stats/admin`);
  }
  getManagerStats()
  {
    return this.http.get(this.BASEURL+`stats/manager`);
  }

  getStatiSubsManager() {
    return this.http.get(this.BASEURL+`subscriptions/get_settings`);
  }
}
