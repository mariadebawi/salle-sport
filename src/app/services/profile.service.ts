import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }

 
  updateProfileFunction( profileRole : string , formProfile : FormGroup , photoProfile? : string) {
    console.log(formProfile.value)
    // stop here if form is invalid
    if (formProfile.invalid) {
      return;
    }

    const profileAdmin = {
        first_name : formProfile.value.first_name ,
        last_name: formProfile.value.last_name ,
        email: formProfile.value.email ,
        address: formProfile.value.address ,
        phone: formProfile.value.phone ,
        photo : photoProfile,
        role:profileRole
    } 

    return this.http.put(this.BASEURL+`auth/me`,{'profile': profileAdmin});
  }


  updatePAsswordAdmin( newPAssword) {
      return this.http.put(this.BASEURL+`auth/update_password`,{'newPAssword': newPAssword});

  }

}