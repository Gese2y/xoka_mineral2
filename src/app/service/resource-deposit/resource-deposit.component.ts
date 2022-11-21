import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { refactorDropdownArray } from '../helpers/helpers';
import { ResourceDepositService } from './Resource-Deposit.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resource-deposit',
  templateUrl: './resource-deposit.component.html',
  styleUrls: ['./resource-deposit.component.css']
})
export class ResourceDepositComponent implements OnInit {
 public IsAddFormVisible = false;
 public resoucedeposit: any;
 public resourcedeposits: resourcedeposits;
 public isAccountVisible: any;
 public isAccountModalVisible: any;
  accountNoos: any;
  accountNoo: any;
  mineral_Id: any;
  UnitList: any;
  chartOfAccountResult: any;
  chartOfAccounts: any;
  urlParams: any;
  @Input() licenceData;
  @Input() workingUser;
  @Output() saveDataCompleted = new EventEmitter();
  @Input() taskId;
  site_Id: any;
  clicksite_Id: any;
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
 constructor(
  public ResourceDepositService: ResourceDepositService,
  private notificationsService:NotificationsService,
    public serviceService:ServiceService,
    private routerService: ActivatedRoute,
 ) { 
  this.resourcedeposits = new resourcedeposits;
 }

  ngOnInit() {
    this.getmineralID();
    this.getResourceD();
    this.getsiteId();

    this.ResourceDepositService.getUnit().subscribe(data=>{
      this.UnitList=data;
      this.UnitList=this.UnitList;
    })

    this.routerService.params.subscribe((params) => {
      this.urlParams = params;
      console.log("urlParams", this.urlParams);
    });
    if(this.workingUser){
      if(this.workingUser['userId']){
        this.postData.userId = this.workingUser['userId'];
      }
      if(this.workingUser['organization_code']){
        this.postData.orgId = this.workingUser['organization_code'];
      }
    }
    if(this.licenceData){
      if(this.licenceData['Application_No']){
        this.postData.appNo = this.licenceData['Application_No'];
      }
      if(this.licenceData['Licence_Service_ID']){
        this.postData.appCode = this.licenceData['Licence_Service_ID'];
      }
    }
    if(this.taskId){
      this.postData.taskId = this.taskId;
    }
    console.log('licenceData', this.licenceData);
    console.log('workingUser', this.workingUser);
    console.log('taskId', this.taskId);
    console.log('post data :: ', this.postData);

  }

  
  Addresourcedeposity(){
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
  onAccountSelectionChanges(event) {
    this.serviceService.site_Id=  event.value;
     this.serviceService.site_Id = event.value;
     console.log('aaaa',event)
      this.isAccountModalVisible = false;
      
      
    }
    getsiteId(){
      this.ResourceDepositService.getsiteId().subscribe(
          (response) => {
            this.site_Id = response;
            this.accountNoo = refactorDropdownArray(
              this.site_Id,
              "site_Name",
              "site_Id"
            );
            console.log("get-site_Id", response);
          },
          (error) => {
            console.log("error-site_Id", error);
          }
        );
      }
      refactorChartOfAccountObject(object) {
        if (object.site_Id)
          object.site_Id = object.site_Id.site_Id || object.site_Id;
          
          if (object.mineral_Id)
          object.mineral_Id = object.mineral_Id.mineral_Id || object.mineral_Id;
      
        return object;
      }

      getResourceD() {
        this.ResourceDepositService.getResourceD().subscribe(
          (response) => {
            console.log("resource", response);
            this.resoucedeposit = response;
          },
          (error) => {
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
      }
      addresourcedeposits() {
        // this.serviceService.site_Id = this.serviceService.site_Id;
    this.ResourceDepositService.addresourcedeposits(this.resourcedeposits)
      .subscribe(
        (response) => {
          this.getResourceD();
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
  

  getmineralID(){
    this.ResourceDepositService.getmineralID().subscribe(
        (response) => {
          this.mineral_Id = response;
          this.accountNoos = refactorDropdownArray(
            this.mineral_Id,
            "name",
            "mineral_Id"
          );
          console.log("get-getmineralID", response);
        },
        (error) => {
          console.log("error-getmineralID", error);
        }
      );
    }

    searchChartOfAccount(event): void {
      this.chartOfAccountResult = this.chartOfAccounts.filter((c) =>
        c.unit.includes(event.query)
      );
    }


    saveData() {
      console.log(this.workingUser);
      this.serviceService
        .saveForm(
          this.licenceData ? this.licenceData.Licence_Service_ID : "00000000-0000-0000-0000-000000000000",
          this.licenceData ? this.licenceData.Service_ID : this.urlParams.id,
          "bf23c7b0-576c-44ca-8475-34642e3df21a",
          this.workingUser.organization_code,
          "{}",
          this.urlParams.docid || "00000000-0000-0000-0000-000000000000",
          this.urlParams.todoID || "00000000-0000-0000-0000-000000000000"
        )
        .subscribe(
          (response) => {
            console.log("trans-resp", response);
            this.getLicenceService(response);
          },
          (error) => {
            console.log("save-data-error", error);
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
    }
  
    public getLicenceService(saveDataResponse) {
      this.serviceService.getAll(saveDataResponse[0]).subscribe(
        (response) => {
          console.log("all-response", response);
          let licenceData = response["list"][0];
          // if(this.resourcedeposits['document_No']==null){
          //   this.resourcedeposits['document_No']=licenceData.Application_No}
          this.saveDataCompleted.emit(saveDataResponse);
  
          //if (this.editForm) this.updateTransactionSale();
       this.addresourcedeposits();
        },
        (error) => {
          console.log("all-error" + error);
        }
      );
    }
  

    deleteresoucedeposit(resoucedeposit) {
  
      if (confirm("Are you sure !!!"))
        this.ResourceDepositService
          .deleteresoucedeposit(resoucedeposit)
          .subscribe(
            (response) => {
              this.getResourceD();
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
 

  clearForm() {
    this.resoucedeposit = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    // this.resoucedeposits.unit= Guid.create();
    this.resourcedeposits.resource_Id= Guid.create();
  this.resourcedeposits.resource_Id = this.resourcedeposits.resource_Id.value;
  // this.resoucedeposits.updateBy=this.user
  }
  onAccountSelectionChange(event) {
    // this.resoucedeposits.mineral_Id=  event.value;
    this.resourcedeposits.mineral_Id = event.value;
     this.isAccountVisible = false;
    //  this.isAccountModalVisible = false;
     
   }
   postresourcedeposit(){
    if(this.licenceData==undefined){
      this.ResourceDepositService.postresourcedeposit(
        this.postData.orgId= this.resourcedeposits.resource_Id,
        this.postData.appCode="00000000-0000-0000-0000-000000000000",
        this.postData.appNo= "00000000-0000-0000-0000-000000000000",
        this.postData.userId=this.workingUser.userId,
        this.postData.taskId).subscribe(
          next => {
            this.notificationsService.success('Success', 'Succefully posted!');
            console.log('post  Journal  :: ', next);
          },
          _error => {
            this.notificationsService.error('Error', 'Unable to post');
            console.error("Unable to");
          }
        );}
      else{
        this.ResourceDepositService.postresourcedeposit(
          this.postData.orgId= this.resourcedeposits.resource_Id,
          this.postData.appCode=this.licenceData.Service_ID ,
          this.postData.appNo=this.licenceData.Application_No,
          this.postData.userId=this.workingUser.userId,
          this.postData.taskId).subscribe(
            next => {
              this.notificationsService.success('Success', 'Succefully posted  !');
              console.log('post  Journal  :: ', next);
            },
            _error => {
              this.notificationsService.error('Error', 'Unable to post');
              console.error("Unable to ");
            }
          );
      }
    }
}
class resourcedeposits{
public resource_Id: any;
public mineral_Id: any;
public site_Id:any;
public unit:any;
public quantity:any;
public explored_Date:any;
public explored_By:any;
public lab_Approved_Date:any;
public lab_Approved_By:any;
public is_Active:any;
public remarks:any;
// public created_By:any;
// public updated_By:any;
// public deleted_By:any;
// public is_Deleted:any;
// public created_Date:any;
// public updated_Date:any;
// public deleted_Date:any;
}
