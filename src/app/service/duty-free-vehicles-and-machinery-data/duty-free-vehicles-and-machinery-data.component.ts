import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import { Guid } from 'guid-typescript';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-duty-free-vehicles-and-machinery-data',
  templateUrl: './duty-free-vehicles-and-machinery-data.component.html',
  styleUrls: ['./duty-free-vehicles-and-machinery-data.component.css']
})
export class DutyFreeVehiclesAndMachineryDataComponent implements OnInit {
licenseForm: FormGroup;

  isEdited:boolean=false
  license:any
  Isnodata:boolean=true
  havedata:boolean=false
  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    private notificationsService: NotificationsService,) { }

  ngOnInit() {
     this.licenseForm = this.formBuilder.group({
      iD:[''],
      name_of_Licensee: [''],
      license_No: [''],
      date_issued: [''],
      date_Requested: [''],
      type_of_good_requested: [''],
      model_No: [''],
      chasis_No: [''],
      ref_No_of_supporting_letter: ['']
    });
    this.getAll()
  }
 save(): void {
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
  this.havedata=true
        this.licenseForm.patchValue( { iD: Guid.create().toString() })
    console.log(this.licenseForm.value);


    this.service.postDuty_Free_vehicles_and_machinery_data(this.licenseForm.value).subscribe((res) => {
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
   this.service.getDuty_Free_vehicles_and_machinery_data().subscribe(res => {
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
    this.service.getDuty_Free_vehicles_and_machinery_dataId(event.data.id).subscribe(res => {
      this.license = res
      if(res){
  this.havedata=false
        this.licenseForm.patchValue({
           iD:res[0].id,
          name_of_Licensee: res[0].name_of_Licensee,
          license_No: res[0].license_No,
          date_issued: formatDate(res[0].date_issued,"yyyy-MM-dd", "en"),
          date_Requested:  formatDate(res[0].date_Requested,"yyyy-MM-dd", "en"),
          type_of_good_requested: res[0].type_of_good_requested,
          model_No: res[0].model_No,
          chasis_No: res[0].chasis_No,
          ref_No_of_supporting_letter: res[0].ref_No_of_supporting_letter
        
        });
      }
    })
   
  }
   delete(): void {
      this.havedata=true
    // Handle form submission here, you can access the form values using `this.licenseForm.value`
    console.log(this.licenseForm.value);
      this.service.deleteDuty_Free_vehicles_and_machinery_data(this.licenseForm.get('id').value ).subscribe((res) => {
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
     this.service.putDuty_Free_vehicles_and_machinery_data(this.licenseForm.value).subscribe((res) => {
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
