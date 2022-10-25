import { Component, OnInit } from '@angular/core';
import { refactorDropdownArray } from '../helpers/helpers';
import { MineralUseService } from './Mineral-Use.service';
import { NotificationsService } from 'angular2-notifications';

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


  constructor(
    private MineralUseService: MineralUseService,
    private NotificationsService: NotificationsService,
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