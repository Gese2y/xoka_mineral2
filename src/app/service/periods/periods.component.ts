import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { PeriodsService } from './Periods.service';
@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.css']
})
export class PeriodsComponent implements OnInit {
  public periods: any;
  public procAdPeriods: procAdPeriods;
  public IsAddFormVisible = false;
  public name_Ens: any;
  public year: any;

  constructor(
    private PeriodsService: PeriodsService,
    private notificationsService: NotificationsService
    ) {
      this.procAdPeriods = new procAdPeriods();
     }

     ngOnInit() {
    
      this.getprocAdPeriods();
      // this.getorg_ID();
      this.getyear();
      // this.getisactive();
    }
  
    getprocAdPeriods() {
      this.PeriodsService.getprocAdPeriods().subscribe(
        (response) => {
          console.log("period", response);
          this.periods = response["procAdPeriodsLoadAlls"];
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
    }
    getisactive() {
      this.PeriodsService.getisactive().subscribe(
        (response) => {
          console.log("period", response);
          this.periods = response["procAdPeriodsLoadAlls"];
          this.periods = this.periods.filter(value => value['closed']==  true )
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
    }
    registerprocAdPeriods() {
      // if(this.procAdPeriods.year>3000 || this.procAdPeriods.year<1900){
      //   const toast = this.notificationsService.warn("Your entered year is incorrect! ");
      //   return true
      // }
      this.PeriodsService.addperiods(this.procAdPeriods)
        .subscribe(
          (response) => {
            this.getprocAdPeriods();
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
    }
    updateprocAdPeriods(periods) {
      this.PeriodsService.updateperiods(periods)
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
    deleteperiods(periods) {
      if (confirm("Are you sure you want to delete?  !!!"))
        this.PeriodsService.deleteperiods(periods)
          .subscribe(
            (response) => {
              this.getprocAdPeriods();
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
    // getorg_ID() {
    //   this.PeriodsService.getorg_ID().subscribe(
    //     (response) => {
    //       this.name_Ens = response["procADOrgLoadAlls"];
    //     },
    //     (error) => {
    //       console.log("error");
    //     }
    //   );
    // }
    getyear() {
      this.PeriodsService.getyear().subscribe(
        (response) => {
          this.year = response["procAdYearLoadAlls"];
        },
        (error) => {
          console.log("error");
        }
      );
    }
    performUpdate($event) {
      this.updateprocAdPeriods($event["data"]);
    }
    clearForm() {
      this.periods = {};
      this.IsAddFormVisible = !this.IsAddFormVisible;
    }
  }
  class procAdPeriods{
  startDate: any;
  endDate: any;
  // org_Id:any;
   name: any;
   date_Locked: any;
   new_Fiscal_Year: any;
  //  closed:any;
   year: any;
   inventory_Period_Closed: any;
  }