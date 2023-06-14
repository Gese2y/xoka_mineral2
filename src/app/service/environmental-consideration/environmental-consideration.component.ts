import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-environmental-consideration',
  templateUrl: './environmental-consideration.component.html',
  styleUrls: ['./environmental-consideration.component.css']
})
export class EnvironmentalConsiderationComponent implements OnInit {
  environmentalForm: FormGroup;
isEdited:boolean=false
  license: Object;
  Isnodata: boolean=true;
  havedata:boolean=false
  constructor(private formBuilder: FormBuilder, private service: ServiceService,
    private notificationsService: NotificationsService,) { }

  ngOnInit(): void {
    this.environmentalForm = this.formBuilder.group({
     id: [''],
      name_of_Licensee:[''],
      license_No: [''],
      year_of_production_start_up: [''], 
      land:[''],
      air: [''],
      water: [''],
      biotic:[''],
      community_Development_Fund: [''],
      reclamation_fund: [''],
      year:[''], 
      job_opportunity: [''],
      kind_of_contribution: [''],
      supporting_citizen:[''],
      cash_contribution_for_local_development: [''],
      share_its_own_infrastructures: [''],
      reclaimed_area: ['']
    });
    this.getAll()
  }
   save(): void {
    // H  this.havedata=trueandle form submission here, you can access the form values using `this.environmentalForm.value`

        this.environmentalForm.patchValue( { id: Guid.create().toString() })
    console.log(this.environmentalForm.value);


    this.service.postEnvironmental_Consideration(this.environmentalForm.value).subscribe((res) => {
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
   this.service.getEnvironmental_Consideration().subscribe(res => {
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
    this.service.getEnvironmental_ConsiderationId(event.data.id).subscribe(res => {
      this.license = res
      if(res){
  this.havedata=false
        this.environmentalForm.patchValue({
      id: res[0].id,
      name_of_Licensee: res[0].name_of_Licensee,
      license_No: res[0].license_No,
      year_of_production_start_up: formatDate(res[0].year_of_production_start_up,"yyyy-MM-dd", "en"), 
      land: res[0].land,
      air: res[0].air,
      water: res[0].water,
      biotic: res[0].biotic,
      community_Development_Fund: res[0].community_Development_Fund,
      reclamation_fund: res[0].reclamation_fund,
      year:formatDate(res[0].year,"yyyy-MM-dd", "en"), 
      job_opportunity: res[0].job_opportunity,
      kind_of_contribution: res[0].kind_of_contribution,
      supporting_citizen: res[0].supporting_citizen,
      cash_contribution_for_local_development: res[0].cash_contribution_for_local_development,
      share_its_own_infrastructures: res[0].share_its_own_infrastructures,
      reclaimed_area: res[0].reclaimed_area
        });
      }
    })
   
  }
   delete(): void {
      this.havedata=true
    // Handle form submission here, you can access the form values using `this.environmentalForm.value`
    console.log(this.environmentalForm.value);
      this.service.deleteEnvironmental_Consideration(this.environmentalForm.get('id').value ).subscribe((res) => {
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
    // Handle form submission here, you can access the form values using `this.environmentalForm.value`
    console.log(this.environmentalForm.value);
     this.service.putEnvironmental_Consideration(this.environmentalForm.value).subscribe((res) => {
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
    // Handle form submission here, you can access the form values using `this.environmentalForm.value`
       this.isEdited = false
       this.environmentalForm.reset();
  }
  
}
