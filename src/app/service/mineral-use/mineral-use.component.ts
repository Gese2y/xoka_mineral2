import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { refactorDropdownArray } from '../helpers/helpers';
import { MineralUseService } from './Mineral-Use.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';

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
public accountNoos: any;
public Customer_ID: any;
public ResourceID: any;
public accountNoo: any;
public Plot_ID: any;
urlParams: any;
@Input() licenceData;
@Input() workingUser;
@Output() saveDataCompleted = new EventEmitter();

  constructor(
    private MineralUseService: MineralUseService,
    private NotificationsService: NotificationsService,
    private notificationsService: NotificationsService,
    public serviceService:ServiceService,
  ) {  
this.mineralUse = new mineralUse;
   }
  ngOnInit() {
    this.getCustomer_ID();
    this.getResourceID();
    this.getmineralUse();
  
  }
  getmineralUse() {
    this.MineralUseService.getmineralUse().subscribe(
      (response) => {
        console.log("Minral use", response);
        this.mineralUses = response["mineraluse"];
      },
      (error) => {
        const toast = this.NotificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  getCustomer_ID(){
    this.MineralUseService.getCustomer_ID().subscribe(
        (response) => {
          this.Customer_ID = response[""];
          this.accountNoos = refactorDropdownArray(
            this.getCustomer_ID,
            "name",
            "getmineraluse"
          );
          console.log("get-Customer_ID", response);
        },
        (error) => {
          console.log("error-Customer_ID", error);
        }
      );
    }
    getplotID(){
    this.MineralUseService.getplotID().subscribe(
        (response) => {
          this.Plot_ID = response[""];
          this.accountNoo = refactorDropdownArray(
            this.getplotID,
            "name",
            "getplotID"
          );
          console.log("get-plot_ID", response);
        },
        (error) => {
          console.log("error-plot_ID", error);
        }
      );
    }
    getResourceID() {
      this.MineralUseService.getResourceID().subscribe(
        (response) => {
          this.ResourceID = response[""];
        },
        (error) => {
          console.log("error");
        }
      );
    } 
    registermineraluse() {   
      console.log(this.mineralUse);
      
      this.MineralUseService.registermineralUse(this.mineralUse).subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "success");
          this.getmineralUse();
          //this.completed.emit('{}');
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
       this.registermineraluse();
        },
        (error) => {
          console.log("all-error" + error);
        }
      );
    }



  clearForm() {
    this.mineralUses = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
  onAccountSelectionChange(event) {
    this.mineralUses.Customer_ID = event.value;
     this.isAccountModalVisible = false;
     this.isAccountVisible = false;
     
   }

}
class mineralUse{
  public Resourse_ID:any;
  public Plot_ID:any;
  public GIS_Plot_ID:any;
  public Customer_ID:any;
  public Is_Active:any;
  public Remarks:any;
}