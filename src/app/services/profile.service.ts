import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }
   

  getListEmployer(page:string , role:string) {
      let params = new HttpParams().set('role', role);
      return this.http.get(this.BASEURL+`employees`, { params: params } );
  }

  getEmployById(id:number) {
    return this.http.get(this.BASEURL+`employees/`+id);
}


  changeStatus(id,status)
  {
    return this.http.put(this.BASEURL+`employees/`+id,{'status':status});
  }

 
  updateProfileFunction( profileRole : string , formProfile : FormGroup , whatDO :string, photoProfile? : string , id?:number ) {
    if (formProfile.invalid) {
      return;
    }

    if(formProfile.value.newPassword && formProfile.value.newPassword !== '') {        
        const  updatePass = {
          newPassword:formProfile.value.newPassword, 
          oldPassword:formProfile.value.oldPassword
        }
       return this.http.put(this.BASEURL+`auth/update_password`,updatePass) ;
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

    switch (whatDO) {
      case 'updateAdmin':
        return this.http.put(this.BASEURL+`auth/me`, profileAdmin);
        case 'addEmployer':
          return this.http.post(this.BASEURL+`employees`, profileAdmin);
          case 'ediyEmploy':
            return this.http.put(this.BASEURL+`employees/`+id, profileAdmin);
          
      default:
        break;
    }
  }


}