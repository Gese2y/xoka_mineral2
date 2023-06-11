import { SharedService } from './../shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import { Table } from 'primeng/table';
import { formatDate } from '@angular/common';
import { ServiceComponent } from '../service.component';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  license: any;


  constructor(private service: ServiceService,
    private notificationsService: NotificationsService,
    public serviceComponent: ServiceComponent,
    private sharedService: SharedService) { }

  @ViewChild('table') table: Table;
  isnew = false
  formLice: FormGroup = new FormGroup({
    license_id: new FormControl(),
    mineral_use_id: new FormControl(),
    customer_id: new FormControl(),
    registered_date: new FormControl(new Date().toISOString().substr(0, 10)),
    created_by: new FormControl(),
    created_date: new FormControl(new Date().toISOString().substr(0, 10)),
    license_code: new FormControl()
  })
  ngOnInit() {
    this.sharedService.customer_id$.subscribe(state => {
      this.formLice.patchValue({ customer_id: state })
    })

    this.sharedService.mineral_use_id$.subscribe(state => {
      this.formLice.patchValue({ mineral_use_id: state })
    })

    this.getAllLicense()
    this.code()
  }

  getAllLicense() {
    this.service.getLicense().subscribe(res => {
      this.license = res
    })
  }

  clear() {
    this.isnew = false
    this.formLice.reset({
      mineral_use_id: this.formLice.get('mineral_use_id').value,
      customer_id: this.formLice.get('customer_id').value
    });
    this.code()
  }

  onRowSelect(event) {
    this.isnew=true
    console.log('event.data', event.data);
    this.formLice.patchValue({
      license_id: event.data.license_id,
      mineral_use_id: event.data.mineral_use_id,
      customer_id: event.data.customer_id,
      registered_date: formatDate(event.data.registered_date,"yyyy-MM-dd", "en"),
      created_by: event.data.created_by,
      created_date: formatDate(event.data.created_date,"yyyy-MM-dd", "en")
    });
    this.sharedService.setlicense_id(this.formLice.get('license_id').value );
  }

  onRowUnselect() {
    this.formLice.reset({
      mineral_use_id: this.formLice.get('mineral_use_id').value,
      customer_id: this.formLice.get('customer_id').value
    });
  }

  code() {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const output = `${year}${month}${day}-${hours}${minutes}${seconds}`;
    console.log(output);
    this.formLice.patchValue({
      license_code : output
    })
  }

  SaveData() {
    this.formLice.patchValue( { license_id: Guid.create().toString() })
    console.log(this.formLice.value);
    this.sharedService.setlicense_id(this.formLice.get('license_id').value );

    this.service.saveLicense(this.formLice.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
       // this.serviceComponent.disablefins=false
      this.isnew = true
      this.getAllLicense();
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    );
  }

  UpdateData() {
    this.sharedService.setlicense_id(this.formLice.get('license_id').value );

    this.service.updateLicense(this.formLice.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
       // this.serviceComponent.disablefins=false
      this.getAllLicense();
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

  DeleteData() {
    this.sharedService.setlicense_id(this.formLice.get('license_id').value );

    this.service.deleteLicense(this.formLice.get('license_id').value ).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      this.getAllLicense();
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

}
