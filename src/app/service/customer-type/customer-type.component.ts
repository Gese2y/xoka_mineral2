import { ServiceService } from './../service.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Table } from 'primeng/table';
import { Guid } from 'guid-typescript';
import * as Survey from 'survey-angular';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.css']
})
export class CustomerTypeComponent implements OnInit {

  formType: FormGroup = new FormGroup({
    customer_type_id: new FormControl(),
    json: new FormControl(),
  })
  jsonType = {
    "completedHtml": "<h3>Thank you for your feedback</h3>",
    "completedHtmlOnCondition": [
     {
      "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you love our product. Your ideas and suggestions will help us make it even better.</h4>"
     },
     {
      "html": "<h3>Thank you for your feedback</h3> <h4>We are glad that you shared your ideas with us. They will help us make our product better.</h4>"
     }
    ],
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "question1",
        "title": "comment"
       }
      ]
     }
    ],
    "showQuestionNumbers": "off"
   }
  surveyType: Survey.Survey;
  @ViewChild('table') table: Table;
  @Input() data
  @Output()
    public onData: EventEmitter<any> = new EventEmitter<any>();
  disable = true;
  isnew:boolean=false
  customerType: any;

  constructor(
    private service: ServiceService,
    private notificationsService: NotificationsService
    ) { }

  ngOnInit() {
    this.surveyType = new Survey.Model(this.jsonType);
    setTimeout(() => {
      Survey.SurveyNG.render('surveyDisplay', { model: this.surveyType });
    }, 2);

    this.service.getCustomerType().subscribe(res => {
      this.customerType = res
    })

    this.surveyType.onComplete.add(result => {
      console.log('Type completed');
      this.formType.patchValue({
        customer_type_id: Guid.create().toString(),
        json:  JSON.stringify(result.data)
      })
      console.log('completed', this.formType.value);
      this.disable = false
    });
  }

  onRowSelect(event) {
    this.isnew=true
    console.log('event.data', event.data);
    this.formType.patchValue({
      customer_type_id: event.data.customer_type_id,
      json: event.data.json
    });
  }

  onRowUnselect() {
    this.formType.reset();
  }

  clear() {
    this.formType.reset({
      customer_type_id: this.formType.get('customer_type_id').value
    });
  }

  SaveData() {


    this.service.saveCustomerType(this.formType.value).subscribe((res) => {
      console.log(res);
      const toast = this.notificationsService.success("Sucess", '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      this.isnew=true
    }, (error) => {
      const toast = this.notificationsService.error("error", error.error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    })
    this.onData.emit(this.formType.get('customer_type_id').value)
  }

  UpdateData() {
    this.service.updateRenewalInformation(this.formType.value).subscribe((res) => {
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
    this.onData.emit(this.formType.get('customer_type_id').value)
  }

  DeleteData() {
    this.service.deleteRenewalInformation(this.formType.get('customer_type_id').value).subscribe((res) => {
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
    this.onData.emit(this.formType.get('customer_type_id').value)
  }

}
