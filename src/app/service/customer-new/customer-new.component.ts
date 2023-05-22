import { ServiceService } from './../service.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { Guid } from 'guid-typescript';
import * as Survey from 'survey-angular';
import { SharedService } from '../shared.service';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

  @ViewChild('table') table: Table;
  id= 'surveyElement'
  disp= 'surveyElemen'
  form: FormGroup = new FormGroup({
    customer_id: new FormControl(),
    json_value: new FormControl(),
    customer_field: new FormControl(),
    customer_code: new FormControl()
  })
  data:any
  survey: any;
  surveyType: any;
  jsonComplete: boolean = true;
  visible: boolean;
  json = {
    completedHtml:
      "<h3>Don't forget to save your work.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    completedHtmlOnCondition: [
      {
        expression: "{nps_score} > 8",
        html:
          "<h3>Don't forget to save your work.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
      },
      {
        expression: "{nps_score} < 7",
        html:
          "<h3>Don't forget to save your work.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br/>"
      }
    ],
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "rating",
            name: "nps_score",
            title:
              "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "(Most unlikely)",
            maxRateDescription: "(Most likely)"
          },
          {
            type: "checkbox",
            name: "promoter_features",
            visibleIf: "{nps_score} >= 9",
            title: "What features do you value the most?",
            isRequired: true,
            validators: [
              {
                type: "answercount",
                text: "Please select two features maximum.",
                maxCount: 2
              }
            ],
            hasOther: true,
            choices: [
              "Performance",
              "Stability",
              "User Interface",
              "Complete Functionality"
            ],
            otherText: "Other feature:",
            colCount: 2
          },
          {
            type: "comment",
            name: "passive_experience",
            visibleIf: "{nps_score} > 6  and {nps_score} < 9",
            title: "What is the primary reason for your score?"
          },
          {
            type: "comment",
            name: "disappointed_experience",
            visibleIf: "{nps_score} notempty",
            title:
              "What do you miss and what was disappointing in your experience with us?"
          }
        ]
      }
    ],
    showQuestionNumbers: "off"
  }
  customer: any
  customerTypedescription: any;
  customerType: any;

  constructor(private service: ServiceService,
    private notificationsService: NotificationsService,
    private sharedService: SharedService) { }
    isnew=false

  ngOnInit() {
    this.service.getCustomerNew().subscribe((res) => {
      console.log('customer',res);
      this.customer = res
    })

    this.service.getCustomerType().subscribe((res: any) => {
      this.customerType=res
      console.log('cus type',this.customerType);
      this.customerDynamicForm(this.customerType[0].json);
      this.form.patchValue({
        customer_field: res[0].customer_type_id
      })
    })
    this.code();
  }

  onChange(event) {
    // console.log('too',this.customerType);
    // console.log('too',event.value.customer_type_id);



    this.jsonComplete = true;
    this.form.patchValue({
      customer_field: event.value.customer_type_id
    })
    // console.log('customer_id',this.form.get('customer_field').value);
    // console.log('event',event.value);

    this.customerDynamicForm(event.value.json)
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
      customer_code: output
    })
  }

  customerDynamicForm(json) {
    this.survey =  new Survey.Model(json);
    setTimeout(() => { Survey.SurveyNG.render(this.id, { model: this.survey })}, 0);
    this.survey.onComplete.add(result => {
      this.form.patchValue({ json_value: JSON.stringify(result.data) })
      this.jsonComplete = false;
    });
    console.log('cus completed', this.form.value);
  }


  SaveData() {
    this.code();
    this.form.patchValue( { customer_id: Guid.create().toString() } )
    console.log(this.form.value);

    this.sharedService.setcustomer_id(this.form.get('customer_id').value );

    this.service.saveCustomerNew(this.form.value).subscribe((res) => {
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
    }
    )
  }

  UpdateData() {

    this.sharedService.setcustomer_id(this.form.get('customer_id').value );

    this.service.updateCustomerNew(this.form.value).subscribe((res) => {
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

  DeleteData() {

    this.sharedService.setcustomer_id(this.form.get('customer_id').value );

    this.service.deleteCustomerNew(this.form.get('customer_id').value ).subscribe((res) => {
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

}






    // viewform(data: any): any {
    //   this.surveyModel = new Survey.Model(JSON.parse(data));
    //   try {
    //     this.surveyModel.data = JSON.parse(this.formData);
    //   }
    //   catch {
    //     console.error('form data is not a correct json');
    //   }
    //   if (this.Mode) {
    //     console.log('if', data);

    //     this.surveyModel.mode = this.Mode;//'display';
    //     Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
    //   } else {
    //     console.log('else',data);

    //     Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
    //     this.surveyModel.onComplete.add(result => {
    //       this.completed.emit(result.data);
    //     });

    //   }

    // }

