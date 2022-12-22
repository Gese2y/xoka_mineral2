import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { observable } from "knockout";
import * as xmljs from "xml-js";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GisService {
  localGeoJsonUrl = environment.localGisServer;
  geoPortalUrl = environment.wfsGeoServer;
  featureid: any;

  constructor(private httpClient: HttpClient) {}

 Geological_structure =
    "http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Geological_structure";
    getGeological_structure() {
      return this.httpClient.get(this.Geological_structure);
    }
    ororegion =
    "http://192.168.0.133:8082/geoserver/Oromia_mine_Authority/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=Oromia_region";
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






  public getListOfGeoJson() {
    return this.httpClient.get(
      // `${this.localGeoJsonUrl}/getcapabilities.php`
      `${this.localGeoJsonUrl}/getcapabilities.json`
    );
  }

  public getGeoJsonData(whichGeoJson): Observable<any> {
    return this.httpClient.get(
      `${this.localGeoJsonUrl}/getFeatures/${whichGeoJson}`
    );
  }

  eth_thermal =
    "http://192.168.0.133:8082/geoserver/ETH_Geo_Th_Cadasteral/ows?service=wms&version=2.15.1&request=GetCapabilities";
  public getCapabilities() {
    // let options: object = {
    //   params: {
    //     service: "wfs",
    //     version: "2.0.0",
    //     request: "GetCapabilities",
    //   },
    //   responseType: "text",
    // };
    // // return this.httpClient.get(this.geoPortalUrl, options);
    // return this.httpClient.get(this.eth_thermal);

    return this.httpClient
      .get(this.eth_thermal, {
        headers: this.options.headers,
        responseType: "text",
      })
      .pipe(
        map((res) => {
          return xmljs.xml2js(res, { compact: true });
        })
      );
  }

  geodesktop =
    "http://192.168.0.133:8082/geoserver/yaspace/ows?service=wms&version=2.15.1&request=GetCapabilities";
  private options = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  public getCapabilitiesGeodesk() {
    return this.httpClient
      .get(this.geodesktop, {
        headers: this.options.headers,
        responseType: "text",
      })
      .pipe(
        map((res) => {
          return xmljs.xml2js(res, { compact: true });
        })
      );
  }

  geoDeskurl =
    "http://192.168.0.133:8082/geoserver/yaspace/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=";
  getGeodeskFeatures(layer) {
    return this.httpClient.get(`${this.geoDeskurl}${layer}`);
  }

  EthCadasteral =
    "http://192.168.0.133:8082/geoserver/ETH_Geo_Th_Cadasteral/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=";
  getEthCadasteralFeatures(layer) {
    return this.httpClient.get(`${this.EthCadasteral}${layer}`);
  }

  public promiseGetCapabilities(): Promise<any> {
    return fetch(
      `${this.geoPortalUrl}?service=wfs&version=2.0.0&request=GetCapabilities`
    );
  }

  public getFeatures(typeName, outputFormat) {
    let options = {
      params: {
        service: "wfs",
        version: "2.0.0",
        request: "getFeature",
        typeNames: typeName,
        outputFormat: outputFormat,
      },
    };

    return this.httpClient.get(this.geoPortalUrl, options);
  }

  public getFeatureTypeDescription(typeName, outputFormat, exceptionsFormat) {
    let options = {
      params: {
        service: "wfs",
        version: "2.0.0",
        request: "DescribeFeatureType",
        typeNames: typeName,
        exceptions: exceptionsFormat,
        outputFormat: outputFormat,
      },
    };

    return this.httpClient.get(this.geoPortalUrl, options);
  }
}
