import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) { }
  localGeoJsonUrl = environment.localGisServer;
  geoPortalUrl = environment.wfsGeoServer;
  
  Geological_structure =
  "http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wms?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Geological_structure";
  getGeological_structure() {
    return this.httpClient.get(this.Geological_structure);
  }
  ororegion =
  "http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wms?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Oromia_region";
  getororegion() {
    return this.httpClient.get(this.ororegion);
  }
  oroLicensearea =
  "http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Licensearea";
  getLicensearea() {
    return this.httpClient.get(this.oroLicensearea);
  }
  ororoad =
  "http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Oro_road";
  getororoad() {
    return this.httpClient.get(this.ororoad);
  }
  oromineral =
    "http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Oromiaminerals1";
    getOrominerals1() {
      return this.httpClient.get(this.oromineral);
    }


 }
