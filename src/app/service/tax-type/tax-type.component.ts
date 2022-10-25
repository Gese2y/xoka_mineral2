import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import { TaxTypeService } from './tax-type.service';

@Component({
  selector: 'app-tax-type',
  templateUrl: './tax-type.component.html',
  styleUrls: ['./tax-type.component.css']
})
export class TaxTypeComponent implements OnInit {
 
  public taxtypes: any;
  public taxtype: taxtype;
  public IsAddFormVisible = false;
  public name_Ens: any;

  constructor(
    private TaxTypeService: TaxTypeService,
    private notificationsService: NotificationsService
  ) {
    this.taxtype = new taxtype();
  }

  ngOnInit() {
    this.gettaxtype();
    this.getorg_ID();
  }

  gettaxtype() {
    this.TaxTypeService.gettaxtype().subscribe(
      (response) => {
        console.log("group", response);
        this.taxtypes = response["procCTaxs"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registertaxtype() {
    this.TaxTypeService
      .addtaxtypes(this.taxtype)
      .subscribe(
        (response) => {
          this.gettaxtype();
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
  getorg_ID() {
    this.TaxTypeService.getorg_ID().subscribe(
      (response) => {
        this.name_Ens = response["procADOrgLoadAlls"];
      },
      (error) => {
        console.log("error");
      }
    );
  }  
  updatetaxtype(taxtype) {
    this.TaxTypeService
      .updatetaxtypes(taxtype)
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



  deletetaxtypes(taxtypes) {
  
    if (confirm("Are you sure !!!"))
      this.TaxTypeService
        .deletetaxtypes(taxtypes)
        .subscribe(
          (response) => {
            this.gettaxtype();
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


  performUpdate($event) {
    this.updatetaxtype($event["data"]);
  }

  clearForm() {
    this.taxtypes = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class taxtype {
  org_ID: any;
  code: any;
  description: any;
  enable: any;
}
