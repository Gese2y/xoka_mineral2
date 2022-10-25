import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { TabsetComponent } from "ngx-bootstrap";
import { environment } from "src/environments/environment";
import { BankReconciliationService } from "../bank-reconciliation/bank-reconciliation.service";
import { refactorDropdownArray } from "../helpers/helpers";
import { ServiceService } from '../service.service';
import { Guid } from "guid-typescript";
@Component({
  selector: "app-maintian-bank-reconciliation",
  templateUrl: "./maintian-bank-reconciliation.component.html",
  styleUrls: ["./maintian-bank-reconciliation.component.css"],
})
export class MaintianBankReconciliationComponent implements OnInit {
  public bankReconciliations: any;
  public reconciliationTypes: any;

  public bankReconciliationsSearchResult: any;
  public isvisible=false;
  filtertransid:any;
  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() bankReconciliation;
  @Input() edit_form;
  @Output() onclose = new EventEmitter();

  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  clickedtrans(){
    this.isvisible=true;
  }
  constructor(
    private bankReconciliationService: BankReconciliationService,
    private notificationsService: NotificationsService,
    private serviceService: ServiceService
  ) {
    this.bankReconciliation = new BankReconciliation();
  }
  user:any;
  ngOnInit() {
    this.getTrans();
    this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).subscribe(
      (response)=>{
   
          this.user = response[0].organization_code;
          this.bankReconciliation.branch_ID=this.user;
      },
      (error)=>{
      console.log("user error");
      }
          );
    this.getBankReconciliations();
    this.getGetLookups();
  }
  getTrans() {
    this.serviceService.getTrans().subscribe(
      (responsee) => {
     
        this.filtertransid = responsee.procJBankReconTransactions;
  
        console.log("get-trans :: ", this.filtertransid);
      },
      (error) => {
        console.log("Buyer-get-error ::", error);
      }
    );
  }
  filtertrans(query) {
    this.filtertransid = this.filtertransid.filter((trans) => {
      return trans.trans_ID.includes(query);
    });
  }
  selecttrans(trans) {
    this.bankReconciliation.trans_ID = trans.trans_ID;

    this.isvisible = false;
  }
  ngOnChanges(changes): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes.bankReconciliation.currentValue) {
      this.bankReconciliation = changes.bankReconciliation.currentValue;
    }
  }

  getGetLookups() {
    this.bankReconciliationService.getLookup("type_Bank_Reconcilliation").subscribe((response) => {
      this.reconciliationTypes = refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("lookup", response);
    });
  }

  getBankReconciliations() {
    this.bankReconciliationService.getBankReconciliations().subscribe(
      (response) => {
        this.bankReconciliations = response["procBankReconciliations"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  searchBankReconciliations(event): void {
      (c) => c.bankReconciliation_ID.includes(event.query)
  }

  registerBankReconciliation() {

    this.bankReconciliationService
      .registerBankReconciliation(this.bankReconciliation)
      .subscribe(
        (response) => {
          this.getBankReconciliations();
          const toast = this.notificationsService.success("Success", "Saved");
          this.closeup();
        },
        (error) => {
          console.log("res", error);

          const toast = this.notificationsService.error(
            "Error",
            "Duplicate Primary Key"
          );
        }
      );
  }

  updateBankReconciliation() {
    this.bankReconciliationService
      .updateBankReconciliation(this.bankReconciliation)
      .subscribe(
        (response) => {
          this.getBankReconciliations();
          const toast = this.notificationsService.success("Success", "Saved");
          this.closeup();
        },
        (error) => {
          console.log("res", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  deleteBankReconciliation() {
    if (confirm("are you sure you went to delete the selected item"))
      this.bankReconciliationService
        .deleteBankReconciliation(this.bankReconciliation)
        .subscribe(
          (response) => {
            this.getBankReconciliations();
            const toast = this.notificationsService.success("Success", "Saved");
            this.closeup();
          },
          (error) => {
            console.log("res", error);

            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
  }

  cleanUp() {
    // this.edit_form = false;
  }
  closeup() {
    this.onclose.emit();
  }
}

class BankReconciliation {
  public name: String;
  public bankReconciliation_ID: string;
  public org_Code: String;
  public address: string;
  public website: String;
  public sales_Tax_Type: string;
  public bankReconciliation_Posting_Group: String;
  public gen_Bus_Posting_Group: string;
}
