import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { SiteService } from './Site.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
public IsAddFormVisible: any;
public sites: any;
public site:site;
toogleSpin=false;
displayGIS = false;
message: any;
public StatusList:site;
 public  RegionList: any;
 public  ZoneList: any;
 public  WoredaList: any;
 urlParams: any;
 @Input() licenceData;
 @Input() workingUser;
 @Output() saveDataCompleted = new EventEmitter();
// public edit_form:any;
  constructor(
    private SiteService: SiteService,
    private notificationsService: NotificationsService,
    public serviceService:ServiceService,
  ) { 
    this.site= new site; 
   
  }

  ngOnInit() {

    
    this.site.Site_ID= Guid.create();
   // this.site.Site_ID = this.sites.Site_ID.value;

    this.SiteService.getStatus().subscribe(data=>{
      this.StatusList=data;
      this.StatusList=this.StatusList;
    })
    this.SiteService.getRegion().subscribe(data=>{
      this.RegionList=data;
      this.RegionList=this.RegionList;
    })
    this.SiteService.getZone().subscribe(data=>{
      this.ZoneList=data;
      this.ZoneList=this.ZoneList;
    })
     this.SiteService.getWoreda().subscribe(data=>{
      this.WoredaList=data;
      this.WoredaList=this.WoredaList;
    })
  }
  getsite() {
    this.SiteService.getsite().subscribe(
      (response) => {
        console.log("site", response);
        this.sites = response["site"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  // registersite() {
  //   this.SiteService.addsite(this.site)
  //     .subscribe(
  //       (response) => {
  //         this.getsite();
  //         const toast = this.notificationsService.success("Success", "Saved");
  //         this.clearForm();
  //       },
  //       (error) => {
  //         const toast = this.notificationsService.error(
  //           "Error",
  //           "SomeThing Went Wrong"
  //         );
  //       }
  //     );
  // }
  registersite() {   
    console.log(this.site);
    
    this.SiteService.registersite(this.site).subscribe(
      (response) => {
        const toast = this.notificationsService.success("Success", "success");
        this.getsite();
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
     this.registersite();
      },
      (error) => {
        console.log("all-error" + error);
      }
    );
  }
  createMap(id) {
  	return new Map(id);
  }

  clearForm(){
    this.sites = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    this.sites.Site_ID= Guid.create();
    // this.sites.Site_ID= Guid.create();
    this.sites.Site_ID = this.sites.Site_ID.value;
  }
  finishSelection() {
  
    this.message.add(
      { severity: 'success', summary: 'Map Selection', detail: 'Map is selected successfully!' }
    );
    this.toogleSpin = true;
    setTimeout(() => {
      this.displayGIS = false;
      this.toogleSpin = false;
    }, 1000);
  
  {
    this.message.add(
      { severity: 'warn', summary: 'Map Selection', detail: 'Please select a Map first!' }
    );
  }
}


}
class site{
  public Site_ID:any;
  public Site_Name:any;
  public Region:any;
  public Zone:any;
  public Woreda:any;
  public Kebele_Locality:any;
  public Date_Registered:any;
  public Coordinate:any;
  public Status:any;
  public Is_Active:any;
  public Remarks:any;
  public Created_By:any;
  public Updated_By:any;
  public Deleted_By:any;
  public Is_Deleted:any;
  public Created_Date:any;
  public Updated_Date:any;
  public Deleted_Date:any;
  public Licence_Service_ID:any;
  public Application_No:any;
}