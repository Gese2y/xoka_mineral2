import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { refactorDropdownArray } from '../helpers/helpers';
import { ResourceDepositService } from './resource-deposit.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-resource-deposit',
  templateUrl: './resource-deposit.component.html',
  styleUrls: ['./resource-deposit.component.css']
})
export class ResourceDepositComponent implements OnInit {
  today: number = Date.now();
  
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();

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
  editable: boolean;
  add_new_resource: any;
  hide_data: boolean;
  row_clicked: any;
  @Output() addingNew = new EventEmitter;
  edit_form: boolean;
  filteredunitList: any;
 unitlist: any;
  types: any;
 constructor(
  public ResourceDepositService: ResourceDepositService,
  private notificationsService:NotificationsService,
    public serviceService:ServiceService,
    private routerService: ActivatedRoute,
    private _toast: MessageService,
 ) { 
  this.resourcedeposits = new resourcedeposits;
 }

  ngOnInit() {
    this.getmineralID();
    this.getResourceD();
    this.getsiteId();

    this.resourcedeposits.resource_Id= Guid.create();
    this.resourcedeposits.resource_Id = this.resourcedeposits.resource_Id.value;  

    this.resourcedeposits.explored_Date = new Date().toISOString().slice(0,10); 
    this.resourcedeposits.lab_Approved_Date = new Date().toISOString().slice(0,10);

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
        if (object.mineral_Id)
        object.mineral_Id = object.mineral_Id.mineral_Id || object.mineral_Id; 

          if (object.crystal_Structure)
        object.crystal_Structure = object.crystal_Structure.crystal_Structure || object.crystal_Structure;
        
        if (object.hardness)
        object.hardness = object.hardness.hardness || object.hardness;

        if (object.lustre)
          object.lustre = object.lustre.lustre || object.lustre;
          
          if (object.diaphaneity)
          object.diaphaneity = object.diaphaneity.diaphaneity || object.diaphaneity;
           
          if (object.is_Active)
          object.is_Active = object.is_Active.is_Active || object.is_Active;
          
        
      
        return object;
      }

      getResourceD() {
        this.ResourceDepositService.getResourceD().subscribe(
          (response) => {
            console.log("resource", response);
            this.resoucedeposit = response;

            // this.filteredunitList =this.unitlist.filter(
            //   filteredunitList => {
            //     if(filteredunitList.unit == this.resoucedeposit.unit) {
              
            //       this.ResourceDepositService.getUnit().subscribe(
            //         response => {
            //           this.types = response;
            //           console.log("response-lookup", response,filteredunitList.unit);
                     
            //       const Unit = this.types.find(element => element.lkdetail_code == filteredunitList.unit)
            //       console.log("Uinit", Unit)
            //       console.log("Uinit", Unit.english_description)
            //       this.filteredunitList.unit=Unit.english_description
            //         return Unit.english_description
            //          })
            //       return true;
            //     }
            //    else{
            //     return false;
            //   }
            // }
            //   );
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
    console.log('mineral id');
    this.ResourceDepositService.getmineralID().subscribe(
        (response:any) => {
          this.accountNoos = response;
          console.log('crystal structure',this.accountNoos );       
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
    selectsites(resourcedeposits) {
      if (resourcedeposits) {
        console.log(resourcedeposits)
          this.edit_form = true;
          this.resourcedeposits = resourcedeposits;
      }
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
  
    Updateresource() {
      this.ResourceDepositService.Updateresource(this.resourcedeposits).subscribe(
        data => { 
          const toast = this.notificationsService.success("Success", "Update");
        },
        error => {
          const toast = this.notificationsService.error('error', 'error', `unable update ! ${error['status'] == 0 ? error['message'] : JSON.stringify(error['error'])}`);
          console.error('update site error', error);
        }
      );
    }
    showToast(type: string, title: string, message: string) {
      let messageConfig = {
        severity: type,
        summary: title,
        detail: message
      }
  
      this._toast.add(messageConfig);
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
  onAccountSelectionChange(id) {
    // this.resoucedeposits.mineral_Id=  event.value;
    this.resourcedeposits.mineral_Id = id
     this.isAccountVisible = false;
    //  this.isAccountModalVisible = false;
     
   }
   addnewresource() {
    this.editable=false
    //this.noRecord=false
    this.add_new_resource = !this.add_new_resource;
    this.hide_data = !this.hide_data;
    this.row_clicked = false;
    this.addingNew.emit();
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
