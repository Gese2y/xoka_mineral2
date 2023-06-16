import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import { Guid } from 'guid-typescript';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-licensee-mineral-production-inspection',
  templateUrl: './licensee-mineral-production-inspection.component.html',
  styleUrls: ['./licensee-mineral-production-inspection.component.css']
})
export class LicenseeMineralProductionInspectionComponent implements OnInit {
 licenseForm: FormGroup;
 license:any
 isEdited:boolean=false
  Isnodata: boolean=true;
havedata:boolean=false
@Output() saveDataCompletedAA = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    private notificationsService: NotificationsService,) { }

  ngOnInit() {
     this.licenseForm = this.formBuilder.group({
      id: [''],
      license_No: [''],
      date_requested: [''],
      date_issued: [''],
      no_of_receipt_From: [''],
      no_of_receipt_to: [''],
      no_of_pad: [''],
      name_of_representative: [''],
      ref_No_of_requesting_letter: [''],
      no_of_receipt_Audited_and_returned_From: [''],
      no_of_receipt_Audited_and_returned_to: ['']
    });
    this.getAll();
  }
     save(): void {
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
  this.havedata=true
        this.licenseForm.patchValue( { id: Guid.create().toString() })
    console.log(this.licenseForm.value);


    this.service.postLicensee_Mineral_production_inspection(this.licenseForm.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
       this.saveDataCompletedAA.emit();
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
  getAll() {
   this.service.getLicensee_Mineral_production_inspection().subscribe(res => {
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
    this.service.getLicensee_Mineral_production_inspectionId(event.data.id).subscribe(res => {
      this.license = res
      if(res){
  this.havedata=false
        this.licenseForm.patchValue({
           id: res[0].id,
      license_No: res[0].license_No,
      date_requested: formatDate(res[0].date_requested,"yyyy-MM-dd", "en"), 
      date_issued: formatDate(res[0].date_issued,"yyyy-MM-dd", "en"), 
      no_of_receipt_From: res[0].no_of_receipt_From,
      no_of_receipt_to: res[0].no_of_receipt_to,
      no_of_pad: res[0].no_of_pad,
      name_of_representative: res[0].name_of_representative,
      ref_No_of_requesting_letter: res[0].ref_No_of_requesting_letter,
      no_of_receipt_Audited_and_returned_From: res[0].no_of_receipt_Audited_and_returned_From,
      no_of_receipt_Audited_and_returned_to: res[0].no_of_receipt_Audited_and_returned_to,
        });
      }
    })
   
  }
   delete(): void {
      this.havedata=true
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
    console.log(this.licenseForm.value);
      this.service.deleteLicensee_Mineral_production_inspection(this.licenseForm.get('id').value ).subscribe((res) => {
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
     this.service.putLicensee_Mineral_production_inspection(this.licenseForm.value).subscribe((res) => {
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
