import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import { Guid } from 'guid-typescript';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mineral-production',
  templateUrl: './mineral-production.component.html',
  styleUrls: ['./mineral-production.component.css']
})
export class MineralProductionComponent implements OnInit {
licenseForm: FormGroup;
isEdited:boolean
  license: Object;
  Isnodata: boolean=true;
havedata:boolean=false
constructor(private formBuilder: FormBuilder,
  private service: ServiceService,
    private notificationsService: NotificationsService,) { }

  ngOnInit() {
     this.licenseForm = this.formBuilder.group({
      id: [''],
      zonal_officee: [''],
      name_of_Representative: [''],
      date_Requested: [''],
      date_issued: [''],
      no_of_receipt_From: [''],
      no_of_receipt_to: [''],
      no_of_pad: [''],
      ref_No_of_requesting_letter: [''],
      no_of_receipt_Audited_and_returned_From: [''],
      no_of_receipt_Audited_and_returned_to: ['']
    });
    this.getAll()
    this.new()
  }
   save(): void {
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
  this.havedata=true
        this.licenseForm.patchValue( { id: Guid.create().toString()  })
    console.log(this.licenseForm.value);


    this.service.postMineral_production(this.licenseForm.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
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
  getAll() {
   this.service.getMineral_production().subscribe(res => {
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
    this.service.getMineral_productionId(event.data.id).subscribe(res => {
      this.license = res
      if(res){
  this.havedata=false
        this.licenseForm.patchValue({
        id: res[0].id,
      zonal_officee: res[0].zonal_officee,
      name_of_Representative: res[0].name_of_Representative,
      date_Requested:formatDate(res[0].date_Requested,"yyyy-MM-dd", "en"), 
      date_issued: formatDate(res[0].date_issued,"yyyy-MM-dd", "en"), 
      no_of_receipt_From: res[0].no_of_receipt_From,
      no_of_receipt_to: res[0].no_of_receipt_to,
      no_of_pad: res[0].no_of_pad,
      ref_No_of_requesting_letter: res[0].ref_No_of_requesting_letter,
      no_of_receipt_Audited_and_returned_From: res[0].no_of_receipt_Audited_and_returned_to,
      no_of_receipt_Audited_and_returned_to: res[0].no_of_receipt_Audited_and_returned_to,
        });
      }
    })
   
  }
   delete(): void {
      this.havedata=true
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
    console.log(this.licenseForm.value);
      this.service.deleteMineral_production(this.licenseForm.get('id').value ).subscribe((res) => {
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
     this.service.putMineral_production(this.licenseForm.value).subscribe((res) => {
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
        this.licenseForm.patchValue( {  zonal_officee: Guid.create().toString() })
  }
  

}
