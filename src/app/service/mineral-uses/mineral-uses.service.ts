import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MineralUsesService {
  //public mineralUseUrl = environment.rootPath2 + "MineralUse";
  public mineralUseUrl = environment.rootApiPath + "MineralUse"; 
  public Customer_IDUrl = environment.rootApiPath + "Customer";
  public ResourceIDUrl = environment.rootApiPath + "ResourceDeposit";
  public plotIDUrl = environment.rootApiPath + "PlotRegistration";
  private siteUrl =environment.rootApiPath + 'Site';
  DisplayCoordinate: boolean;
  gis_Plot_Id:any;
 
  constructor(private http: HttpClient) { }
  getCustomer_ID() {
    return this.http.get(this.Customer_IDUrl);
  }
  getresourceId() {
    return this.http.get(this.ResourceIDUrl);
  }
  // getplotID() {
  //   return this.http.get(this.plotIDUrl);
  // } 
  getgisplotID() {
    return this.http.get(this.plotIDUrl);
  }
  getmineralUse() {
    return this.http.get(this.mineralUseUrl);
  }
  registermineralUse(mineralUse) {
    return this.http.post(this.mineralUseUrl, mineralUse);
  }
  deletemineralUse(mineralUse) {
    return this.http.delete(
      this.mineralUseUrl + "/" + mineralUse.resource_Id

    );
  }
  getsite() {
    return this.http.get(this.siteUrl);
  }
  Updatemineraluse(mineralUse) {
    return this.http.put(this.mineralUseUrl+'/id', mineralUse) ;
  }
}
