import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private Status =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Status';
  private Region =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Region';
  private Zone =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Zone';
  private Woreda =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Woreda_Lookup';

  private siteUrl =environment.rootPath + '';
  DisplayCoordinate: boolean;


  constructor(private http: HttpClient) { }
  getStatus(){
    return this.http.get<any>(this.Status);
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
  addsite(sites) {
    return this.http.post(this.siteUrl, sites);
  }
  getsite() {
    return this.http.get(this.siteUrl);
  }
}
