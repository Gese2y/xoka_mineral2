import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import { Guid } from 'guid-typescript';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mining-revenue-collected-from-licensee',
  templateUrl: './mining-revenue-collected-from-licensee.component.html',
  styleUrls: ['./mining-revenue-collected-from-licensee.component.css']
})
export class MiningRevenueCollectedFromLicenseeComponent implements OnInit {
licenseForm: FormGroup;
isEdited:boolean=false
  license: Object;
  Isnodata: boolean=true;
  havedata:boolean=false
  @Output() saveDataCompletedAA = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    private notificationsService: NotificationsService,) { }

  ngOnInit() {
     this.licenseForm = this.formBuilder.group({
      id: [''],
      name_of_Licensee: [''],
      license_No: [''],
      free_equity_birr: [''],
      license_issue_From: [''],
      license_issue_to: [''],
      license_issue_Qarshii: [''],
      royaliti_Volume: [''],
      royaliti_Tot_sale: [''],
      royalitii: [''],
      land_rent_From: [''],
      land_rent_to: [''],
      land_rent_qarshi: [''],
      license_renew_From: [''],
      license_renew_to: [''],
      license_renew_qarshii: [''],
      cadastre_payment: [''],
      receipt_sale: [''],
      total: [''],
      revenue_Receipt_No: [''],
      date_received: ['']
    });
    this.getAll()
  }
   save(): void {
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
  this.havedata=true
        this.licenseForm.patchValue( { id: Guid.create().toString() })
    console.log(this.licenseForm.value);


    this.service.postMining_Revenue_collected_from_licensee(this.licenseForm.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
        this.havedata=false
         this.saveDataCompletedAA.emit();
       // this.serviceComponent.disablefins=false
      this.isEdited = true
      this.getAll();
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
        this.havedata=false
    }
    );
  }
  getAll() {
   this.service.getMining_Revenue_collected_from_licensee().subscribe(res => {
      this.license = res
        if(res){
        this.Isnodata=false
      }
    })
  }
   onRowSelect(event) {
      this.havedata=true
    this.isEdited=true
    console.log('event.data', event.data);
    this.service.getMining_Revenue_collected_from_licenseeId(event.data.id).subscribe(res => {
      this.license = res
      if(res){
  this.havedata=false
        this.licenseForm.patchValue({
          id: res[0].id,
      name_of_Licensee: res[0].name_of_Licensee,
      license_No: res[0].license_No,
      free_equity_birr: res[0].free_equity_birr,
      license_issue_From: res[0].license_issue_From,
      license_issue_to: res[0].license_issue_to,
      license_issue_Qarshii: res[0].license_issue_Qarshii,
      royaliti_Volume: res[0].royaliti_Volume,
      royaliti_Tot_sale: res[0].royaliti_Tot_sale,
      royalitii: res[0].royalitii,
      land_rent_From: res[0].land_rent_From,
      land_rent_to: res[0].land_rent_to,
      land_rent_qarshi: res[0].land_rent_qarshi,
      license_renew_From: res[0].license_renew_From,
      license_renew_to: res[0].license_renew_to,
      license_renew_qarshii: res[0].license_renew_qarshii,
      cadastre_payment: res[0].cadastre_payment,
      receipt_sale: res[0].receipt_sale,
      total: res[0].total,
      revenue_Receipt_No: res[0].revenue_Receipt_No,
      date_received: formatDate(res[0].date_received,"yyyy-MM-dd", "en")
        });
      }
    })
   
  }
   delete(): void {
      this.havedata=true
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
    console.log(this.licenseForm.value);
      this.service.deleteMining_Revenue_collected_from_licensee(this.licenseForm.get('id').value ).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", 'deleted', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
        this.havedata=false
      this.getAll();
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
        this.havedata=false
    }
    );
  }
   update(): void {
      this.havedata=true
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
    console.log(this.licenseForm.value);
     this.service.putMining_Revenue_collected_from_licensee(this.licenseForm.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Update", '', {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
        this.havedata=false
       // this.serviceComponent.disablefins=false
      this.isEdited = true
      this.getAll();
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
        this.havedata=false
    }
    );
  }
   new(): void {
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
       this.isEdited = false
       this.licenseForm.reset();
  }
  
}
