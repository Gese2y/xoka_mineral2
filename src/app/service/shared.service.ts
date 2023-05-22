import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private customer_id = new BehaviorSubject<any>(null);
  customer_id$ = this.customer_id.asObservable();

  private mineral_use_id = new BehaviorSubject<any>(null);
  mineral_use_id$ = this.mineral_use_id.asObservable();

  private license_id = new BehaviorSubject<any>(null);
  license_id$ = this.license_id.asObservable();

  private site_id = new BehaviorSubject<any>(null);
  site_id$ = this.site_id.asObservable();

  private resource_id = new BehaviorSubject<any>(null);
  resource_id$ = this.resource_id.asObservable();

  setresource_id(state: any) {
    this.resource_id.next(state);
  }

  getresource_id() {
    return this.resource_id.getValue();
  }

  setsite_id(state: any) {
    this.site_id.next(state);
  }

  getsite_id() {
    return this.site_id.getValue();
  }

  setlicense_id(state: any) {
    this.license_id.next(state);
  }

  getlicense_id() {
    return this.license_id.getValue();
  }


  setmineral_use_id(state: any) {
    this.mineral_use_id.next(state);
  }

  getmineral_use_id() {
    return this.mineral_use_id.getValue();
  }

  setcustomer_id(state: any) {
    this.customer_id.next(state);
  }

  getcustomer_id() {
    return this.customer_id.getValue();
  }


}
