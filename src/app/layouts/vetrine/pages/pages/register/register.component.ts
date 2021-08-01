import { Component, OnInit } from '@angular/core';
import { OffersModel } from 'src/app/models/offers.model';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	urlSalle: any; 
	urlDirector:any;
	urlpayment_receipt:any;
	msg = "";
	offreList : OffersModel[] = [] ;

  constructor(private offreService : OffersService) { }

  ngOnInit() {
	this.getOffreList()
  }

  getOffreList() {
    this.offreService.getAlOffers().subscribe((res:any)=>{
		res.data.forEach(e => {
			if(e.status) {
				this.offreList.push(e);
			}
		});		
	  })
  }

  getUnit(unit : string) {
     if(unit === 'day') { return 'jours' ;}
	 if(unit === 'mouth') { return 'mois' ;}
	 if(unit === 'year') { return 'année' ;}
  }

	selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
            this.urlSalle= reader.result; 
		}
	}

  selectFilePreview(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
      this.urlDirector= reader.result; 
		}
	}


  selectFilePrevStyle(event){ 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
      this.urlpayment_receipt= reader.result; 
		}
	}

}
