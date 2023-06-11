import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UnitOfMeasureService } from './unit-of-measure.service';
import { ServiceComponent } from '../service.component';

@Component({
  selector: 'app-unit-of-measure',
  templateUrl: './unit-of-measure.component.html',
  styleUrls: ['./unit-of-measure.component.css']
})
export class UnitOfMeasureComponent implements OnInit {
public UnitofMeasure: any;
public UnitofMeasures:UnitofMeasures;
public IsAddFormVisible = false;


  constructor(
    private UnitofMeasuresService: UnitOfMeasureService,
    public serviceComponent: ServiceComponent,
    private notificationsService: NotificationsService
  ) {
    this.UnitofMeasures = new UnitofMeasures();
  }

  ngOnInit() {
  this.getUnitofMeasures();
   
  }
  getUnitofMeasures() {
    this.UnitofMeasuresService.getUnitofMeasure().subscribe(
      (response) => {
        console.log("group", response);
        this.UnitofMeasure =
          response["proccUnits"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  registerUnitofMeasures() {
    this.UnitofMeasuresService
      .addUnitofMeasures(this.UnitofMeasures)
      .subscribe(
        (response) => {
          this.getUnitofMeasures();
          const toast = this.notificationsService.success("Success", "Saved");
          this.serviceComponent.disablefins=false
          this.clearForm();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  deleteUnitofMeasures(UnitofMeasures) {
    if (confirm("Are you sure want to delete?"))
      this.UnitofMeasuresService
        .deleteUnitofMeasures(UnitofMeasures)
        .subscribe(
          (response) => {
            this.getUnitofMeasures();
            const toast = this.notificationsService.success("Success", "Successfuly Deleted");
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
  updateUnitofMeasures(UnitofMeasures) {
    this.UnitofMeasuresService
      .updateUnitofMeasures(UnitofMeasures)
      .subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "Updated");
          this.serviceComponent.disablefins=false
          this.getUnitofMeasures();
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
  performUpdate($event) {
    this.updateUnitofMeasures($event["data"]);
  }

  clearForm() {
   this.UnitofMeasure = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

export class UnitofMeasures {
  unit : any
  description : any
}

