import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MineralUseService {
  public mineralUseUrl = environment.rootPath2 + "";
  public Customer_IDUrl = environment.rootPath2 + "";
  public ResourceIDUrl = environment.rootPath2 + "";
  public siteIDUrl = environment.rootPath2 + "";

  constructor(private http: HttpClient) { }
  getCustomer_ID() {
    return this.http.get(this.Customer_IDUrl);
  }
  getResourceID() {
    return this.http.get(this.ResourceIDUrl);
  }
  getplotID() {
    return this.http.get(this.siteIDUrl);
  }
  getmineralUse() {
    return this.http.get(this.mineralUseUrl);
  }
}
