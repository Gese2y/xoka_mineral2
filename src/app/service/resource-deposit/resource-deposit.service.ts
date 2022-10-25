import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceDepositService {
  private Unit =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Unit';
  private addresourcedepositsUrl =environment.rootPath + '';

  public mineralIDUrl = environment.rootPath2 + "";
  public siteIDUrl = environment.rootPath2 + "";
  
  constructor(private http: HttpClient) { }

  getmineralID() {
    return this.http.get(this.mineralIDUrl);
  }
  getsiteID() {
    return this.http.get(this.siteIDUrl);
  }
  getUnit(){
    return this.http.get<any>(this.Unit);
  } 
  addresourcedeposits(resourcedeposits) {
    return this.http.post(this.addresourcedepositsUrl, resourcedeposits);
  }
  getresourceDeposit() {
    return this.http.get(this.addresourcedepositsUrl);
  }
}
