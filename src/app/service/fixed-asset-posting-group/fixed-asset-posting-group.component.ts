import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { FixedAssetPostingGroupService } from "./fixed-asset-posting-group.service";

@Component({
  selector: "app-fixed-asset-posting-group",
  templateUrl: "./fixed-asset-posting-group.component.html",
  styleUrls: ["./fixed-asset-posting-group.component.css"],
})
export class FixedAssetPostingGroupComponent implements OnInit {
  public fixedAssetPostingGroups: any;
  public fixedAssetPostingGroup: FixedAssetPostingGroup;
  public IsAddFormVisible = !false;
  public productionTaxes: any;
  public taxProductionSearchResult: any;
  public chartOfAccounts: any;
  public chartOfAccountSearchResult: any;

  constructor(
    private fixedAssetPostingGroupService: FixedAssetPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.fixedAssetPostingGroup = new FixedAssetPostingGroup();
  }

  ngOnInit() {
    this.getFixedAssetPostingGroups();
    this.getProductionTaxes();
    this.getChartAccounts();
  }

  searchChartOfAccount(event): void {
    if(this.chartOfAccounts){
      console.log("🚀 launching search 🚀");
      this.chartOfAccountSearchResult = this.chartOfAccounts.filter((c) =>
        c.account_ID.includes(event.query)
      );
      console.log("🔎 Search finished 🔎 = ", this.chartOfAccountSearchResult ? `${this.chartOfAccountSearchResult.length} results found` : 'nothing found');
    }
    else{
      console.log("💀 no chart of acount stop 💀");
    }
  }

  getChartAccounts() {
    this.fixedAssetPostingGroupService.getChartOfAccounts().subscribe(
      (response) => {
        console.log("chert", response);
        this.chartOfAccounts = response["proccChartOfAccounts"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  getProductionTaxes() {
    // this.fixedAssetPostingGroupService.getProductionTaxes().subscribe(
    //   (response) => {
    //     console.log("group", response);
    //     this.productionTaxes = response["procTAXProdPostingGroups"];
    //   },
    //   (error) => {
    //     const toast = this.notificationsService.error(
    //       "Error",
    //       "SomeThing Went Wrong"
    //     );
    //   }
    // );
  }

  getFixedAssetPostingGroups() {
    this.fixedAssetPostingGroupService.getFixedAssetPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.fixedAssetPostingGroups =
          response["procFixedAssetsPostingGroupss"];
      },
      (error) => {
        console.log("error", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerFixedAssetPostingGroup() {
    this.fixedAssetPostingGroupService
      .addFixedAssetPostingGroups(
        this.refactorTaxProductionObject( this.refactorTaxProductionObject(this.fixedAssetPostingGroup))
      )
      .subscribe(
        (response) => {
          this.getFixedAssetPostingGroups();
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
        },
        (error) => {
          console.error("unable to save fixed asset posting group", error);
          const toast = this.notificationsService.error(
            "Error",
            error.error
          );
        }
      );
  }

  updateFixedAssetPostingGroup(fixedAssetPostingGroup) {
    this.fixedAssetPostingGroupService
      .updateFixedAssetPostingGroups(fixedAssetPostingGroup)
      .subscribe(
        (response) => {
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

  deleteFixedAssetPostingGroup(fixedAssetPostingGroup) {
    if (confirm("Are you sure !!!"))
      this.fixedAssetPostingGroupService
        .deleteFixedAssetPostingGroups(fixedAssetPostingGroup)
        .subscribe(
          (response) => {
            this.getFixedAssetPostingGroups();
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

  //Extract the code from the object
  refactorTaxProductionObject(object) {
    //check if the object value has a value
    if (object.def_VAT_Prod_Posting_Group)
      //if the object values has a property 'code' return the code
      //else return the object value
      //this will extract the code
      object.def_VAT_Prod_Posting_Group =
        object.def_VAT_Prod_Posting_Group.code ||
        object.def_VAT_Prod_Posting_Group;

    if (object.acquisition_Cost_Account)
      object.acquisition_Cost_Account =
        object.acquisition_Cost_Account.account_ID ||
        object.acquisition_Cost_Account;

    if (object.dep_Expeance_GL_Account)
      object.dep_Expeance_GL_Account =
        object.dep_Expeance_GL_Account.account_ID ||
        object.dep_Expeance_GL_Account;

    if (object.dep_Acc_GLAccount)
      object.dep_Acc_GLAccount =
        object.dep_Acc_GLAccount.account_ID || object.dep_Acc_GLAccount;

    if (object.acquisition_costs_on_disposal)
      object.acquisition_costs_on_disposal =
        object.acquisition_costs_on_disposal.account_ID ||
        object.acquisition_costs_on_disposal;

    if (object.accumulated_depreciation_on_disposal)
      object.accumulated_depreciation_on_disposal =
        object.accumulated_depreciation_on_disposal.account_ID ||
        object.accumulated_depreciation_on_disposal;

    if (object.gains_on_disposal)
      object.gains_on_disposal =
        object.gains_on_disposal.account_ID || object.gains_on_disposal;

    if (object.losses_on_disposal)
      object.losses_on_disposal =
        object.losses_on_disposal.account_ID || object.losses_on_disposal;

    if (object.maintenance_expenses)
      object.maintenance_expenses =
        object.maintenance_expenses.account_ID || object.maintenance_expenses;

    if (object.depreciation_expenses)
      object.depreciation_expenses =
        object.depreciation_expenses.account_ID || object.depreciation_expenses;

    if (object.rent_Inc_GL_Account)
      object.rent_Inc_GL_Account =
        object.rent_Inc_GL_Account.account_ID || object.rent_Inc_GL_Account;

    if (object.ifrS_Expeance_GL_Account)
      object.ifrS_Expeance_GL_Account =
        object.ifrS_Expeance_GL_Account.account_ID ||
        object.ifrS_Expeance_GL_Account;

    if (object.ifrS_Dep_Acc_GLAccount)
      object.ifrS_Dep_Acc_GLAccount =
        object.ifrS_Dep_Acc_GLAccount.account_ID ||
        object.ifrS_Dep_Acc_GLAccount;

    if (object.ifrS_Acquisition_costs_on_disposal)
      object.ifrS_Acquisition_costs_on_disposal =
        object.ifrS_Acquisition_costs_on_disposal.account_ID ||
        object.ifrS_Acquisition_costs_on_disposal;

    if (object.ifrS_Accumulated_depreciation_on_disposal)
      object.ifrS_Accumulated_depreciation_on_disposal =
        object.ifrS_Accumulated_depreciation_on_disposal.account_ID ||
        object.ifrS_Accumulated_depreciation_on_disposal;

    if (object.ifrS_Gains_on_disposal)
      object.ifrS_Gains_on_disposal =
        object.ifrS_Gains_on_disposal.account_ID ||
        object.ifrS_Gains_on_disposal;

    if (object.ifrS_Losses_on_disposal)
      object.ifrS_Losses_on_disposal =
        object.ifrS_Losses_on_disposal.account_ID ||
        object.ifrS_Losses_on_disposal;

    if (object.ifrS_Maintenance_expenses)
      object.ifrS_Maintenance_expenses =
        object.ifrS_Maintenance_expenses.account_ID ||
        object.ifrS_Maintenance_expenses;

    if (object.ifrS_Depreciation_expenses)
      object.ifrS_Depreciation_expenses =
        object.ifrS_Depreciation_expenses.account_ID ||
        object.ifrS_Depreciation_expenses;

    if (object.ifrS_Rent_Inc_GL_Account)
      object.ifrS_Rent_Inc_GL_Account =
        object.ifrS_Rent_Inc_GL_Account.account_ID ||
        object.ifrS_Rent_Inc_GL_Account;

    if (object.iD_Numbering)
      object.iD_Numbering =
        object.iD_Numbering.account_ID || object.iD_Numbering;

    return object;
  }

  performUpdate($event) {
    console.log("reroes", $event);
    this.updateFixedAssetPostingGroup(
      this.refactorTaxProductionObject($event["data"])
    );
  }

  clearForm() {
    this.fixedAssetPostingGroup = new FixedAssetPostingGroup();
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class FixedAssetPostingGroup {
  code: string;
  name: string;
  dep_Per: number;
  dep_Max_Year: number;
  acquisition_Cost_Account: string;
  dep_Expeance_GL_Account: string;
  dep_Acc_GLAccount: string;
  acquisition_costs_on_disposal: string;
  accumulated_depreciation_on_disposal: string;
  gains_on_disposal: string;
  losses_on_disposal: string;
  maintenance_expenses: string;
  depreciation_expenses: string;
  rent_Inc_GL_Account: string;
  dep_IFRS_Per: number;
  ifrS_Dep_Max_Year: number;
  ifrS_Expeance_GL_Account: string;
  ifrS_Dep_Acc_GLAccount: string;
  ifrS_Acquisition_costs_on_disposal: string;
  ifrS_Accumulated_depreciation_on_disposal: string;
  ifrS_Gains_on_disposal: string;
  ifrS_Losses_on_disposal: string;
  ifrS_Maintenance_expenses: string;
  ifrS_Depreciation_expenses: string;
  ifrS_Rent_Inc_GL_Account: string;
  iD_Numbering: string;
  min_Book_Value: number;
  ifrS_Min_Book_Value: number;
  is_Active: boolean;
  log: string;
}
