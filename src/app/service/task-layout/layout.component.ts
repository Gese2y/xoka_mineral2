import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Survey from 'survey-angular';
import {LayoutService} from './layout.service';
import {ActivatedRoute, Params} from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-servy',
  templateUrl: `layout.component.html`,
  styleUrls: ['styles.css']
})
export class SurveyComponent implements OnInit {
  @Output() completed = new EventEmitter();
  @Input() formData;
  @Input() formcode;
  @Input() Mode;
  surveyModel: any;
  json;
  data: any;
  ID = 'surveyElement';
  param;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: LayoutService, 
    private serviceService: ServiceService) {
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.formcode = params['formcode'];
      var docid = params['docid'];
      if (docid == undefined) docid = params['formcode'];
      this.param = params;
      // console.log(this.param)
      // console.log(this.service.getFormData(this.formcode));
      this.serviceService.GetForm(docid).subscribe(data => {

        if (data != 'No Data') {
          try {
            this.formData = JSON.parse((data as any));
          }
          catch (e) {
            this.formData = {};
            console.error('form data is not a correct json');
          }
        }

        this.service.getFormData(this.formcode, 2).subscribe(data => {
          this.viewform(data);
        }, error => console.log(error));

      }, error => console.log(error));
      // console.log(this.data);
      // this.surveyModel = new Survey.Model(this.data);
      // Survey.SurveyNG.render('surveyElement', {model: this.surveyModel});
    });
  }


  viewform(data: any): any {
    this.surveyModel = new Survey.Model(data);
    try {
      this.surveyModel.data = JSON.parse(this.formData);
    }
    catch {
      console.error('form data is not a correct json');
    }
    if (this.Mode) {
      this.surveyModel.mode = this.Mode;//'display';
      Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
    } else {
      Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
      this.surveyModel.onComplete.add(result => {
        this.completed.emit(result.data);
      });

    }

  }

}
