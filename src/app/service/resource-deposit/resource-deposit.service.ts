import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceDepositService {
  private Unit =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Unit';
  private addresourcedepositsUrl =environment.rootApiPath + 'ResourceDeposit';
  public ResourceDUrl = environment.rootApiPath + "ResourceDeposit";
  public mineralIDUrl = environment.rootApiPath + "Mineral";
  public siteIDUrl = environment.rootApiPath + "Site";
  
  constructor(private http: HttpClient) { }
  getResourceD() {
    return this.http.get(this.ResourceDUrl);
  }


  getmineralID() {
    return this.http.get(this.mineralIDUrl);
  }
  getsiteId() {
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
  deleteresoucedeposit(resoucedeposits) {
    return this.http.delete(
      this.ResourceDUrl + "/" + resoucedeposits.resource_Id
    );
  }
}
