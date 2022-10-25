import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import {InventoryCostingMethodsService } from './inventory-costing-methods.service'

@Component({
  selector: 'app-inventory-costing-methods',
  templateUrl: './inventory-costing-methods.component.html',
  styleUrls: ['./inventory-costing-methods.component.css']
})
export class InventoryCostingMethodsComponent implements OnInit {
  public InventoryCostingMethods: any;
  public inventoryCostingMethod: InventoryCostingMethod;
  public IsAddFormVisible = false;
  constructor(
    private InventoryCostingMethodsService: InventoryCostingMethodsService,
    private notificationsService: NotificationsService
  ) {
    this.inventoryCostingMethod = new InventoryCostingMethod();
  }

  ngOnInit() {
    this.getInventoryCostingMethodss();
  }
  getInventoryCostingMethodss() {
    this.InventoryCostingMethodsService.getInventoryCostingMethodss().subscribe(
      (response) => {
        console.log("group", response);
        this.InventoryCostingMethods = response["costMethods"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
registerInventoryCostingMethod() {
  this.InventoryCostingMethodsService
    .addInventoryCostingMethodss(this.inventoryCostingMethod)
    .subscribe(
      (response) => {
        this.getInventoryCostingMethodss();
        const toast = this.notificationsService.success("Success", "Saved");
        // this.clearForm();
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
}


updateInventoryCostingMethod(inventoryCostingMethod) {
  this.InventoryCostingMethodsService
    .updateInventoryCostingMethodss(inventoryCostingMethod)
    .subscribe(
      (response) => {
        const toast = this.notificationsService.success("Success", "Updated");
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
deleteInventoryCostingMethod(inventoryCostingMethod) {
  if(confirm("Are you sure you went to delete !!"))
  this.InventoryCostingMethodsService
    .deleteInventoryCostingMethod(inventoryCostingMethod)
    .subscribe(
      (response) => {
        this.getInventoryCostingMethodss();
        const toast = this.notificationsService.success("Success", "Deleted");
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


performUpdate($event) {
  this.updateInventoryCostingMethod($event["data"]);
}

clearForm() {
  this.InventoryCostingMethods = {};
  this.IsAddFormVisible = !this.IsAddFormVisible;
}
}
 export class InventoryCostingMethod{
  id: any;
  name : any;
}