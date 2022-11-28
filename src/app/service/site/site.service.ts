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
  private Region =environment.rootApiPath + 'Regions';
  private Zone =environment.rootApiPath + 'Zones';
  private Woreda =environment.rootApiPath + 'Woredas';
  private StatusList =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Site_Status';

  private siteUrl =environment.rootApiPath + 'Site';
  DisplayCoordinate: boolean;
  zones_zone_code: any;

  constructor(private http: HttpClient) { }
  getSite_Status(){
    return this.http.get<any>(this.Site_Status);
  } 
  getRegion(){
    return this.http.get(this.Region);
  }
  getZone(){
    return this.http.get(this.Zone);
  } 
  getWoreda(){
    return this.http.get(this.Woreda);
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
  // updatemsite(site) {
  //   return this.http.put(this.siteUrl, site);
  // }
  updatesite(site) {
    return this.http.put(this.siteUrl+"/"+ site.site_Id,site) ;
  }
  getisactive() {
    return this.http.get(this.Zone);
  }

}
