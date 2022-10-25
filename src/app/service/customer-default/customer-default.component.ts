import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-default',
  templateUrl: './customer-default.component.html',
  styleUrls: ['./customer-default.component.css']
})
export class CustomerDefaultComponent implements OnInit {


  public CustomerDefault : any;
  // public GLExpenseAccounts : any;

  public GLExpenseAccounts:GLExpenseAccount;
  public DiscountGLAccounts : any;
  public PaymentMethodTypes : any;
   
  

  constructor() { 
  this.GLExpenseAccounts = new  GLExpenseAccount}
  ngOnInit() {
  }

}
export class GLExpenseAccount{
  Id :any;
  Name :any;
}