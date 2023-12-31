import { Component, AfterViewInit, Output, EventEmitter, Input } from "@angular/core";
import { EventEmitter as NativeEmitter } from "events";
import * as L from "leaflet";
import * as Uniqolor from "uniqolor";
import * as FastXml from "fast-xml-parser";
import { GisService } from "./gis.service";
import { PopupService } from "src/app/pro-service/popup.service";
import { ServiceService } from "../service.service";
import { SiteService } from "../site/site.service";

import { parseIsoWeekday } from "ngx-bootstrap/chronos/units/day-of-week";

@Component({
  selector: "app-gis",
  templateUrl: "./gis.component.html",
  styleUrls: ["./gis.component.css"],

})
export class GisComponent implements AfterViewInit {
  @Output() gooo = new EventEmitter();
  @Output() passId = new EventEmitter();
  private map;
  private centerCoordinate: L.LatLngExpression = [9.03, 38.74];
  private zoomLevel = 6;
  public geoJsonLayers = [];
  public listOfLayers = [];
  public coordinate = {
    lon: null,
    lat: null,
  };
  public osmTile;
  public outputFormats = {
    GML2: "GML2",
    GML3: "GML3",
    Shapefile: "shape-zip",
    JSON: "application/json",
    JSONP: "text/javascript",
    CSV: "csv",
  };
  featureid:any
  private mapViewEvents = new NativeEmitter();
  private clickCoordinate: any;
  serviceService: any;
  ismapVisiblees: boolean;

  constructor(private gisService: GisService, private popup: PopupService ,
    private ServiceService : ServiceService , public siteSer:SiteService,
    ) {}

  ngOnInit() {
    this.initmap()
    // this.gis.getGeological_structure().subscribe((res: any) => {
    //   console.log('rs from oro min ',res);
    //   L.geoJSON(res).addTo(this.map)

    // })


  }
  initmap() {
    this.map = L.map("map", {
        center: [
            9.145, 40.4897
        ],
        zoom: 6
    });

    const baselayers = {
        openstreetmap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ),

        VMap: L.tileLayer("https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=8fb3246c12d442525034be04bcd038f22e34571be4adbd4c")
    };
    var overlays = {};

        L.control.layers(baselayers, overlays).addTo(this.map);

        baselayers["openstreetmap"].addTo(this.map);
  }

  // `<div><div>${features.id}</div>`
  //         + `<div>${features.properties.Area}</div>`
  //         + `<div>${features.properties.Commodit}</div>`
  //         + `<div>${features.properties.Map_Refe}</div></div>`


  Licensearea() {
    let a = this
    this.gisService.getLicensearea().subscribe((res: any) => {
      console.log('rs from oro min ',res);
      L.geoJSON(res, {
        onEachFeature: function(features, layer) {
          layer.on("click",() => {

            this.featureid=features
            a.ServiceService.featureid=this.featureid
            const b:string = this.featureid.id
            a.siteSer.featureid = b

            // this.gisPlotId=features
            // a.ServiceService.gisPlotId=this.gisPlotId
            // const c:string = this.gisPlotId.id
            // a.siteSer.gisPlotId = c
            // this.passId.emit(gisPlotId)
            console.log("features.id:", this.featureid);

          });



        }
      }).addTo(this.map)

    })
  }
  @Input() public id:any
  onPlotSelectfun(id){


  }
  region() {
    this.gisService.getororegion().subscribe((res: any) => {
      console.log('rs from oro min ',res);
      L.geoJSON(res).addTo(this.map)

    })
  }
  ororoad() {
    this.gisService.getororoad().subscribe((res: any) => {
      console.log('rs from oro min ',res);
      L.geoJSON(res).addTo(this.map)

    })
  }
  minerals1() {
    this.gisService.getOrominerals1().subscribe((res: any) => {
      console.log('rs from oro min ',res);
      L.geoJSON(res).addTo(this.map)

    })
  }





  ngAfterViewInit() {
    this.initWhenReady();
  }

  private initWhenReady() {
    let checkMapElement = setInterval(() => {
      let mapElement = document.getElementById("map");
      if (mapElement) {
        this.initMap();
        clearInterval(checkMapElement);
      }
    }, 500);
  }

  selectPlotId(event) {
    console.log("plot id selected :: ", event);
  }


  public getCoordOnClick(event) {
    let convertedEvent = this.map.mouseEventToLatLng(event);
    this.clickCoordinate = convertedEvent;
    // this.serviceService.coordinate =  this.clickCoordinate
    console.log("converted event :: ", convertedEvent);
    this.ismapVisiblees = false

    // let markerOption = {
    //   icon: L.Icon.Default,
    //   title: `lat: ${convertedEvent.lat}, lng: ${convertedEvent.lng}`
    // };
    // marker
    // let coordMarker = L.marker(convertedEvent).addTo(this.map);
    // coordMarker.bindPopup().openPopup();

    // popup
    // let popupOptions = {
    //   closeOnClick: false
    // };
    // L.popup(popupOptions)
    //   .setLatLng(convertedEvent)
    //   .setContent(
    //     `<p>latitude : ${convertedEvent.lat}<br/>
    //      longitude : ${convertedEvent.lng}</p>`
    //   )
    //   .openOn(this.map);
  }

  public initMap() {
    this.map = L.map("map", {
      renderer: L.svg(),
    }).setView(this.centerCoordinate, this.zoomLevel);





    // this.wfsCapabilities();







    this.loadTileLayer();
  }

  private populateFeatures() {
    for (let layer of this.geoJsonLayers) {
      this.loadGeoJsonLayer(layer);
    }
  }

  gotoCoordinate() {
    console.log("lon : ", this.coordinate.lon, "\nlat : ", this.coordinate.lat);
    if (this.coordinate.lon !== null && this.coordinate.lat !== null) {
      this.map.panTo([this.coordinate.lat, this.coordinate.lon]);
    }
    let coords = {
      lat: this.coordinate.lat,
      lng: this.coordinate.lon,
    };

    L.marker(coords).addTo(this.map);
  }

  toogleTile(event) {
    if (event.target.checked) {
      this.map.addLayer(this.osmTile);
    } else {
      this.map.removeLayer(this.osmTile);
    }
  }
  g: any;
  toogleLayer(event) {
    console.log(event.target.value);

    //commented to be continiued ...

    // if (event.target.checked == true) {
    //   this.gisService
    //     .getEthCadasteralFeatures(event.target.value)
    //     .subscribe((res: any) => {
    //       console.log("if do", event.target.value);
    //       this.g = L.geoJSON(res, {
    //         style: (feature) => ({
    //           weight: 3,
    //           opacity: 0.5,
    //           color: "#aadd68",
    //           fillOpacity: 0.8,
    //           fillColor: "#223344",
    //         }),
    //       });
    //       this.g.addTo(this.map);
    //     }),
    //     (error) => {
    //       console.log("the error comes", error);
    //     };
    // } else {
    //   console.log("else ", event.target.value);

    //   this.map.removeLayer(this.g);
    // }

    // commented to be ommited

    // console.log("check box :: ", event);
    // this.listOfLayers.forEach((value) => {
    // if (value.layerName === event.target.value) {
    // this.map.addLayer(value.layer);
    // } else {
    //   this.map.removeLayer(value.layer);
    // }
    // }
    // });
  }

  loadTileLayer() {
    let layer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);

    this.osmTile = layer;

    L.control
      .layers(
        {},
        {
          "Open street map": layer,
        }
      )
      .addTo(this.map);
  }

  loadGeoJsonList() {
    (this.gisService as GisService).getListOfGeoJson().subscribe(
      (listOfGeoJson) => {
        console.log("list of geojson :: ", listOfGeoJson);
        this.geoJsonLayers = listOfGeoJson as any;
        this.mapViewEvents.emit("onListLoad");
      },
      (error) => {
        console.error("error getting geojson :: ", error);
      }
    );
  }

  configFeature(selectedfeature, featureName) {
    let layerColor = this.randomColor().color;
    let layerControlDestail = {};
    let transmitFeature = (data) => {
      console.log("dataaaa",data);

      let popupOptions = {
        closeOnClick: false,
        keepInView: true,
      };
      L.popup(popupOptions)
        .setLatLng(this.clickCoordinate)
        .setContent(
          ` <p">An area with <br>Features ID : ${
            data.features.OBJECTID
              ? data.features.OBJECTID
              : data.features.id || data.features.id
          } <br> is <i><b style="color:green">selected!</b></i></p> `
        )
        .openOn(this.map);
      console.log("clicked coordinate :: ", this.clickCoordinate);
      console.log("transmiting :: ", data);
      this.gooo.emit(data);
    };

    let layer = L.geoJSON(selectedfeature as any, {
      style: () => {
        return {
          color: layerColor,
        };
      },
      onEachFeature: function (feature, layer) {
        layer.on({
          click: () => {
            console.log("feature clicked :: ", feature);
            transmitFeature(feature);
          },
        });
      },
    })
      // .bindPopup(
      //   layer => {
      //     layerName = layer.feature.properties.NAME_ISO ? layer.feature.properties.NAME_ISO : 'Generic layer';
      //     return layerName;
      //   }
      // )
      // .bindTooltip(
      //   `hello world`
      // )
      .addTo(this.map);

    this.listOfLayers.push({
      layerName: featureName,
      layer: layer,
    });

    // layerControlDestail[featureName] = layer;
    // L.control.layers(
    //   {},
    //   layerControlDestail
    // ).addTo(this.map);
  }

  loadGeoJsonLayer(whichGeoJson) {
    this.gisService.getGeoJsonData(whichGeoJson).subscribe(
      (geoJsonData) => {
        this.configFeature(geoJsonData, whichGeoJson);
      },
      (error) => {
        console.log("unable to retrieve geo json data ::", error);
      }
    );
  }

  layerControl(baseLayers, overlays) {
    if (baseLayers && overlays) {
      L.control.layers(baseLayers, overlays).addTo(this.map);
    }
  }

  randomColor() {
    let options = {
      format: "hex" as any,
    };
    return Uniqolor.random(options);
  }

  dyCheckbox: any;
  i = 0;





  // wfsCapabilities() {
  //   this.gisService.getCapabilities().subscribe((res: any) => {
  //     console.log("capabilities :: ", res);

  //     this.dyCheckbox = res.WMS_Capabilities.Capability.Layer.Layer.map(
  //       (element: any) => {
  //         this.i++;
  //         return {
  //           id: this.i,
  //           select: false,
  //           name: element.Name._text,
  //           layermaker: element.Name._text,
  //         };
  //       }
  //     );
  //   });
  //   this.loadFromGeoJson()








    // (this.gisService as any).getCapabilities().subscribe(
    //   (capabilities: any) => {
    //     console.log("capabilities :: ", capabilities);
    //     let isValidXml = FastXml.validate(capabilities);
    //     console.log("is valid xml :: ", isValidXml);

    //     if (isValidXml) {
    //       let options: FastXml.X2jOptions = {
    //         attributeNamePrefix: "@_",
    //         attrNodeName: "attr", //default is 'false'
    //         textNodeName: "#text",
    //         ignoreAttributes: true,
    //         ignoreNameSpace: false,
    //         allowBooleanAttributes: false,
    //         parseNodeValue: true,
    //         parseAttributeValue: false,
    //         trimValues: true,
    //         cdataTagName: "__cdata", //default is 'false'
    //         cdataPositionChar: "\\c",
    //         parseTrueNumberOnly: false,
    //         arrayMode: false, //"strict"
    //         attrValueProcessor: (a) => a,
    //         tagValueProcessor: (a) => a,
    //         stopNodes: ["parse-me-as-string"],
    //       };

    //       let intermidiateObject = FastXml.getTraversalObj(
    //         capabilities,
    //         options
    //       );
    //       let xmlToJsonCapabilities = FastXml.convertToJson(
    //         intermidiateObject,
    //         options
    //       );
    //       console.log("xml to json :: ", xmlToJsonCapabilities);

    //       let featureList =
    //         xmlToJsonCapabilities["wfs:WFS_Capabilities"]["FeatureTypeList"][
    //           "FeatureType"
    //         ];
    //       console.log("feature lists :: ", featureList);

    //       if (featureList) {
    //         (featureList as Array<any>).forEach((feature) => {
    //           this.loadFeatures(feature["Name"], this.outputFormats.JSON);
    //         });
    //       }
    //     }
    //   },
    //   (error) => {
    //     console.error(
    //       "error getting capabilities falling back to geojson file : ",
    //       error
    //     );
    //     this.loadFromGeoJson();
    //   }
    // );


  // }



  loadFromGeoJson() {
    this.loadGeoJsonList();
    this.mapViewEvents.addListener("onListLoad", () => {
      console.log("list loaded");
      this.populateFeatures();
    });
  }

  async promiseWfsCapabilities() {
    console.log(
      "promised capabilities :: ",
      await (this.gisService as any).promiseGetCapabilities()
    );
  }

  loadFeatures(typeName, outputFormat) {
    (this.gisService as any).getFeatures(typeName, outputFormat).subscribe(
      (feature) => {
        // console.log("feature :: ", feature);
        this.configFeature(feature, typeName);
        this.geoJsonLayers.push(typeName);
      },
      (error) => {
        console.error("error getting feature :: ", error);
      }
    );
  }

  featureTypeDescription(typeName, outputFormat, exceptionsFormat) {
    (this.gisService as any)
      .getFeatureTypeDescription(typeName, outputFormat, exceptionsFormat)
      .subscribe(
        (description) => {
          console.log("description :: ", description);
        },
        (error) => {
          console.error("error getting description :: ", error);
        }
      );
  }
}
