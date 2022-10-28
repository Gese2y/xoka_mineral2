import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { refactorDropdownArray } from '../helpers/helpers';
import { ResourceDepositService } from './Resource-Deposit.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-resource-deposit',
  templateUrl: './resource-deposit.component.html',
  styleUrls: ['./resource-deposit.component.css']
})
export class ResourceDepositComponent implements OnInit {
 public IsAddFormVisible = false;
 public resoucedeposits: any;
 public resoucedeposit: resoucedeposit;
 public isAccountVisible: any;
 public isAccountModalVisible: any;
  accountNoos: any;
  accountNoo: any;
  Mineral_ID: any;
  UnitList: any;
  chartOfAccountResult: any;
  chartOfAccounts: any;
  urlParams: any;
  @Input() licenceData;
  @Input() workingUser;
  @Output() saveDataCompleted = new EventEmitter();
  
 constructor(
  private ResourceDepositService: ResourceDepositService,
  private notificationsService:NotificationsService,
    public serviceService:ServiceService,
 ) { 
  this.resoucedeposit = new resoucedeposit;
 }

  ngOnInit() {
    this.getmineralID();
    this.getresourceDeposit();

    this.ResourceDepositService.getUnit().subscribe(data=>{
      this.UnitList=data;
      this.UnitList=this.UnitList;
    })
  }
  Addresourcedeposity(){
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
  
  getresourceDeposit() {
    this.ResourceDepositService.getresourceDeposit().subscribe(
      (response) => {
        console.log("Resource Deposit", response);
        this.resoucedeposits = response["resourcedeposit"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  registerresourcedeposits() {
    this.ResourceDepositService.addresourcedeposits(this.resoucedeposit)
      .subscribe(
        (response) => {
          this.getresourceDeposit();
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
          this.Mineral_ID = response[""];
          this.accountNoos = refactorDropdownArray(
            this.getmineralID,
            "name",
            "getmineralID"
          );
          console.log("get-getmineralID", response);
        },
        (error) => {
          console.log("error-getmineralID", error);
        }
      );
    }
 getsiteID(){
    this.ResourceDepositService.getsiteID().subscribe(
        (response) => {
          this.Mineral_ID = response[""];
          this.accountNoo = refactorDropdownArray(
            this.getsiteID,
            "name",
            "getsiteID"
          );
          console.log("get-site_ID", response);
        },
        (error) => {
          console.log("error-site_ID", error);
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
          "c30c953e-7001-485a-80cd-7dd9d45b86f1",
          "1e60f3a1-7017-47bf-95f4-f0e47c793c72",
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
         // this.Depreciation_Book['fixed_Assets_No'] = saveDataResponse[0];
          // this.TransactionSale.application_No = licenceData.Application_No;
          this.saveDataCompleted.emit(saveDataResponse);
  
          //if (this.editForm) this.updateTransactionSale();
       this.registerresourcedeposits();
        },
        (error) => {
          console.log("all-error" + error);
        }
      );
    }
  



  clearForm() {
    this.resoucedeposits = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    this.resoucedeposits.Unit= Guid.create();
    this.resoucedeposits.Resource_ID= Guid.create();
  this.resoucedeposits.Unit = this.resoucedeposits.unit.value;
  // this.resoucedeposits.updateBy=this.user
  }
  onAccountSelectionChange(event) {
    this.resoucedeposits.Mineral_ID = event.value;
     this.isAccountVisible = false;
    //  this.isAccountModalVisible = false;
     
   }
}
class resoucedeposit{
public Resource_ID: any;
public Mineral_ID: any;
public Site_ID:any;
public Unit:any;
public Quantity:any;
public Explored_Date:any;
public Exlored_By:any;
public Lab_Approved_Date:any;
public Lab_Approved_By:any;
public Is_active:any;
public Remark:any;
}
