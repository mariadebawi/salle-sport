import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  BASEURL=environment.basUrl;
 constructor(private http: HttpClient) { }

   getAllActivites() { return this.http.get(this.BASEURL+`activities`); }

   addActivity(data:any) {return this.http.post<any>(this.BASEURL+`activities`, data);}

   updateActivity(activity , id){  return this.http.put(this.BASEURL+'activities/'+id,activity) }

   changeStatus(id,status)  { return this.http.put(this.BASEURL+'activities'+'/'+id,{status:status});}

}
