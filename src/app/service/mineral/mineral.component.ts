import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MineralService } from "./mineral.service";
import { NotificationsService } from "angular2-notifications";
import { Guid } from 'guid-typescript';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceComponent } from '../service.component';

@Component({
  selector: 'app-mineral',
  templateUrl: './mineral.component.html',
  styleUrls: ['./mineral.component.css']
})
export class MineralComponent implements OnInit {

  public mineral: any;
  public minerals: Minerals;
  // public edit_form:any;
  @Output() onclose = new EventEmitter();
  public IsAddFormVisible: any;
  public Mineral_Class: any;
  // public selectsites: any;
  public Mineral_Use: any;
  public Chemical_ClassificationList: any;
  public TenacityList: any;
  public urlParams: any;
  @Input() licenceData;
  @Input() taskId;
  @Input() workingUser;
  // @Output() saveDataCompleted = new EventEmitter();
  @Output() saveDataCompleted = new EventEmitter();
   @Output() completed = new EventEmitter();
  public Mineral_ClassList: any;
  public Mineral_UseList: any;
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
  @ViewChild("tabset") tabset: TabsetComponent;
  editable: boolean;
  add_new_mineral: any;
  hide_data: boolean;
  row_clicked: any;
  @Output() addingNew = new EventEmitter;
  Saved: any;
  // Minerals: typeof Minerals;
  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  public edit_form: boolean;
  form = new FormGroup({
    mineral_Id: new FormControl(),
    code: new FormControl(),
    name: new FormControl(),
    class: new FormControl(),
    mineral_Use: new FormControl(),
    chemical_Classification: new FormControl(),
    crystal_Structure: new FormControl(),
    hardness: new FormControl(),
    lustre: new FormControl(),
    diaphaneity: new FormControl(),
    color: new FormControl(),
    streak: new FormControl(),
    fracture: new FormControl(),
    parting: new FormControl(),
    tenacity: new FormControl(),
    specific_Gravity: new FormControl(),
    other_Properties: new FormControl(),
    is_Active: new FormControl(),
    remarks: new FormControl(),
  });
  isEdit = false
  constructor(
    private MineralService: MineralService,
    private notificationsService: NotificationsService,
    public serviceService: ServiceService,
    public serviceComponent: ServiceComponent,
    private routerService: ActivatedRoute,
    private _toast: MessageService,
  ) {
    this.minerals = new Minerals();
  }
  ngOnInit() {
    this.getminerals();

    this.minerals.mineral_Id = Guid.create();
    this.form.patchValue({
      mineral_Id: this.minerals.mineral_Id.value})
    // this.minerals.mineral_Id = this.minerals.mineral_Id.value
    console.log('mineral');


    this.MineralService.getClass().subscribe(data => {
      this.Mineral_ClassList = data;
      this.Mineral_ClassList = this.Mineral_ClassList;
    })
    this.MineralService.getMineral_Use().subscribe(data => {
      this.Mineral_UseList = data;
      this.Mineral_UseList = this.Mineral_UseList;
    })
    this.MineralService.getChemical_Classification().subscribe(data => {
      this.Chemical_ClassificationList = data;
      this.Chemical_ClassificationList = this.Chemical_ClassificationList;
    })
    this.MineralService.getTenacity().subscribe(data => {
      this.TenacityList = data;
      this.TenacityList = this.TenacityList;
    })
    this.routerService.params.subscribe((params) => {
      this.urlParams = params;
      console.log("urlParams", this.urlParams);
    });
    if (this.workingUser) {
      if (this.workingUser['userId']) {
        this.postData.userId = this.workingUser['userId'];
      }
      if (this.workingUser['organization_code']) {
        this.postData.orgId = this.workingUser['organization_code'];
      }
    }
    if (this.licenceData) {
      if (this.licenceData['Application_No']) {
        this.postData.appNo = this.licenceData['Application_No'];
      }
      if (this.licenceData['Licence_Service_ID']) {
        this.postData.appCode = this.licenceData['Licence_Service_ID'];
      }
    }
    if (this.taskId) {
      this.postData.taskId = this.taskId;
    }
    console.log('licenceData', this.licenceData);
    console.log('workingUser', this.workingUser);
    console.log('taskId', this.taskId);
    console.log('post data :: ', this.postData);

  }
  clear() {
    console.log('clear');
    this.minerals.mineral_Id = Guid.create();
    this.form.patchValue({
      mineral_Id: this.minerals.mineral_Id.value})
    this.form.reset({
      mineral_Id: this.form.get('mineral_Id').value
    })
    this.isEdit = false
  }
  onRowSelect(event) {
    this.isEdit = true
    this.edit_form = true;
    this.add_new_mineral = true
    console.log('event.data',event.data);
    this.form.patchValue({
      mineral_Id: event.data.mineral_Id,
      code: event.data.code,
      name: event.data.name,
      class: event.data.class,
      mineral_Use: event.data.mineral_Use,
      chemical_Classification: event.data.chemical_Classification,
      crystal_Structure: event.data.crystal_Structure,
      hardness: event.data.hardness,
      lustre: event.data.lustre,
      diaphaneity: event.data.diaphaneity,
      color: event.data.color,
      streak: event.data.streak,
      fracture: event.data.fracture,
      parting: event.data.parting,
      tenacity: event.data.tenacity,
      specific_Gravity: event.data.specific_Gravity,
      other_Properties: event.data.other_Properties,
      is_Active: event.data.is_Active,
      remarks: event.data.remarks,
    }
    );
  }
  onRowUnselect() {
    this.form.reset();
    this.isEdit = false
  }
  getminerals() {
    this.MineralService.getminerals().subscribe(
      (response) => {
        this.mineral = response;
      },
      (error) => {
        console.log("error");
      }
    );
  }
  addminerals() {
    console.log(this.minerals);
    this.MineralService.addminerals(this.form.value).subscribe(
      (response) => {
        this.getminerals();
        const toast = this.notificationsService.success("Success", "Saved");
        if (!this.Saved) {
          this.completed.emit();
          this.Saved = true;
        }
        this.serviceComponent.disablefins=false
        // this.closeup();
        this.clearForm();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "Some Thing Went Wrong"
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
        "bf23c7b0-576c-44ca-8475-34642e3df21a",
        this.workingUser.organization_code,
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
        // if(this.minerals['document_No']==null){
        //   this.minerals['document_No']=licenceData.Application_No}
        this.saveDataCompleted.emit(saveDataResponse);
        this.addminerals();
      },
      (error) => {
        console.log("all-error" + error);
      }
    );
  }
  deletemineral(mineral) {

    if (confirm("Are you sure !!!"))
      this.MineralService
        .deletemineral(mineral)
        .subscribe(
          (response) => {
            this.getminerals();
            const toast = this.notificationsService.success("Success", "Saved");
            this.getminerals();
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
  selectmineral(mineral) {
    console.log(mineral)
    this.edit_form = true;
    this.minerals = mineral;

  }
  clearForm() {
    this.mineral = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
  closeup() {
    this.onclose.emit();
  }
  selectsites(minerals) {
    this.add_new_mineral = true
    if (minerals) {
      // this.selectsites = minerals;
      console.log(minerals)
      this.edit_form = true;
      this.minerals = minerals;
    }
  }
  addnewmineral() {
    this.editable = false
    //this.noRecord=false
    this.add_new_mineral = !this.add_new_mineral;
    this.hide_data = !this.hide_data;
    this.row_clicked = false;
    this.addingNew.emit();
  }
  Updatemineral() {
    // if (this.minerals.class == null || this.minerals.class == undefined) {
    //   const toast = this.notificationsService.warn("Can't insert null value in to class columen ");
    //   return true
    // }
    this.MineralService.Updatemineral(this.form.value).subscribe(
      data => {
        const toast = this.notificationsService.success("Success", "Update");
        this.getminerals();
        if (!this.Saved) {
          this.completed.emit();
          this.Saved = true;
        }
        this.serviceComponent.disablefins=false
      
      },
      error => {
        const toast = this.notificationsService.error('error', 'error', `unable update ! ${error['status'] == 0 ? error['message'] : JSON.stringify(error['error'])}`);
        console.error('update site error', error);
      }
    );
  }
  showToast(type: string, title: string, message: string) {
    let messageConfig = {
      severity: type,
      summary: title,
      detail: message
    }

    this._toast.add(messageConfig);
  }
}
class Minerals {
  public mineral_Id: any
  public code: any
  public name: any
  public class: any
  public mineral_Use: any
  public chemical_Classification: any
  public crystal_Structure: any
  public hardness: any
  public lustre: any
  public diaphaneity: any
  public color: any
  public streak: any
  public fracture: any
  public parting: any
  public tenacity: any
  public specific_Gravity: any
  public other_Properties: any
  public is_Active: any
  public remarks: any
  // public created_By: any
  // public updated_By: any
  // public deleted_By: any
  // public is_Deleted: any
  // public created_Date: any
  // public updated_Date: any
  // public deleted_Date: any
}
