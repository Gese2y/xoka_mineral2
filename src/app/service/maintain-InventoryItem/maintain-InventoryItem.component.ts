import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainInventoryitemService } from "./maintain-inventoryitem.service";
import { NotificationsService } from "angular2-notifications";
import { ServiceService } from "../service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-maintain-InventoryItem",
  templateUrl: "./maintain-InventoryItem.component.html",
  styleUrls: ["./maintain-InventoryItem.component.css"],
})
export class MaintainInventoryItemComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() licenceData;
  @Input() inventoryItem;
  @Input() StockBinDetail;
  @Input() edit_form;
  @Input() workingUser;
  @Input() taskId;
  @Output() onclose = new EventEmitter();
  @Output() saveDataCompleted = new EventEmitter();
  public DeleteInventoryItem: any;
  public InventoryItemIds: any;
  urlParams: any;
  public Buyers: any;
  public CostMethods: any;
  public ItemTaxTypes: any;
  public ItemTypes: any;
  public PreferedVendors: any;
  public Customers: any;
  public ItemClasss: any;
  public stocking_Units: any;
  public Vocher_Nos: any;
  public vendorPostingGroups: any;
  public inventoryItemIdResult: any;
  public inventoryPostingGroups: any;
  public productPostingGroups: any;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
  constructor(
    private inventoryItemService: MaintainInventoryitemService,
    private notificationsService: NotificationsService,
    public serviceService:ServiceService,
    private routerService: ActivatedRoute,
  ) {
    this.inventoryItem = new InventoryItem();
  }
  user:any;
  ngOnInit() {
    this.getInventoryItems();
    this.getVendors();
    this.getCustomers();
    this.getVendorPostingGroup();
    this.getClasses();
    this.getstockingUnit();
    this.getVocher_No();
    this.getCostMethods();
    this.getInventoryPostingGroup();
    this.getProductPostingGroup();
    this.getItemType();
    this.serviceService.getUserWorkInfo().subscribe(
      (response)=>{
          this.user = response[0].userId;
          this.inventoryItem.updateBy=this.user
          // this.Depreciation_Book.fixed_Assets_No=this.user;
          console.log('userss',response[0])
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

  getItemType() {
    this.inventoryItemService.getItemTypes().subscribe(
      (response) => {
        this.ItemTypes = response["procItemTypes"];
      },
      (error) => {
        console.log("error");
      }
    );
  }
  getProductPostingGroup() {
    this.inventoryItemService.getProductPostingGroup().subscribe(
      (response) => {
        this.productPostingGroups =
          response["procGenProductPostingGroupLoadAlls"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getInventoryPostingGroup() {
    this.inventoryItemService.getInventoryPostingGroup().subscribe(
      (response) => {
        this.inventoryPostingGroups =
          response["procInventoryPostingGroups"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getVendorPostingGroup() {
    this.inventoryItemService.getVendorPostingGroup().subscribe(
      (response) => {
        this.vendorPostingGroups = response["procVendorPostingGroups"];
      },
      (error) => {
        console.log("error");
      }
    );
  }
  getInventoryItems() {
    this.inventoryItemService.getInventoryItems().subscribe(
      (response) => {
        this.InventoryItemIds = response["inventoryItemss"];
        console.log("InventoryItemIds", this.InventoryItemIds);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getVendors() {
    this.inventoryItemService.getVendors().subscribe(
      (response) => {
        this.PreferedVendors = response["procCVendors"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCustomers() {
    this.inventoryItemService.getCustomers().subscribe(
      (response) => {
        this.Buyers = response["procCCustomerLoadAlls"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getClasses() {
    this.inventoryItemService.getClasses().subscribe(
      (response) => {
        this.ItemClasss = response["proccItemClasss"];
      },
      (error) => {
        console.log("error");
      }
    );
  }  
  getstockingUnit() {
    this.inventoryItemService.getstockingUnit().subscribe(
      (response) => {
        this.stocking_Units = response["proccUnits"];
      },
      (error) => {
        console.log("error");
      }
    );
  }  
  getVocher_No() {
    this.inventoryItemService.getVocher_No().subscribe(
      (response) => {
        this.Vocher_Nos = response["procStockBinDetails"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCostMethods() {
    this.inventoryItemService.getCostMethod().subscribe(
      (response) => {
        this.CostMethods = response["costMethods"];
        console.log("methods", this.CostMethods);
      },
      (error) => {
        console.log("error");
      }
    );
  }
CheckPrimaryKey(){
    this.inventoryItemService.getcheckprimarykey(this.inventoryItem.inv_ID.inv_ID).subscribe(
    (response)=>{
   
    if(response.inventoryItemss.length>0){
    
     
      console.log("response ::",response);
      const toast = this.notificationsService.warn(
        "Warning",
        "inventory id is duplicate primary key please insert another value"
      );
    }
    },
    (error)=>{
      const toast = this.notificationsService.error(
        "Error",
        "SomeThing Went Wrong"
      );
    }
    
    );
    
    }
  searchItem(event): void {

      this.inventoryItemIdResult = this.InventoryItemIds.filter((c) =>
      c.inv_ID.includes(event.query)
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
     this.addInventoryItem();
      },
      (error) => {
        console.log("all-error" + error);
      }
    );
  }

  addInventoryItem() {
    console.log(this.inventoryItem);
    this.inventoryItem.org_Code = this.workingUser.organization_code;
    this.inventoryItem.inv_ID=this.inventoryItem.inv_ID;
    this.inventoryItemService.addItem(this.inventoryItem).subscribe(
      (response) => {
        this.getInventoryItems();
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

  updateInventoryItem() {
    this.inventoryItemService.updateItem(this.inventoryItem).subscribe(
      (response) => {
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

  deleteInventoryItem() {
    if (confirm("are you sure you went to delete the selected item"))
      this.inventoryItemService.deleteItem(this.inventoryItem).subscribe(
        (response) => {
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

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result
        .toString()
        .split(",")[1]);
      
      this.inventoryItem.picture = reader.result
        .toString()
        .split(",")[1];
    };
  }

  closeup() {
    this.onclose.emit();
  }
}
class InventoryItem {
  public inv_ID: any;
  public item_Name: any;
  public description: any;
  public item_Class: any;
  public price: any;
  public cost_Method: any;
  public org_Code: any;
  public last_Unit_Cost: any;
  public upC_SKU: any;
  public partNumber: any;
  public stocking_Unit: any;
  public weight: any;
  public shelf_No: any;
  public item_Tax_Type: any;
  public minimum_Stock: any;
  public reorder_Quantity: any;
  public referred_Vendor_id: any;
  public gen_Pord_Posting_Group: any;
  public inventory_Posting_Group: any;
  public picture = "";
  public buyer_ID: any;
  public json_Meta_Data: any;
  public json_Data: any;
  public log: any;
}
