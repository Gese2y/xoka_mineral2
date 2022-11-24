import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { TabsetComponent } from 'ngx-bootstrap';
import { SiteService } from '../site/site.service';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications'; 

// import { StepModel } from 'step.model';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
// public site: any;
public sites: any;
completed:any;
site: site;
@ViewChild("tabset") tabset: TabsetComponent;
@Input() licenceData;  
@Input() workingUser;
@Output() saveDataCompleted = new EventEmitter();
@Input() taskId;
  selectedFile: any;
    selectedprofromtree: any;
  toMes;
  staticTabs: any;
  StatusList: any;
  routerService: any;
  urlParams: any;
  // postData: any;
  goto(id) {
    this.tabset.tabs[id].active = true;
  } 
  public edit_form = false;
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
constructor(private SiteService: SiteService,
  public serviceService:ServiceService,
  private notificationsService:NotificationsService,
  ) {
  this.site = new site();
  
}
selectTab(tabId: number) {
  this.staticTabs.tabs[tabId].active = true;
}


  ngOnInit() {
    this.goto(0);
    this.getsite();
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
  
 
  getsite() {
    this.SiteService.getsite().subscribe(
      (response) => {
        this.sites = response;
      },
      (error) => {
        console.log("error");
      }
    );
  }
  selectsite(site) {
    console.log(site)
    // $event.preventDefault();
    this.edit_form = true;
    this.site = site;
    // this.goto(0);
  } 
  addsite() {
    this.site = new site();
    this.edit_form = false;
    this.goto(0);
  }
  saveData() {
    console.log(this.workingUser);
    this.serviceService
      .saveForm(
        this.licenceData ? this.licenceData.Licence_Service_ID : "00000000-0000-0000-0000-000000000000",
        this.licenceData ? this.licenceData.Service_ID : this.urlParams.id,
        "00000000-0000-0000-0000-000000000000",
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
        // if(this.resourcedeposits['document_No']==null){
        //   this.resourcedeposits['document_No']=licenceData.Application_No}
        this.saveDataCompleted.emit(saveDataResponse);

        //if (this.editForm) this.updateTransactionSale();
    //  this.addresourcedeposits();
      },
      (error) => {
        console.log("all-error" + error);
      }
    );
  }
  // EnableFinspronew(resourcedeposit) {
  //   // this.propertyregForm = false;
  //   this.selectedFile = resourcedeposit;
  //   // this.completed.emit();
  //   console.log('next to measurement');
  //   this.toMes = true;
  //   this.selectedprofromtree;
  //   this.selectedprofromtree = {
  //     Site_ID: site.Site_ID
  //   };
  //   this.getsite();
  // }
  closeup() {
    this.goto(0);
    this.site = new site();
    this.getsite();
  }

}
export class site{
  public site_Id:any;
  public site_Name:any;
  public region:any;
  public zone:any;
  public woreda:any;
  public kebele_Locality:any;
  public date_Registered:any;
  public coordinate:any;
  public status:any;
  public is_Active:any;
  public remarks:any;
  public created_By:any
  public updated_By:any;
  public deleted_By:any;
  public is_Deleted:any;
   public created_Date:any;
   public updated_Date:any;
   public deleted_Date:any;
   public licence_Service_Id:any;
   public application_No:any;

}
