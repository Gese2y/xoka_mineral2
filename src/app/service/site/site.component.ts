import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Guid } from 'guid-typescript';
import { SiteService } from './site.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
// import { GisService } from './gis.service';
import * as L from 'leaflet';
import { Guid } from 'guid-typescript';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgxSmartModalService } from 'ngx-smart-modal';



@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  today: number = Date.now();
  
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  DisplayCoordinate: boolean;
  map: any;
  // public coordinate = {
  //   lon: null,
  //   lat: null,
  // };
  SelectedPlot;
  plotForm;
  toLease;
  CanDone;
  // isnew;
  noinvalidplot;
  OnParcle = -1;
  plotId = null;
  Saved = false;
  drawnItems = new L.FeatureGroup();
  // private mapViewEvents = new NativeEmitter();
  // public clickCoordinate: any;
  public IsAddFormVisible: any;
  isnew: boolean; 
  site: site;
  public sites: any;
  // public site: site;
  toogleSpin = false;
  displayGIS = false;
  Coordinate: any;
  message: any;
  public StatusList: any;
  public RegionList: any;
  public ZoneList: any;
  public WoredaList: any;
  urlParams: any;
  @Output() saved = new EventEmitter;
  @Input() licenceData;
  @Input() workingUser;
  @Output() saveDataCompleted = new EventEmitter();
  @Input() taskId;
  BasicFormnew: any;
 
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
  edit_form: boolean;
  ismapVisiblees: boolean;
  public name_En: any;
  public name_Ens: any;
  public name_E: any;
  editable: boolean;
  hide_data: boolean;
  row_clicked: any;
  @Output() addingNew = new EventEmitter;
  addsite: any;
  add_new_site: any;
  data: any;
  dropdownzone_Name: any;
  zones_zone_code: any;
  woreda: any;
  woredassss: any;
  dropdowndescription: any;
  zones: any;
  ismapVisibleess: boolean;
  public Zone: any;
  title: any;
  woredas: any;
  public selectedTab = 0;
  isselected: boolean;
  properties: any;
  isplotidselected: boolean;
  close: any;
  isploatDisabled =false;
  // plotForm: boolean;
  constructor(
    public SiteService: SiteService,
    private notificationsService: NotificationsService,
    public serviceService: ServiceService,
    private ngxSmartModalService: NgxSmartModalService,
    // private GisService: GisService,
    private routerService: ActivatedRoute,
    private _toast: MessageService,
  ) {
    this.site = new site;

  }

  ngOnInit() {
    this.getsite();
    this.getRegion();
    this.getZone();
    this.getWoreda();
    console.log(this.site.zone)

    // this.SiteService.getWoreda().subscribe((response: any) => {
    //   console.log('zone');
    //   response.filter(
    //       (val) => {val.zones_zone_code = this.zones.zones_zone_code
    //       console.log('filter Wereda',val);
    //   }
    //       )
    //     .zone((zone: any) => {
    //       this.dropdownzone_Name.add(zone.description);
    //     });
    // }); 

    this.site.site_Id = Guid.create();
    this.site.site_Id = this.site.site_Id.value;
    console.log('Site');
    this.site.date_Registered = new Date().toISOString().slice(0,10); 

    this.SiteService.getStatusList().subscribe(data => {
      this.StatusList = data;
      this.StatusList = this.StatusList;
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

  passdata(ee){
    console.log('zone',ee.target.value) 
    this.SiteService.getWoreda().subscribe(
      (response) => {
         this.woredas = response;
      console.log('aaaaaa',this.woredas)
         this.woredas = this.woredas.filter((value) => value.zones_zone_code == ee.target.value)
         console.log("woreda", this.woredas);
         // this.SiteService.zones_zone_code=this.Zone.zones_zone_code
       },
       (error) => {
       }
       );
      //this.getisactives(this.SiteService.zones_zone_code)
      }

      finishSelection() {
        console.log("selection")
        if (this.site.coordinate) {
          this.message.add(
            { severity: 'success', summary: 'Plot Selection', detail: 'Plot selected successfully!' }
          );
          this.toogleSpin = true;
          setTimeout(() => {
            this.displayGIS = false;
            this.toogleSpin = false;
          }, 1000);
        }
        else {
          this.message.add(
            { severity: 'warn', summary: 'Plot Selection', detail: 'Please select a plot first!' }
          );
        }
      }
      selectPlotID(plotData) {
        console.log('selected plot :: ', plotData);
        if (plotData.properties.OBJECTID || plotData.properties.ID_3 || plotData.properties.ID_0) {
          console.log('plot id from gis :: ', plotData.properties.POP2000);
          console.log('plot id before gis :: ', this.site.coordinate);
          this.site.coordinate = plotData.properties.OBJECTID ? plotData.properties.OBJECTID : plotData.properties.ID_3 || plotData.properties.ID_0;
          console.log('plot id from gis :: ', this.site.coordinate);
        }
      }
    
      plotSelector(event) {
        console.log("event", event.mapPoint.spatialReference.latestWkid);
        if (!this.isploatDisabled) {
          this.site.coordinate = event.mapPoint.spatialReference.latestWkid;
          this.ngxSmartModalService.getModal("GisViewer").close();
        }
      }
      openModal(modal) {
        this.ngxSmartModalService.getModal(modal).open();
      }
    
    getisactives(id:any) {
      this.SiteService.getZone().subscribe(
        { next: (response:any) => {
          
          console.log('abbb',response)
          
          this.zones = response
          this.zones = this.zones;
          this.zones = (Object.assign([],this.zones)); 
          console.log("get-zone_code", id);
          this.zones = this.zones.filter((value:any) => value['zone_code']==  id) 

          console.log("zone_code list", this.zones[0].description)
          this.title=this.zones[0].description
      
        },
       error: (error) => {
        }
       } );
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
  registersite() {
    this.site.licence_Service_Id="00978db9-fcac-4a21-9399-001ba30aa8ec"
    this.site.coordinate= 
    ""+this.site.coordinate+""
    // console.log("coordinate");
    // console.log(this.site);
    this.SiteService.addsite(this.site).subscribe(
      (response) => {
        const toast = this.notificationsService.success("Success", "success");
        this.getsite();
        //this.completed.emit('{}');
        this.selectedTab = 1;
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
  onClickEvent() {
    // this.GisService.properties.ID_3
    this.properties.ID_3;
    this.serviceService.coordinate = this.properties.ID_3;
  }

  selectPlotId(){
    this.isplotidselected=true;
    this.close();

  }
  public getLicenceService(saveDataResponse) {
    this.serviceService.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        console.log("all-response", response);
        let licenceData = response["list"][0];
        // if(this.site['document_No']==null){
        //   this.site['document_No']=licenceData.Application_No}
       this.saveDataCompleted.emit(saveDataResponse);
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

  deletesites(site) {
    if (confirm("Are you sure !!!"))
      this.SiteService
        .deletesites(site)
        .subscribe(
          (response) => {
            this.getsite();
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
  updatesite() {
    this.SiteService.updatesite(this.site).subscribe(
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
  
  clearForm() {
    this.sites = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    this.selectedTab = 0;
    // this.site.site_Id= Guid.create();
    // this.site.site_Id = this.site.site_Id.value;
  }

  select() {
    console.log('Select');
    this.SiteService.DisplayCoordinate = false;
  }
  selectsites(site) {
    console.log(site)
    this.edit_form = true;
    this.site = site;
    this.serviceService.site_Id = site.site_Id
    console.log(this.serviceService.site_Id)
    this.serviceService.resource_deposit=false;
    // this.serviceService.resource_Id=false;
  }
  getRegion() {
    this.SiteService.getRegion().subscribe(
      (response) => {
        this.name_En = response;
      },
      (error) => {
        console.log("error");
      }
    );
  }  
  getZone() {
    this.SiteService.getZone().subscribe(
      (response) => {
        this.name_Ens = response;
      },
      (error) => {
        console.log("error");
      }
    );
  } 
   getWoreda() {
    this.SiteService.getWoreda().subscribe(
      (response) => {
        this.name_E = response;
      },
      (error) => {
        console.log("error");
      }
    );
  }
  addnewsite() {
    this.editable=false
    //this.noRecord=false
    this.add_new_site = !this.add_new_site;
    this.hide_data = !this.hide_data;
    this.row_clicked = false;
    this.addingNew.emit();
  }

 
}
class site{
  public site_Id: any;
  public site_Name: any;
  public region: any;
  public zone: any;
  public woreda: any;
  public kebele_Locality: any;
  public date_Registered: any;
  public coordinate: any;
  public status: any;
  public is_Active: any;
  public remarks: any;
  public licence_Service_Id: any;
  // public application_No: any;
}