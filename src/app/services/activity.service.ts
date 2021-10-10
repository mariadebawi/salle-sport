import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  BASEURL=environment.basUrl;
 constructor(private http: HttpClient) { }

   getAllActivites(page) {
     const params = new HttpParams()
       .set('page', page);
   return this.http.get(this.BASEURL+`activities` , {params:params}); }

   addActivity(data:any) {return this.http.post<any>(this.BASEURL+`activities`, data);}

   updateActivity(activity , id){  return this.http.put(this.BASEURL+'activities/'+id,activity) }

   changeStatus(id,status)  { return this.http.put(this.BASEURL+'activities'+'/'+id,{status:status});}

}
