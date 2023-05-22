import { SharedService } from './../shared.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { refactorDropdownArray } from '../helpers/helpers';
import { ResourceDepositService } from './resource-deposit.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-resource-deposit',
  templateUrl: './resource-deposit.component.html',
  styleUrls: ['./resource-deposit.component.css']
})
export class ResourceDepositComponent implements OnInit {
  today: number = Date.now();

  todayNumber: number = Date.now();
  todayDate: Date = new Date();
  todayString: string = new Date().toDateString();
  todayISOString: string = new Date().toISOString();
  // @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  public IsAddFormVisible = false;

  public resoucedeposit: any;
  public resourcedeposits: resourcedeposits;
  public isAccountVisible: any;
  public isAccountModalVisible: any;
  accountNoos: any;
  accountNoo: any;
  mineral_Id: any;
  UnitList: any;
  chartOfAccountResult: any;
  chartOfAccounts: any;
  urlParams: any;
  @Input() licenceData;
  @Input() workingUser;
  @Output() saveDataCompleted = new EventEmitter();
  @Input() taskId;
  site_Id: any;
  clicksite_Id: any;
  postData = {
    orgId: null,
    appCode: null,
    appNo: null,
    userId: null,
    taskId: null
  };
  editable: boolean;
  add_new_resource: any;
  hide_data: boolean;
  row_clicked: any;
  @Output() addingNew = new EventEmitter;
  edit_form: boolean;
  filteredunitList: any;
  unitlist: any;
  types: any;
  resoucedeposittemp: any;
  unit: any;
  typess: any;
  mineral_Ids: any;
  name: any;
  isEdit = false;
  fakeresoucedeposit: any;
  constructor(
    public ResourceDepositService: ResourceDepositService,
    private notificationsService: NotificationsService,
    public serviceService: ServiceService,
    private routerService: ActivatedRoute,
    private _toast: MessageService,
    private SharedService: SharedService
  ) {
    this.resourcedeposits = new resourcedeposits;
  }
  form = new FormGroup({
    resource_Id: new FormControl(),
    mineral_Id: new FormControl(),
    site_Id: new FormControl(),
    unit: new FormControl(),
    quantity: new FormControl(),
    explored_Date: new FormControl(new Date().toISOString().substr(0, 10)),
    explored_By: new FormControl(),
    lab_Approved_Date: new FormControl(new Date().toISOString().substr(0, 10)),
    lab_Approved_By: new FormControl(),
    is_Active: new FormControl(),
    remarks: new FormControl(),
    resource_code: new FormControl(),

});
  ngOnInit() {
    this.gettypess();
    this.gettype();
    this.getmineralID();
    this.getsiteId();

    this.SharedService.site_id$.subscribe(state => {
      this.form.patchValue({ site_Id: state })
    })

    this.resourcedeposits.resource_Id = Guid.create();
    this.resourcedeposits.resource_Id = this.resourcedeposits.resource_Id.value;
    this.resourcedeposits.explored_Date = new Date().toISOString().slice(0, 10);
    this.resourcedeposits.lab_Approved_Date = new Date().toISOString().slice(0, 10);
    this.ResourceDepositService.getUnit().subscribe(data => {
      this.UnitList = data;
      this.UnitList = this.UnitList;
    })
    this.getResourceD();

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
    // console.log('licenceData', this.licenceData);
    // console.log('workingUser', this.workingUser);
    // console.log('taskId', this.taskId);
    // console.log('post data :: ', this.postData);

  }

  onRowSelect(event) {
    this.isEdit = true
    console.log('event.data',event.data);

    if(event.data) {
      this.form.patchValue({
        resource_Id: event.data.resource_Id,
        mineral_Id: event.data.mineral_Id,
        site_Id: event.data.site_Id,
        unit: event.data.unit,
        quantity: event.data.quantity,
        explored_Date: event.data.explored_Date,
        explored_By: event.data.explored_By,
        lab_Approved_Date: event.data.lab_Approved_Date,
        lab_Approved_By: event.data.lab_Approved_By,
        is_Active: event.data.is_Active,
        remarks: event.data.remarks,
        resource_code: event.data.resource_code
      })
    }
    console.log(this.form.value);
    this.isEdit = true
    this.add_new_resource = true;
    //console.log(site)
    this.edit_form = true;
    this.SharedService.setresource_id(this.form.get('resource_Id').value );

  }

  onRowUnselect(event) {
    console.log('form reset');

    this.form.reset({
      site_Id: this.form.get('site_Id').value
    });
    this.isEdit = false
  }

  Addresourcedeposity() {
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
  onAccountSelectionChanges(event) {
    this.serviceService.site_Id = event.value;
    this.serviceService.site_Id = event.value;
    //  console.log('aaaa',event)
    this.isAccountModalVisible = false;


  }
  getsiteId() {
    this.ResourceDepositService.getsiteId().subscribe(
      (response) => {
        this.site_Id = response;
        this.accountNoo = refactorDropdownArray(
          this.site_Id,
          "site_Name",
          "site_Id"
        );
        // console.log("get-site_Id", response);
      },
      (error) => {
        // console.log("error-site_Id", error);
      }
    );
  }
  refactorChartOfAccountObject(object) {
    if (object.mineral_Id)
      object.mineral_Id = object.mineral_Id.mineral_Id || object.mineral_Id;

    if (object.crystal_Structure)
      object.crystal_Structure = object.crystal_Structure.crystal_Structure || object.crystal_Structure;

    if (object.hardness)
      object.hardness = object.hardness.hardness || object.hardness;

    if (object.lustre)
      object.lustre = object.lustre.lustre || object.lustre;

    if (object.diaphaneity)
      object.diaphaneity = object.diaphaneity.diaphaneity || object.diaphaneity;

    if (object.is_Active)
      object.is_Active = object.is_Active.is_Active || object.is_Active;



    return object;
  }

  gettype() {
    this.ResourceDepositService.getUnit().subscribe(
      (response: any) => {
        this.types = response;
        // console.log("response-lookup", this.types);
      })
  }
  gettypess() {
    this.ResourceDepositService.getmineralID().subscribe(
      (response: any) => {
        this.typess = response;
        // console.log("response-minral", this.typess);
      })
  }

  getResourceD() {
    this.ResourceDepositService.getResourceD().subscribe(
      (response: any) => {
        console.log("resource", response);

        response.map((res) => {
          res.explored_Date = res.explored_Date.slice(0, 10)
        });
        this.resoucedeposit = response;
        // this.fakeresoucedeposit = response

        for (let i = 0; i < this.resoucedeposit.length; i++) {
          if (this.resoucedeposit[i] != null || this.resoucedeposit[i] != undefined) {

            let Unit = this.types.filter(element => element.lkdetail_code === this.resoucedeposit[i].unit)
            // console.log("Uinit", Unit)
            if (Unit.length > 0) {
              let unitype = Unit[0].english_description
              this.unit = unitype
              // console.log("aaaaaa",
              // this.resoucedeposit[i].unit);
            }
            let Mineral = this.typess.filter(element => element.mineral_Id === this.resoucedeposit[i].mineral_Id)
            // console.log("Miinerallsss", Mineral)
            if (Mineral.length > 0) {
              let Mineraltype = Mineral[0].name

              // this.resoucedeposit[i].mineral_Id = Mineraltype
              this.resoucedeposit[i].mineral_type = Mineraltype
              // console.log("mineral name",
              // this.resoucedeposit[i].mineral_Id);
            }
          }
        }



      },
      // (error) => {
      //   const toast = this.notificationsService.error(
      //     "Error",
      //     "SomeThing Went Wrong"
      //   );
      // }
    );
  }

  addresourcedeposits() {

    this.resourcedeposits.site_Id = this.serviceService.site_Id;
    this.ResourceDepositService.addresourcedeposits(this.form.value)
      .subscribe(
        (response) => {
          this.getResourceD();
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
      this.getResourceD();
  }
  getmineralID() {
    console.log('mineral id');
    this.ResourceDepositService.getmineralID().subscribe(
      (response: any) => {
        this.accountNoos = response;
        // console.log('crystal structure',this.accountNoos );
        // console.log("get-getmineralID", response);
      },
      (error) => {
        // console.log("error-getmineralID", error);
      }
    );
  }
  searchChartOfAccount(event): void {
    this.chartOfAccountResult = this.chartOfAccounts.filter((c) =>
      c.unit.includes(event.query)
    );
  }
  selectresourced(resourcedeposits) {
    // console.log('fakeresoucedeposit',this.fakeresoucedeposit);
    this.add_new_resource = !this.add_new_resource;
    this.isEdit = true;
    // console.log('pag',resourcedeposits)
    this.edit_form = true;
    this.resourcedeposits = resourcedeposits;
    this.resourcedeposits.lab_Approved_Date = resourcedeposits.lab_Approved_Date.slice(0, 10);
    this.serviceService.resource_Id = resourcedeposits.resource_Id
    this.serviceService.mineral_Use = false;
  }
  clear() {
    console.log('clear');

    this.isEdit = false;
    this.form.reset({
      site_Id: this.form.get('site_Id').value
    });
    // console.log(this.resourcedeposits.resource_Id)
    // this.resourcedeposits.mineral_Id = ''
    // this.resourcedeposits.site_Id = ''
    // this.resourcedeposits.unit = ''
    // this.resourcedeposits.quantity = ''
    // this.resourcedeposits.explored_Date = ''
    // this.resourcedeposits.explored_By = ''
    // this.resourcedeposits.lab_Approved_Date = ''
    // this.resourcedeposits.lab_Approved_By = ''
    // this.resourcedeposits.is_Active = ''
    // this.resourcedeposits.remarks = ''
    // this.resourcedeposits.resource_code = ''

  }
  code = ()=> {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const output = `${year}${month}${day}-${hours}${minutes}${seconds}`;
    console.log(output);
    return 'RES_DEPO-' + output
  }
  saveData() {

    this.form.patchValue({
      resource_Id: Guid.create().toString(),
      resource_code: this.code()
    })
    this.SharedService.setresource_id(this.form.get('resource_Id').value );
    this.addresourcedeposits();

    console.log(this.workingUser);
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
    this.serviceService.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        // console.log("all-response", response);
        let licenceData = response["list"][0];
        // if(this.resourcedeposits['document_No']==null){
        //   this.resourcedeposits['document_No']=licenceData.Application_No}
        this.saveDataCompleted.emit(saveDataResponse);

        //if (this.editForm) this.updateTransactionSale();
        this.addresourcedeposits();
      },
      (error) => {
        // console.log("all-error" + error);
      }
    );
  }
  Updateresource() {
    this.SharedService.setresource_id(this.form.get('resource_Id').value );
    this.ResourceDepositService.Updateresource(this.form.value).subscribe(
      data => {
        const toast = this.notificationsService.success("Success", "Update");
        this.getResourceD();
      },
      error => {
        const toast = this.notificationsService.error('error', 'error', `unable update ! ${error['status'] == 0 ? error['message'] : JSON.stringify(error['error'])}`);
        // console.error('update site error', error);
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
  deleteresoucedeposit(id) {
    // this.form.get('resource_Id').value
    this.SharedService.setresource_id(id);
      this.ResourceDepositService.deleteresoucedeposit(id).subscribe((res) => {
        console.log(res);
        const toast = this.notificationsService.success("Sucess", '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
        this.getResourceD();
      }, (error) => {
        const toast = this.notificationsService.error("error", error.error, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
      );
  }
  clearForm() {
    this.resoucedeposit = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    // this.resoucedeposits.unit= Guid.create();
    this.resourcedeposits.resource_Id = Guid.create();
    this.resourcedeposits.resource_Id = this.resourcedeposits.resource_Id.value;

    // this.resoucedeposits.updateBy=this.user
  }
  onAccountSelectionChange(id) {
    this.form.patchValue({
      mineral_Id: id
    })
    // this.resoucedeposits.mineral_Id=  event.value;
    this.resourcedeposits.mineral_Id = id
    this.isAccountVisible = false;
    //  this.isAccountModalVisible = false;

  }
  addnewresource() {
    this.editable = false
    //this.noRecord=false
    this.add_new_resource = !this.add_new_resource;
    this.hide_data = !this.hide_data;
    this.row_clicked = false;
    this.addingNew.emit();
  }
}
class resourcedeposits {
  public resource_Id: any;
  public mineral_Id: any;
  public site_Id: any;
  public unit: any;
  public quantity: any;
  public explored_Date: any;
  public explored_By: any;
  public lab_Approved_Date: any;
  public lab_Approved_By: any;
  public is_Active: any;
  public remarks: any;
  public resource_code: any;
}
