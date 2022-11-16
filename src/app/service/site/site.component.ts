import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Guid } from 'guid-typescript';
import { SiteService } from './Site.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import * as L from 'leaflet';
import { Guid } from 'guid-typescript';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  DisplayCoordinate: boolean;
  map: any;
  public coordinate = {
    lon: null,
    lat: null,
  };
  drawnItems = new L.FeatureGroup();
  // private mapViewEvents = new NativeEmitter();
  public clickCoordinate: any;
  public IsAddFormVisible: any;
  public sites: any;
  public site: site;
  toogleSpin = false;
  displayGIS = false;

  Coordinate: any;
  message: any;
  public StatusList: any;
  public RegionList: any;
  public ZoneList: any;
  public WoredaList: any;
  urlParams: any;
  @Input() licenceData;
  @Input() workingUser;
  @Output() saveDataCompleted = new EventEmitter();
  @Input() taskId;
  BasicFormnew: any;
  // public edit_form:any;
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
  edit_form: boolean;
  ismapVisiblees: boolean;
  constructor(
    public SiteService: SiteService,
    private notificationsService: NotificationsService,
    public serviceService: ServiceService,
    private routerService: ActivatedRoute,
  ) {
    this.site = new site;

  }

  ngOnInit() {
    this.getsite();
    //  this.site.site_Id= Guid.create();
    this.site.site_Id = Guid.create();
    this.site.site_Id = this.site.site_Id.value;
    console.log('Site');

    this.SiteService.getStatusList().subscribe(data => {
      this.StatusList = data;
      this.StatusList = this.StatusList;
    })

    this.SiteService.getRegion().subscribe(data => {
      this.RegionList = data;
      this.RegionList = this.RegionList;
    })
    this.SiteService.getZone().subscribe(data => {
      this.ZoneList = data;
      this.ZoneList = this.ZoneList;
    })
    this.SiteService.getWoreda().subscribe(data => {
      this.WoredaList = data;
      this.WoredaList = this.WoredaList;
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
    let Longitude =this.serviceService.coordinate.lng
    let Latitude =this.serviceService.coordinate.lat
    this.site.coordinate = "lat:"+Latitude+" " + "lng:"+Longitude
    this.site.licence_Service_Id="00978db9-fcac-4a21-9399-001ba30aa8ec"
    console.log("coordinate");
    console.log(this.site);
    this.SiteService.addsite(this.site).subscribe(
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
        this.licenceData ? this.licenceData.Service_ID : "00000000-0000-0000-0000-000000000000",
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
  onClickEvent() {
    console.log(this.BasicFormnew.controls['Latitude'].value);

    let x = this.BasicFormnew.controls['Latitude'].value;
    let y = this.BasicFormnew.controls['Longitude'].value;
    let coordinate = 'POINT (' + x + ' ,' + y + ')';
    this.BasicFormnew.controls['coordinate'].setValue(coordinate)
  }

  public getLicenceService(saveDataResponse) {
    this.serviceService.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        console.log("all-response", response);
        let licenceData = response["list"][0];
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
  update(site) {
    this.SiteService
      .updatesite(site)
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
  clearForm() {
    this.sites = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    // this.site.site_Id= Guid.create();
    // this.site.site_Id = this.site.site_Id.value;
  }
  finishSelection() {

    this.message.registersite(
      { severity: 'success', summary: 'Map Selection', detail: 'Map is selected successfully!' }
    );
    this.toogleSpin = true;
    setTimeout(() => {
      this.displayGIS = false;
      this.toogleSpin = false;
    }, 1000);

    {
      this.message.addsite(
        { severity: 'warn', summary: 'Map Selection', detail: 'Please select a Map first!' }
      );
    }
  }

  public OnClickMap(event) {   
    this.site.coordinate = event.value;
    this.IsAddFormVisible = false
    this.ismapVisiblees = false 
  }
  gotoCoordinate() {
    console.log("lon : ", this.coordinate.lon, "\nlat : ", this.coordinate.lat);
    if (this.coordinate.lon !== null && this.coordinate.lat !== null) {
      this.map.panTo([this.coordinate.lat, this.coordinate.lon]);
    }
    let coords = {
      lat: this.coordinate.lat,
      lng: this.coordinate.lon,
    };

    L.marker(coords).addTo(this.map);
  }
  selectsites(site) {
    console.log(site)
    this.edit_form = true;
    this.site = site;
    this.serviceService.site_Id = site.site_Id
    console.log(this.serviceService.site_Id)
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
  // public created_By: any;
  // public updated_By: any;
  // public deleted_By: any;
  // public is_Deleted: any;
  // public created_Date: any;
  // public updated_Date: any;
  // public deleted_Date: any;
  public licence_Service_Id: any;
  public application_No: any;
}