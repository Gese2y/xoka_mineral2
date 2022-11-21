import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { SiteService } from '../site/site.service';
// import { site } from '../site-list/site-list.component';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private Site_Status =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Site_Status';
  private Region =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Region';
  private Zone =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Zone';
  private Woreda =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Woreda';
  private StatusList =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Site_Status';

  private siteUrl =environment.rootApiPath + 'Site';
  DisplayCoordinate: boolean;

  constructor(private http: HttpClient) { }
  getSite_Status(){
    return this.http.get<any>(this.Site_Status);
  } 
  getRegion(){
    return this.http.get<any>(this.Region);
  }
  getZone(){
    return this.http.get<any>(this.Zone);
  } 
  getWoreda(){
    return this.http.get<any>(this.Woreda);
  }
  addsite(site) {
    return this.http.post(this.siteUrl, site);
  }
  getsite() {
    return this.http.get(this.siteUrl);
  }
  registersite(site) {
    return this.http.post(this.siteUrl, site);
  }
  getStatusList(){
    return this.http.get<any>(this.StatusList);
  }
  deletesites(site) {
    return this.http.delete(
      this.siteUrl + "/" + site.site_Id
    );
  }
  updatesite(site) {
    return this.http.put(this.siteUrl, site);
  }

}
