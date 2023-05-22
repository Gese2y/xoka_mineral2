import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceDepositService {
  private Unit =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Unit';
  // private addresourcedepositsUrl =environment.rootApiPath + 'ResourceDeposit';
  public ResourceDUrl = environment.rootApiPath + "ResourceDeposit/";
  public mineralIDUrl = environment.rootApiPath + "Mineral";
  public siteIDUrl = environment.rootApiPath + "Site";
  resourcedeposits:any;
  // postresourcedeposit: any;
  constructor(private http: HttpClient) { }
  getResourceD() {
    let t = this.http.get(this.ResourceDUrl);
    t.subscribe(res => {
      console.log(res);

    });

    return t
  }

  postresourcedeposit(orgId, appCode, appNo, userId, taskId) {
    return this.http.get(environment.rootApiPath + "ResourceDeposit" + orgId + '/' + appCode + '/' + appNo + '/' + userId + '/' + taskId);
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
    return this.http.post(this.ResourceDUrl, resourcedeposits);
  }
  // getresourceDeposit() {
  //   return this.http.get(this.ResourceDUrl);
  // }
  deleteresoucedeposit(resoucedeposits) {
    return this.http.delete(
      this.ResourceDUrl + resoucedeposits
    );
  }
  // Updateresource(resourcedeposits) {
  //   return this.http.put(this.ResourceDUrl+"/"+ resourcedeposits.resource_Id,resourcedeposits) ;
  // }
  Updateresource(resourcedeposits) {
    return this.http.put(this.ResourceDUrl + "id?id=" + resourcedeposits.resource_Id, resourcedeposits) ;
  }

}
