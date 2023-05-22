import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GisPlotService {

  constructor(private http: HttpClient) { }
  // adminborder:ETH_Regions
  // geoDeskurl =
  //   "http://192.168.0.133:8082/geoserver/adminBorderZoneRegion/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=";
  geoDeskurl =
  "http://192.168.0.133:8082/geoserver/publicGeoThermal/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=";
  // geoDeskurl =
  // "http://192.168.0.133:8082/geoserver/adminborder/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=";

  getBordereatures(layer: any) {
  return this.http.get(`${this.geoDeskurl}${layer}`);
}

getAllLicences() {
  return this.http.get('http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Licensearea')
}
}
