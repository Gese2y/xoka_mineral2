import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { refactorDropdownArray } from '../helpers/helpers';
import { ResourceDepositService } from './Resource-Deposit.service';
import { NotificationsService } from 'angular2-notifications';
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
  
 constructor(
  private ResourceDepositService: ResourceDepositService,
  private notificationsService:NotificationsService
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
  AddJournalEntry(){
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
    // if(this.procAdPeriods.year>3000 || this.procAdPeriods.year<1900){
      // const toast = this.notificationsService.warn("Your entered year is incorrect! ");
    //   return true
    // }
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
