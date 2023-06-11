import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import { SharedService } from '../shared.service';
import { Table } from 'primeng/table';
import { formatDate } from '@angular/common';
import { ServiceComponent } from '../service.component';

@Component({
  selector: 'app-renewal-information',
  templateUrl: './renewal-information.component.html',
  styleUrls: ['./renewal-information.component.css']
})
export class RenewalInformationComponent implements OnInit {

  @ViewChild('table') table: Table;
  @Output() completed = new EventEmitter();
  @ViewChild('tabletype') tabletype: Table;
  form: FormGroup = new FormGroup({
    renewal_id: new FormControl(),
    license_id: new FormControl(),
    start_date: new FormControl(new Date().toISOString().substr(0, 10)),
    end_date: new FormControl(new Date().toISOString().substr(0, 10)),
    document: new FormControl(),
    renewal_type_id: new FormControl(),
    renewal_code: new FormControl()
  })
  formtype: FormGroup = new FormGroup({
    renewal_type_id: new FormControl(),
    name: new FormControl()
  })
  isnew:boolean=false
  isnewtype:boolean=false
  renewal;
  renewaltype;
  Saved: any;

  constructor(private service: ServiceService,
    private notificationsService: NotificationsService,
    public serviceComponent: ServiceComponent,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.license_id$.subscribe(state => {
        console.log(state);

        this.form.patchValue({ license_id: state })
      })

      this.getAllRenewalInformation()

      this.service.getRenewalType().subscribe((res) => {
        console.log('res',res);
        this.renewaltype = res
      })
      this.code();
    }
    getAllRenewalInformation() {
      this.service.getRenewal().subscribe((res: any) => {
        this.renewal = res
        const too = res
        //////       continiue fro this
        res.forEach(element => {
          this.service.getRenewalTypeById(element.renewal_type_id).subscribe((response: any ) => {
            element.renewal_type_name = response[0].name
            console.log(response);

          })
        });
        this.renewal = res
        console.log('res',res,this.renewal);
      })
    }

    visible: boolean;

  showDialog() {
    this.visible = true;
   }

  clear() {
    this.isnew=false
    this.form.reset({
      renewal_id: this.form.get('renewal_id').value,
      license_id: this.form.get('license_id').value
    });
    this.code()
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
    this.form.patchValue({
      renewal_code: output
    })
  }

  cleartype() {
    this.form.reset({
      renewal_type_id: this.form.get('renewal_type_id').value
    });
  }

  onRowSelect(event) {
    this.getAllRenewalInformation()
    this.isnew=true
    console.log('event.data', event.data);
    this.form.patchValue({
      renewal_id: event.data.renewal_id,
      renewal_type_id: event.data.renewal_type_id,
      license_id: event.data.license_id,
      start_date: formatDate(event.data.start_date,"yyyy-MM-dd", "en"),
      end_date: formatDate(event.data.end_date,"yyyy-MM-dd", "en"),
      document: event.data.document
    });
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.patchValue({
        document: reader.result
      })
      console.log(reader.result);
    };
  }

  onRowUnselect() {
    this.form.reset();
  }

  onRowSelecttype(event) {
    this.visible = false;
    this.form.patchValue({
      renewal_type_id: event.data.renewal_type_id })

      console.log('event.data', event.data);
      this.formtype.patchValue({
        name: event.data.name,
        renewal_type_id: event.data.renewal_type_id
      });
      this.isnewtype=false
  }

  onRowUnselecttype() {
    this.formtype.reset();
  }

  SaveData() {

    this.form.patchValue( { renewal_id: Guid.create().toString() })

    this.service.saveRenewalInformation(this.form.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      this.isnew=true
      this.serviceComponent.disablefins=false
      if (!this.Saved) {
        this.completed.emit();
        this.Saved = true;
      }
      this.getAllRenewalInformation()
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    )
  }

  UpdateData() {
    this.service.updateRenewalInformation(this.form.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      if (!this.Saved) {
        this.completed.emit();
        this.Saved = true;
      }
      this.serviceComponent.disablefins=false
      this.getAllRenewalInformation()
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    )
  }

  DeleteData() {
    this.service.deleteRenewalInformation(this.form.get('renewal_id').value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      this.getAllRenewalInformation()
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    )
  }

  SaveDataType() {
    this.visible = false;
    this.formtype.patchValue({ renewal_type_id: Guid.create().toString() })
    this.form.patchValue({ renewal_type_id:  this.formtype.get('renewal_type_id').value})
    console.log(this.form.value);
    console.log(this.formtype.value);

    this.service.saveRenewalType(this.formtype.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      this.isnewtype=true
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    )
    this.visible = false;
  }

  UpdateDataType() {
    this.visible = false;
    this.form.patchValue({ renewal_type_id: this.formtype.get('renewal_type_id').value })
    this.service.updateRewalType(this.formtype.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    )
  }

  DeleteDataType() {
    this.form.patchValue({ renewal_type_id: this.formtype.get('renewal_type_id').value })

    this.service.deleteRenewalType(this.formtype.get('renewal_type_id').value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    )
    this.visible = false;
  }

}
