import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { GeneralBusinessPostingGroupService } from "./general-business-posting-group.service";

@Component({
  selector: "app-general-business-posting-group",
  templateUrl: "./general-business-posting-group.component.html",
  styleUrls: ["./general-business-posting-group.component.css"],
})
export class GeneralBusinessPostingGroupComponent implements OnInit {

  public GenBusPostingGroups: GenBusPostingGroups;
  public IsAddFormVisible = false;
  public productionTaxes: any;
  public taxBusinessionSearchResult: any;
  public def_VAT_Prod_Posting_Group: any;
  public def_VATBusPostingGroups: any;
  constructor(
    private GenBusPostingGroupsService: GeneralBusinessPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.GenBusPostingGroups = new GenBusPostingGroups();
  }

  ngOnInit() {
    this.getGenBusPostingGroups();
    this.getBusinessionTaxes();
    this.getTAXBusPostingGroup();
  }
  getTAXBusPostingGroup() {
    this.GenBusPostingGroupsService.getTAXBusPostingGroup().subscribe(
      (response) => {
        this.def_VATBusPostingGroups = response["procTAXBusPostingGroups"];
      },
      (error) => {
        console.log("error");
      }
    );
  }  
  searchTaxBusinession(event): void {
    this.taxBusinessionSearchResult = this.productionTaxes.filter((c) =>
      c.code.includes(event.query)
    );
  }

  getBusinessionTaxes() {
    this.GenBusPostingGroupsService.getBusinessionTaxes().subscribe(
      (response) => {
        console.log("group", response);
        this.productionTaxes = response["procTAXProdPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  getGenBusPostingGroups() {
    this.GenBusPostingGroupsService.getGenBusPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.GenBusPostingGroups =
          response["procGenBusPostingGroupss"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  registerGenBusPostingGroups() {
    this.GenBusPostingGroupsService
      .addGenBusPostingGroups(
        this.refactorTaxBusinessionObject(this.GenBusPostingGroups)
      )
      .subscribe(
        (response) => {
          this.getGenBusPostingGroups();
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
  updateGenBusPostingGroups(GenBusPostingGroups) {
    this.GenBusPostingGroupsService
      .updateGenBusPostingGroups(GenBusPostingGroups)
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

  deleteGenBusPostingGroups(GenBusPostingGroups) {
    if (confirm("Are you sure want to delete?"))
      this.GenBusPostingGroupsService
        .deleteGenBusPostingGroups(GenBusPostingGroups)
        .subscribe(
          (response) => {
            this.getGenBusPostingGroups();
            const toast = this.notificationsService.success("Success", "Successfuly Deleted");
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
  refactorTaxBusinessionObject(object) {
    //check if the object value has a value
    if (object.def_VATBusPostingGroup)
      //if the object values has a property 'code' return the code
      //else return the object value
      //this will extract the code
      object.def_VATBusPostingGroup =
        object.def_VATBusPostingGroup.code ||
        object.def_VATBusPostingGroup;

    return object;
  }

  performUpdate($event) {
    console.log("reroes", $event);
    this.updateGenBusPostingGroups(
      this.refactorTaxBusinessionObject($event["data"])
    );
  }

  clearForm() {
    this.GenBusPostingGroups = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class GenBusPostingGroups {}
