import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { refactorDropdownArray } from '../helpers/helpers';
import { MineralUseService } from './mineral-use.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mineral-use',
  templateUrl: './mineral-use.component.html',
  styleUrls: ['./mineral-use.component.css']
})
export class MineralUseComponent implements OnInit {
public IsAddFormVisible: any;
public mineralUses: any;
public mineralUse: mineralUse;
public isAccountModalVisible = false;
public isAccountVisible = false;
public isAccountVisiblees= false;
public accountNoos: any;
public Customer_ID: any;
public resource_Id: any;
public accountNoo: any;
public accountNo: any;
public Plot_ID: any;
urlParams: any;
public name_Ens: any;
@Input() licenceData;
@Input() workingUser;
@Output() saveDataCompleted = new EventEmitter();
  plot_ID: Object;
  plot_Id: Object;
  customer_Id: Object;
  gis_plot_Id: Object;
  resoucedeposits: any;
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
  @Input() taskId;
  user: any;
  // gis_plot_Id: any;
  constructor(
    private MineralUseService: MineralUseService,
    private NotificationsService: NotificationsService,
    private notificationsService: NotificationsService,
    public serviceService:ServiceService,
    private routerService: ActivatedRoute,
  ) {  
this.mineralUse = new mineralUse;
   }
  ngOnInit() {
    this.getCustomer_ID();
    this.getmineralUse();
    this.getresourceId();
    this.getplotID();
    this.getgisplotID();
    // this.mineralUse.created_By="00000000-0000-0000-0000-000000000000"
    // this.mineralUse.updated_By="00000000-0000-0000-0000-000000000000"
    // this.mineralUse.deleted_By="00000000-0000-0000-0000-000000000000"
  
    this.serviceService.getUserWorkInfo().subscribe(
      (response)=>{
   
          // this.user = response[0].userId;
          // this.mineralUse.updateBy=this.user
          // this.Depreciation_Book.fixed_Assets_No=this.user;
          // console.log('userss',response[0])
      },
      (error)=>{
      console.log("user error");
      }
          );
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
  getmineralUse() {
    this.MineralUseService.getmineralUse().subscribe(
      (response) => {
        console.log("Minral use", response);
        this.mineralUses = response;
      },
      (error) => {
        const toast = this.NotificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  getresourceId() {
    this.MineralUseService.getresourceId().subscribe(
      (response) => {
        this.name_Ens = response;
      },
      (error) => {
        console.log("error");
      }
    );
  } 
  onAccountSelectionChanges(event) {
     this.mineralUse.customer_Id = event.value;
     console.log('aaaa',event)
      this.isAccountModalVisible = false;
    }
  getCustomer_ID(){
    this.MineralUseService.getCustomer_ID().subscribe(
        (response) => {
          this.customer_Id = response;
          this.accountNoos = refactorDropdownArray(
            this.customer_Id,
            "is_Active",
            "customer_Id",
            // "name",
          );
          console.log("get-customer_Id", response);
        },
        (error) => {
          console.log("error-customer_Id", error);
        }
      );
    }
    getplotID(){
    this.MineralUseService.getplotID().subscribe(
        (response) => {
          this.plot_Id = response;
          this.accountNoo = refactorDropdownArray(
            this.plot_Id,
            "is_Deleted",
            "plot_Id" 
          );
          console.log("get-plot_Id", response);
        },
        (error) => {
          console.log("error-plot_Id", error);
        }
      );
    } 
    getgisplotID(){
    this.MineralUseService.getgisplotID().subscribe(
        (response) => {
          this.gis_plot_Id = response;
          this.accountNo = refactorDropdownArray(
            this.gis_plot_Id,
            "is_Deleted",
            "plot_Id" 
          );
          console.log("get-gis_plot_Id", response);
        },
        (error) => {
          console.log("error-gis_plot_Id", error);
        }
      );
    }
    refactorChartOfAccountObject(object) {
      if (object.plot_Id)
      object.plot_Id = object.plot_Id.plot_Id || object.plot_Id;
  
      if (object.customer_Id)
      object.customer_Id = object.customer_Id.customer_Id || object.customer_Id;
      
      if (object.gis_Plot_Id)
      object.gis_Plot_Id = object.gis_Plot_Id.gis_Plot_Id || object.gis_Plot_Id;
      

    return object;
  }
  onAccountSelectionChange(event) {
    this.mineralUse.plot_Id = event.value;
     this.isAccountModalVisible = false;
     this.isAccountVisible = false;
     
   }
   onAccountSelectionChangee(event) {
    this.mineralUse.gis_Plot_Id = event.value;
    console.log('gis',event)
     this.isAccountModalVisible = false;
     this.isAccountVisiblees = false;
   } 

    registermineraluse() {   
      console.log(this.mineralUse);
      
      this.MineralUseService.registermineralUse(this.mineralUse).subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "success");
          this.getmineralUse();
          // this.completed.emit('{}');
          this.clearForm();
        },
        (error) => {
          console.log("register-error", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
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
      console.log("get all");
      this.serviceService.getAll(saveDataResponse[0]).subscribe(
        (response) => {
          console.log("all-response", response);
          let licenceData = response["list"][0];
         // this.journalEntries['branch_ID'] = saveDataResponse[0];
          // this.TransactionSale.application_No = licenceData.Application_No;
          this.saveDataCompleted.emit(saveDataResponse);
  
          //if (this.editForm) this.updateTransactionSale();
       this.registermineraluse();
        },
        (error) => {
          console.log("all-error" + error);
        }
      );
    }
    deletemineralUse(mineralUses) {
      if (confirm("Are you sure you want to delete?  !!!"))
        this.MineralUseService.deletemineralUse(mineralUses)
          .subscribe(
            (response) => {
              this.getmineralUse();
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
    this.mineralUses = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
 

}
class mineralUse{
  public resource_Id:any;
  public plot_Id:any;
  public gis_Plot_Id:any;
  public customer_Id:any;
  public is_Active:any;
  public remarks:any;
  // public created_By:any;
  // public updated_By:any;
  // public deleted_By:any;
  // public is_Deleted:any;
  // public created_Date:any;
  // public updated_Date:any;
  // public deleted_Date:any;
  // updateBy: any;
}