import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import{CurrencyService} from '../currency/currency.service';
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  
  public currencys: any;
  public currency: Currency;
  public IsAddFormVisible = false;

  constructor(
    private CurrencyService: CurrencyService,
    private notificationsService: NotificationsService
  ) {
    this.currency = new Currency();
  }

  ngOnInit() {
    this.getcurrencyss();
  }
  getcurrencyss() {
    this.CurrencyService.getcurrencyss().subscribe(
      (response) => {
        console.log("group", response);
        this.currencys = response["currencyIDs"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerCurrency() {
    this.CurrencyService
      .addcurrencyss(this.currency)
      .subscribe(
        (response) => {
          this.getcurrencyss();
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

  updatecurrencyss(currency) {
    this.CurrencyService
      .updatecurrencyss(currency)
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

  deleteCurrency(currency) {
    if(confirm("Are you sure you went to delete !!"))
    this.CurrencyService
      .deletecurrencyss(currency)
      .subscribe(
        (response) => {
          this.getcurrencyss();
          const toast = this.notificationsService.success("Success", "Deleted");
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
    this.updatecurrencyss($event["data"]);
  }

  clearForm() {
    this.currencys = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class Currency {
  currencyID: any;
  name: any ;
  enable: any;
  current_Value_To_Birr: any;
}
