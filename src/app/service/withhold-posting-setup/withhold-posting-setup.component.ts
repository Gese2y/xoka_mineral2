import { Component, OnInit } from "@angular/core";

import { WithHoldPostingSetupService } from "./withhold-posting-setup.service";
import { WithHoldPosting } from "../models/WithHoldPosting";
import { NotificationsService } from "angular2-notifications";
import { Console } from "@angular/core/src/console";

@Component({
  selector: "app-withhold-posting-setup",
  templateUrl: "./withhold-posting-setup.component.html",
  styleUrls: ["./withhold-posting-setup.component.css"],
})
export class WithholdPostingSetupComponent implements OnInit {
  WithHoldPostingSetupList;
  newWithHoldPosting: WithHoldPosting;
  ChartOfAccounts;
  FilteredChartOfAccounts;
  WithPostingGroup
  FilteredWithPostingGroup
  isnew;
  p;
  cities1;
  public busPostingGroups: any;
  public productPostingGroups: any;
  structureList: any;
  serviceService: any;
  WHTPostingSetupList: any;
  private _WHTPostingSetupListService: any;

  constructor(
    private notificationsService: NotificationsService,
    private _WithHoldPostingSetupService: WithHoldPostingSetupService
  ) {
    this.isnew = false;
    this.newWithHoldPosting = new WithHoldPosting();
  }

  ngOnInit() {
    this.getWithHoldPostingSetupList();
    this.getChartOfAccount();
    this.getBusPostingSetups();
    this.getProductPostingGroups();
    this.getWithPostingGroup();
    this.getWithHoldPostingSetupList();
    this.refreshList();
    console.log("withpostsetup",this.structureList)
  }

  getProductPostingGroups() {
    this._WithHoldPostingSetupService.getProductPostingGroups().subscribe(
      (response) => {
        this.productPostingGroups =
          response["procGenProductPostingGroupLoadAlls"];
        console.log("busPostingGroups", response);
      },
      (error) => {
        console.log("getInventoryPostingSetupList error");
      }
    );
  }
  refreshList(){
    this.serviceService.getWHTPostingSetup().subscribe(data=>{
      this.structureList=data
      this.structureList=this.structureList.procWithPostingGroups
    })
  }
  
  getBusPostingSetups() {
    this._WithHoldPostingSetupService.getBusPostingGroups().subscribe(
      (response) => {
        this.busPostingGroups = response["procGenBusPostingGroupss"];

        console.log("busPostingGroups", response);
      },
      (error) => {
        console.log("getInventoryPostingSetupList error");
      }
    );
  }

  getWHTPostingSetupList() {
    this._WHTPostingSetupListService.getWHTPostingSetupList().subscribe(
      (WHTPostingSetupList) => {
        this.WHTPostingSetupList = WHTPostingSetupList;
        this.WHTPostingSetupList = Object.assign(
          [],
          this.WHTPostingSetupList.procWithPostingGroupsLoadAlls
        );
        console.log(
          "getInventoryPostingSetupList",
          this.WithHoldPostingSetupList
        );
      },
      (error) => {
        console.log("getInventoryPostingSetupList error");
      }
    );
  }

  getWithHoldPostingSetupList() {
    this._WithHoldPostingSetupService.getWithHoldPostingSetupList().subscribe(
      (WithHoldPostingSetupList) => {
        this.WithHoldPostingSetupList = WithHoldPostingSetupList;
        this.WithHoldPostingSetupList = Object.assign(
          [],
          this.WithHoldPostingSetupList.procWithPostingGroups
        );
        console.log(
          "getWithHoldPostingSetupList",
          this.WithHoldPostingSetupList
        );
      },
      (error) => {
        console.log("getWithHoldPostingSetupList error");
      }
    );
  }

  showAddnew() {
    this.isnew = true;
  }

  saveNewWithHoldPosting() {
    console.log(
      "newWithHoldPosting => ",
        this.refractorWithHoldPostingObj(this.newWithHoldPosting)
    );

    this._WithHoldPostingSetupService
      .saveNewWithHoldPosting(
        this.refractorWithHoldPostingObj(this.newWithHoldPosting)
      )
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "New WithHold Posting Saved"
          );
          this.getWithHoldPostingSetupList();
          this.refreshList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("saveNewWithHoldPosting error", error);
        }
      );
  }

  cancelForm() {
    this.isnew = false;
  }

  searchChartOfAccount(event) {
    if(this.ChartOfAccounts){
      console.log("🚀 launching search 🚀");
      this.FilteredChartOfAccounts = this.ChartOfAccounts.filter((c) =>
        c.account_ID.includes(event.query)
      );
      console.log("🔎 Search finished 🔎 = ", this.FilteredChartOfAccounts ? `${this.FilteredChartOfAccounts.length} results found` : 'nothing found');
    }
    else{
      console.log("💀 no chart of acount stop 💀");
    }
  }

  searchWithPostingGroup(event) {
    if(this.WithPostingGroup){
      console.log("🚀 launching search 🚀");
      this.FilteredWithPostingGroup = this.WithPostingGroup.filter((c) =>
        c.code.includes(event.query)
      );
      console.log("🔎 Search finished 🔎 = ", this.FilteredWithPostingGroup ? `${this.FilteredWithPostingGroup.length} results found` : 'nothing found');
    }
    else{
      console.log("💀 no chart of acount stop 💀");
    }
  }

  getChartOfAccount() {
    this._WithHoldPostingSetupService.getChartOfAccount().subscribe(
      (chartOfAccounts) => {
        this.ChartOfAccounts = chartOfAccounts['proccChartOfAccounts'];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getWithPostingGroup() {
    this._WithHoldPostingSetupService.getWithPostingGroup().subscribe(
      (WithPostingGroups) => {
        this.WithPostingGroup = WithPostingGroups['procWithPostingGroups'];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  updateWithHoldPosting(e) {
    console.log(
      "WithHoldPosting UPDATE => ",
      this.refractorWithHoldPostingObj(e.data)
    );
    this._WithHoldPostingSetupService
      .updateWithHoldPosting(this.refractorWithHoldPostingObj(e.data))
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "WithHold Posting Updated"
          );
          this.getWithHoldPostingSetupList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("updateWithHoldPosting error", error);
        }
      );
  }

  deleteWithHoldPosting(e) {
    console.log("WithHoldPosting delete => ", e);
    this._WithHoldPostingSetupService.deleteWithHoldPosting(e).subscribe(
      (result) => {
        const toast = this.notificationsService.success(
          "Sucess",
          "WithHold Posting Deleted"
        );
        this.getWithHoldPostingSetupList();
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
        console.log("updateWithHoldPosting error", error);
      }
    );
  }

  refractorWithHoldPostingObj(i: WithHoldPosting) {
    let withHoldPosting: WithHoldPosting;
    withHoldPosting = new WithHoldPosting();

    if(i.with_Posting_Group){
      if(i.with_Posting_Group.code){
        withHoldPosting.with_Posting_Group = i.with_Posting_Group.code;
      }
      else{
        withHoldPosting.with_Posting_Group = i.with_Posting_Group;
      }
    }

    if (i.bus_Posting_Group) {
      if (i.bus_Posting_Group.account_ID) {
        withHoldPosting.bus_Posting_Group = i.bus_Posting_Group.account_ID;
      } else {
        withHoldPosting.bus_Posting_Group = i.bus_Posting_Group;
      }
    }

    if (i.prod_Posting_Group) {
      if (i.prod_Posting_Group.account_ID) {
        withHoldPosting.prod_Posting_Group = i.prod_Posting_Group.account_ID;
      } else {
        withHoldPosting.prod_Posting_Group = i.prod_Posting_Group;
      }
    }

    if (i.prepaid_WHT_Acc_Code) {
      if (i.prepaid_WHT_Acc_Code.account_ID) {
        withHoldPosting.prepaid_WHT_Acc_Code =
          i.prepaid_WHT_Acc_Code.account_ID;
      } else {
        withHoldPosting.prepaid_WHT_Acc_Code = i.prepaid_WHT_Acc_Code;
      }
    }

    if (i.payable_WHT_Acc_Code) {
      if (i.payable_WHT_Acc_Code.account_ID) {
        withHoldPosting.payable_WHT_Acc_Code =
          i.payable_WHT_Acc_Code.account_ID;
      } else {
        withHoldPosting.payable_WHT_Acc_Code = i.payable_WHT_Acc_Code;
      }
    }

    if (i.bal_Prepaid_Account_Type) {
      if (i.bal_Prepaid_Account_Type.account_ID) {
        withHoldPosting.bal_Prepaid_Account_Type =
          i.bal_Prepaid_Account_Type.account_ID;
      } else {
        withHoldPosting.bal_Prepaid_Account_Type = i.bal_Prepaid_Account_Type;
      }
    }

    if (i.bal_Prepaid_Acc_Code) {
      if (i.bal_Prepaid_Acc_Code.account_ID) {
        withHoldPosting.bal_Prepaid_Acc_Code =
          i.bal_Prepaid_Acc_Code.account_ID;
      } else {
        withHoldPosting.bal_Prepaid_Acc_Code = i.bal_Prepaid_Acc_Code;
      }
    }

    if (i.bal_Payable_Account_Type) {
      if (i.bal_Payable_Account_Type.account_ID) {
        withHoldPosting.bal_Payable_Account_Type =
          i.bal_Payable_Account_Type.account_ID;
      } else {
        withHoldPosting.bal_Payable_Account_Type = i.bal_Payable_Account_Type;
      }
    }

    if (i.bal_Payable_Acc_Code) {
      if (i.bal_Payable_Acc_Code.account_ID) {
        withHoldPosting.bal_Payable_Acc_Code =
          i.bal_Payable_Acc_Code.account_ID;
      } else {
        withHoldPosting.bal_Payable_Acc_Code = i.bal_Payable_Acc_Code;
      }
    }

    if (i.purch_WHT_Adj_Acc_Code) {
      if (i.purch_WHT_Adj_Acc_Code.account_ID) {
        withHoldPosting.purch_WHT_Adj_Acc_Code =
          i.purch_WHT_Adj_Acc_Code.account_ID;
      } else {
        withHoldPosting.purch_WHT_Adj_Acc_Code = i.purch_WHT_Adj_Acc_Code;
      }
    }

    if (i.sales_WHT_Adj_Acc_Code) {
      if (i.sales_WHT_Adj_Acc_Code.account_ID) {
        withHoldPosting.sales_WHT_Adj_Acc_Code =
          i.sales_WHT_Adj_Acc_Code.account_ID;
      } else {
        withHoldPosting.sales_WHT_Adj_Acc_Code = i.sales_WHT_Adj_Acc_Code;
      }
    }

    return withHoldPosting;
  }

  isNotNull(obj) {
    if (obj != null) {
      if (obj.account_ID != null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
