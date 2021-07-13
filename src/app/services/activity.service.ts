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
        deleteActivity(id)  { return this.http.delete(this.BASEURL+'activities'+'/'+id); }
        changeStatus(id,status)  { return this.http.post(this.BASEURL+'activities'+'/'+id,status);}
      }
