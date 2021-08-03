import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoachsService {
  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }
  getAllCoach() { return this.http.get(this.BASEURL+`employees?role=coach`); }
}
