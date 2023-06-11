import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { refactorDropdownArray } from '../helpers/helpers';
import { MineralUseService } from './mineral-use.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MessageService } from 'primeng/api';
import { SiteService } from "../site/site.service";
import { SharedService } from '../shared.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ServiceComponent } from '../service.component';
@Component({
  selector: 'app-mineral-use',
  templateUrl: './mineral-use.component.html',
  styleUrls: ['./mineral-use.component.css']
})
export class MineralUseComponent implements OnInit {
  editable: boolean;
  add_new_mineraluse: any;
  hide_data: boolean;
  row_clicked: any;
  @Output() addingNew = new EventEmitter;

  public IsAddFormVisible: any;
  public mineralUses: any;
  // public mineralUse: mineralUse;
  mineralUse: mineralUse = {} as mineralUse;
  public isAccountModalVisible = false;
  public isAccountVisible = false;
  public isAccountVisiblees = false;
  public accountNoos: any;
  public Customer_ID: any;
  public resource_Id: any;
  public accountNoo: any;
  public accountNo: any;
  public Plot_ID: any;
  urlParams: any;
  public name_Ens: any;
  @Input() licenceData;
  @Input() workingUser;
  @Output() saveDataCompleted = new EventEmitter();
  public coordinate = {
    lon: null,
    lat: null,
  };
  types: any;
  plot_ID: Object;
  plot_Id: Object;
  customer_Id: Object;
  gis_plot_Id: any;
  resoucedeposits: any;
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
  @Input() taskId;
  private clickCoordinate: any;
  DisplayCoordinate: boolean;
  user: any;
  ismapVisiblees: boolean;
  gis_Plot_Id: any;
  map: any;
  edit_form: boolean;
  message: any;
  isploatDisabled = false;
  toogleSpin = false;
  displayGIS = false;
  isEdit = false;
  // gis_plot_Id: any;
  form = new FormGroup({
    resource_Id: new FormControl(),
    gis_Plot_Id: new FormControl(),
    customer_Id: new FormControl(),
    is_Active: new FormControl(),
    remarks: new FormControl(),
  });

  constructor(
    private MineralUseService: MineralUseService,
    private NotificationsService: NotificationsService,
    private notificationsService: NotificationsService,
    public serviceService: ServiceService,
    public SiteService: SiteService,
    private ngxSmartModalService: NgxSmartModalService,
    private routerService: ActivatedRoute,
    public serviceComponent: ServiceComponent,
    private _toast: MessageService,
    private sharedService: SharedService
  ) {
    this.mineralUse = new mineralUse;
  }
  ngOnInit() {
    this.gettype();
    this.getCustomer_ID();
    this.getmineralUse();
    this.getresourceId();
    // this.getplotID();
    this.getgisplotID();

    this.sharedService.resource_id$.subscribe(state => {
      this.form.patchValue({
        resource_Id: state,
        is_Active: false,
        gis_Plot_Id: 'no records'
       })
      console.log('resource_id',state);

    })
    // this.mineralUse.created_By="00000000-0000-0000-0000-000000000000"
    // this.mineralUse.updated_By="00000000-0000-0000-0000-000000000000"
    // this.mineralUse.deleted_By="00000000-0000-0000-0000-000000000000"

    this.serviceService.getUserWorkInfo().subscribe(
      (response) => {

        // this.user = response[0].userId;
        // this.mineralUse.updateBy=this.user
        // this.Depreciation_Book.fixed_Assets_No=this.user;
        console.log('userss', response[0])
      },
      (error) => {
        // console.log("user error");
      }
    );
    this.routerService.params.subscribe((params) => {
      this.urlParams = params;
      // console.log("urlParams", this.urlParams);
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

  }


  clear() {
    console.log('clear');

    this.form.reset({
      resource_Id: this.form.get('resource_Id').value
    })
    this.isEdit = false
    //  resource_Id = ''
  // plot_Id = ''
   this.mineralUse.gis_Plot_Id = ''
   this.mineralUse.customer_Id = ''
   this.mineralUse.is_Active = ''
   this.mineralUse.remarks = ''
  }

  onRowSelect(event) {
    this.isEdit = true
    this.add_new_mineraluse = true
    console.log('event.data',event.data);
    this.form.patchValue({
      resource_Id: event.data.resource_Id ,
      gis_Plot_Id: event.data.gis_Plot_Id ,
      customer_Id : event.data.customer_Id,
      is_Active: event.data.is_Active ,
      remarks: event.data.remarks ,
    }
    );
    this.sharedService.setmineral_use_id(this.form.get('resource_Id').value);
  }

  onRowUnselect() {
    this.form.reset();
    this.isEdit = false
  }

  public getCoordOnClick(event) {
    let convertedEvent = this.map.mouseEventToLatLng(event);
    this.clickCoordinate = convertedEvent;
    this.serviceService.coordinate = this.clickCoordinate
    // console.log("converted event :: ", convertedEvent);
    this.ismapVisiblees = false
    // let markerOption = {
    //   icon: L.Icon.Default,
    //   title: `lat: ${convertedEvent.lat}, lng: ${convertedEvent.lng}`
    // };
    // marker
    // let coordMarker = L.marker(convertedEvent).addTo(this.map);
    // coordMarker.bindPopup().openPopup();

    // popup
    // let popupOptions = {
    //   closeOnClick: false
    // };
    // L.popup(popupOptions)
    //   .setLatLng(convertedEvent)
    //   .setContent(
    //     `<p>latitude : ${convertedEvent.lat}<br/>
    //      longitude : ${convertedEvent.lng}</p>`
    //   )
    //   .openOn(this.map);
  }
  finishSelection() {
    // console.log("selection")
    if (this.mineralUse.gis_Plot_Id) {
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
    // console.log('selected plot :: ', plotData);
    if (plotData.properties.OBJECTID || plotData.properties.ID_3 || plotData.properties.ID_0) {
      // console.log('plot id from gis :: ', plotData.properties.POP2000);
      // console.log('plot id before gis :: ', this.mineralUse.gis_Plot_Id);
      this.mineralUse.gis_Plot_Id = plotData.properties.OBJECTID ? plotData.properties.OBJECTID : plotData.properties.ID_3 || plotData.properties.ID_0;
      // console.log('plot id from gis :: ', this.mineralUse.gis_Plot_Id);
    }
  }
  plotSelector(event) {
    // console.log("event", event.mapPoint.spatialReference.latestWkid);
    if (!this.isploatDisabled) {
      this.serviceService.coordinate = event.mapPoint.spatialReference.latestWkid;
      this.ngxSmartModalService.getModal("GisViewer").close();
    }
  }
  openModal(modal) {
    this.ngxSmartModalService.getModal(modal).open();
  }
  gettype() {
    this.MineralUseService.getsite().subscribe(
      (response: any) => {
        this.types = response;
        // console.log("response-lookup", this.types);
      })
  }
  getmineralUse() {
    this.MineralUseService.getmineralUse().subscribe(
      (response) => {
        console.log("Minral_use", response);
        this.mineralUses = response;

        // console.log("aaaaa",this.mineralUses);

        for (let i = 0; i < this.mineralUses.length; i++) {
          if (this.mineralUses[i] != null || this.mineralUses[i] != undefined) {

            let ResourceId = this.types.filter(element => element.site_Id === this.mineralUses[i].site_Id)
            // console.log("Uinit", ResourceId)
            if (ResourceId.length > 0) {
              let sitetype = ResourceId[0].site_Name
              this.mineralUses.site_Id = sitetype
              // console.log("site name",
              // this.mineralUses[i].site_Id);
            }
          }
        }

      },
      // (error) => {
      //   const toast = this.NotificationsService.error(
      //     "Error",
      //     "SomeThing Went Wrong"
      //   );
      // }
    );
  }
  select() {
    // console.log('Select');
    this.MineralUseService.DisplayCoordinate = false;
  }
  getresourceId() {
    this.MineralUseService.getresourceId().subscribe(
      (response) => {
        this.name_Ens = response;
      },
      (error) => {
        // console.log("error");
      }
    );
  }
  addnewmineraluse() {
    this.editable = false
    //this.noRecord=false
    this.add_new_mineraluse = !this.add_new_mineraluse;
    this.hide_data = !this.hide_data;
    this.row_clicked = false;
    this.addingNew.emit();
  }
  onAccountSelectionChanges(id) {
    console.log('id',id);

    this.form.patchValue({
      customer_Id: id
    })
    this.mineralUse.customer_Id = id;
    //  console.log('aaaa',event)
    this.isAccountModalVisible = false;
  }
  getCustomer_ID() {
    this.MineralUseService.getCustomer_ID().subscribe(
      (response: any) => {
        this.accountNoos = response;
        // console.log('customer Id',this.accountNoos );
        // console.log("get-getcustomer Id", response);
      },
      (error) => {
        // console.log("error-getcustomer Id", error);
      }
    );
  }
  getgisplotID() {
    this.MineralUseService.getgisplotID().subscribe(
      (response) => {
        this.gis_plot_Id = response;
        this.accountNo = refactorDropdownArray(
          this.gis_plot_Id,
          "is_Deleted",
          "plot_Id"
        );
        // console.log("get-gis_plot_Id", response);
      },
      (error) => {
        // console.log("error-gis_plot_Id", error);
      }
    );
  }
  refactorChartOfAccountObject(object) {
    // if (object.plot_Id)
    // object.plot_Id = object.plot_Id.plot_Id || object.plot_Id;

    if (object.customer_Id)
      object.customer_Id = object.customer_Id.customer_Id || object.customer_Id;

    if (object.gis_Plot_Id)
      object.gis_Plot_Id = object.gis_Plot_Id.gis_Plot_Id || object.gis_Plot_Id;


    return object;
  }
  // onAccountSelectionChange(event) {
  //   this.mineralUse.plot_Id = event.value;
  //    this.isAccountModalVisible = false;
  //    this.isAccountVisible = false;

  //  }
  onAccountSelectionChangee(event) {
    this.mineralUse.gis_Plot_Id = event.value;
    console.log('gis',event.target)
    this.isAccountModalVisible = false;
    this.isAccountVisiblees = false;
  }
  public OnClickMap(event) {
    this.mineralUse.gis_Plot_Id = event.value;
    this.IsAddFormVisible = false
    this.ismapVisiblees = false
  }
  registermineraluse() {
    this.mineralUse.resource_Id = this.serviceService.resource_Id;
    this.mineralUse.gis_Plot_Id = this.SiteService.featureid
    this.sharedService.setmineral_use_id(this.mineralUse.resource_Id);

    this.MineralUseService.registermineralUse(this.form.value).subscribe(
      (response) => {
        const toast = this.notificationsService.success("Success", "success");
        if(this.serviceService.use==true){
          this.serviceComponent.disablefins=false}
        this.getmineralUse();
        this.clearForm();
        this.getresourceId();
      },
      (error) => {
        // console.log("register-error", error);
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  Updatemineraluse() {
    // console.log('mineralUses',this.mineralUse);
    this.sharedService.setmineral_use_id(this.mineralUses.resource_Id);
    this.MineralUseService.Updatemineraluse(this.form.value).subscribe(
      data => {
        const toast = this.notificationsService.success("Success", "Update");
        if(this.serviceService.use==true){
       this.serviceComponent.disablefins=false}
        this.getmineralUse();
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
  gotoCoordinate() {
    // console.log("lon : ", this.gis_Plot_Id.lon, "\nlat : ", this.gis_Plot_Id.lat);
    if (this.gis_Plot_Id.lon !== null && this.gis_Plot_Id.lat !== null) {
      this.map.panTo([this.gis_Plot_Id.lat, this.gis_Plot_Id.lon]);
    }
    let coords = {
      lat: this.gis_Plot_Id.lat,
      lng: this.gis_Plot_Id.lon,
    };

    L.marker(coords).addTo(this.map);
  }
  saveData() {
    // console.log(this.workingUser);
    this.registermineraluse();
    console.log(this.form.value);
    if (this.form.get('gis_Plot_Id').value == null) {
      this.form.patchValue({
        gis_Plot_Id: Guid.create().toString()
      })
    }

    // this.serviceService
    //   .saveForm(
    //     this.licenceData ? this.licenceData.Licence_Service_ID : "00000000-0000-0000-0000-000000000000",
    //     this.licenceData ? this.licenceData.Service_ID : this.urlParams.id,
    //     "bf23c7b0-576c-44ca-8475-34642e3df21a",
    //     this.workingUser.organization_code,
    //     "{}",
    //     this.urlParams.docid || "00000000-0000-0000-0000-000000000000",
    //     this.urlParams.todoID || "00000000-0000-0000-0000-000000000000"
    //   )
    //   .subscribe(
    //     (response) => {
    //       // console.log("trans-resp", response);
    //       this.getLicenceService(response);
    //     },
    //     (error) => {
    //       // console.log("save-data-error", error);

    //       const toast = this.notificationsService.error(
    //         "Error",
    //         "SomeThing Went Wrong"
    //       );
    //     }
    //   );
  }
  public getLicenceService(saveDataResponse) {
    // console.log("get all");
    this.serviceService.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        // console.log("all-response", response);
        let licenceData = response["list"][0];
        // this.journalEntries['branch_ID'] = saveDataResponse[0];
        // this.TransactionSale.application_No = licenceData.Application_No;
        this.saveDataCompleted.emit(saveDataResponse);

        //if (this.editForm) this.updateTransactionSale();
        this.registermineraluse();
      },
      (error) => {
        // console.log("all-error" + error);
      }
    );
  }
  deletemineralUse(data) {
    console.log('data',data);
    this.sharedService.setmineral_use_id(data.resource_Id);

      this.MineralUseService.deletemineralUse(data)
        .subscribe(
          (response) => {
            // this.getmineralUse();
            const toast = this.notificationsService.success("Success", "Deleted");
            this.getmineralUse();
          },
          (error) => {
            // console.log("reroes", error);
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
  }
  clearForm() {
    this.mineralUses = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
  selectmineraluse(mineralUse) {
    console.log('mineralUses',mineralUse);
    console.log();
    this.isEdit = true;

    this.sharedService.setmineral_use_id(mineralUse.resource_Id);
    this.add_new_mineraluse = !this.add_new_mineraluse;
    this.edit_form = true;
    this.mineralUse = mineralUse;
  }
}
class mineralUse {
  public resource_Id: any;
  //public plot_Id:any;
  public gis_Plot_Id: any;
  public customer_Id: any;
  public is_Active: any;
  public remarks: any;
  // public created_By:any;
  // public updated_By:any;
  // public deleted_By:any;
  // public is_Deleted:any;
  // public created_Date:any;
  // public updated_Date:any;
  // public deleted_Date:any;
  // updateBy: any;
}
