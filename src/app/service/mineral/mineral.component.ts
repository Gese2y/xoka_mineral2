import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MineralService } from "./mineral.service";
import { NotificationsService } from "angular2-notifications";
import { Guid } from 'guid-typescript';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mineral',
  templateUrl: './mineral.component.html',
  styleUrls: ['./mineral.component.css']
})
export class MineralComponent implements OnInit {
  
public mineral: any;
public minerals:Minerals;
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
  public  Mineral_ClassList: any;
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
  // Minerals: typeof Minerals;
  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  public edit_form: boolean;
  constructor(
private MineralService: MineralService,
private notificationsService: NotificationsService,
public serviceService:ServiceService,
private routerService: ActivatedRoute,
private _toast: MessageService,
  ) { 
    this.minerals = new Minerals();
  }

  ngOnInit() {
    this.getminerals();
  
    this.minerals.mineral_Id= Guid.create();
    this.minerals.mineral_Id=this.minerals.mineral_Id.value
    console.log('mineral');
    

    this.MineralService.getClass().subscribe(data=>{
      this.Mineral_ClassList=data;
      this.Mineral_ClassList=this.Mineral_ClassList;
    })
     this.MineralService.getMineral_Use().subscribe(data=>{
      this.Mineral_UseList=data;
      this.Mineral_UseList=this.Mineral_UseList;
    }) 
    this.MineralService.getChemical_Classification().subscribe(data=>{
      this.Chemical_ClassificationList=data;
      this.Chemical_ClassificationList=this.Chemical_ClassificationList;
    })
    this.MineralService.getTenacity().subscribe(data=>{
      this.TenacityList=data;
      this.TenacityList=this.TenacityList;
    })
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
//   onRowUnselect(event) {
//     this.MineralService.add({severity:'info', summary:'mineral Unselected',  detail: event.data.name});
// }
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
    this.MineralService.addminerals(this.minerals).subscribe(
      (response) => {
        this.getminerals();
        const toast = this.notificationsService.success("Success", "Saved");
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
  selectmineral( mineral) {
    console.log(mineral)
    this.edit_form = true;
    this.minerals = mineral;
    
  } 
  clearForm(){
    this.mineral = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
  closeup() {
    this.onclose.emit();
  }

  selectsites(minerals) {
    if (minerals) {
      // this.selectsites = minerals;
      console.log(minerals)
        this.edit_form = true;
        this.minerals = minerals;
    }
  }


  addnewmineral() {
    this.editable=false
    //this.noRecord=false
    this.add_new_mineral = !this.add_new_mineral;
    this.hide_data = !this.hide_data;
    this.row_clicked = false;
    this.addingNew.emit();
  }
  Updatemineral() {
    if(this.minerals.class == null || this.minerals.class == undefined){
      const toast = this.notificationsService.warn("Can't insert null value in to class columen ");
      return true
    }
    this.MineralService.Updatemineral(this.minerals).subscribe(
      data => { 
        const toast = this.notificationsService.success("Success", "Update");
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
  public  streak: any
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