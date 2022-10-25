import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BusinessOrganizationTypeService } from './business-organization-type.service';

@Component({
  selector: 'app-business-organization-type',
  templateUrl: './business-organization-type.component.html',
  styleUrls: ['./business-organization-type.component.css']
})
export class BusinessOrganizationTypeComponent implements OnInit {
public IsAddFormVisible = false;
public procAdBusinessTypes: any;
public procAdBusinessType: procAdBusinessType;
constructor(
  private BusinessService: BusinessOrganizationTypeService,
  private notificationsService: NotificationsService
) {
  this.procAdBusinessType = new procAdBusinessType();
}

ngOnInit() {
  this.getprocAdBusinessTypes();
}

getprocAdBusinessTypes() {
  this.BusinessService.getprocAdBusinessTypes().subscribe(
    (response) => {
      console.log("group", response);
      this.procAdBusinessTypes = response["procAdBusinessTypeLoadAlls"];
    },
    (error) => {
      const toast = this.notificationsService.error(
        "Error",
        "SomeThing Went Wrong"
      );
    }
  );
}

registerprocAdBusinessType() {
  this.BusinessService
    .addprocAdBusinessTypes(this.procAdBusinessType)
    .subscribe(
      (response) => {
        this.getprocAdBusinessTypes();
        const toast = this.notificationsService.success("Success", "Saved");
        this.clearForm();
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
}
deleteprocAdBusinessTypes(insuranceType) {
  
  if (confirm("Are you sure !!!"))
    this.BusinessService
      .deleteprocAdBusinessTypes(insuranceType)
      .subscribe(
        (response) => {
          this.getprocAdBusinessTypes();
          const toast = this.notificationsService.success("Success", "Saved");
        },
        (error) => {
          console.log("reroes", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
}
updateprocAdBusinessTypes(procAdBusinessTypes) {
  this.BusinessService
    .updateprocAdBusinessTypes(procAdBusinessTypes)
    .subscribe(
      (response) => {
        const toast = this.notificationsService.success("Success", "Updated");
      },
      (error) => {
        console.log("reroes", error);
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
}
performUpdate($event) {
  this.updateprocAdBusinessTypes($event["data"]);
}

clearForm() {
  this.procAdBusinessTypes = {};
  this.IsAddFormVisible = !this.IsAddFormVisible;
}
}

class procAdBusinessType {

  id : any
  name : any
}

