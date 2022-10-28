import { Component, OnInit } from '@angular/core';
// import "leaflet-geosearch/dist/geosearch.css";
// import  "leaflet-draw";
import * as L from "leaflet";
@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {
  map : any;
  public coordinate = {
    lon: null,
    lat: null,
  };
  drawnItems = new L.FeatureGroup();
  // private mapViewEvents = new NativeEmitter();
  public clickCoordinate: any;
 
  constructor() { }

  ngOnInit() {
    this.initmap();
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

    baselayers["VMap"].addTo(this.map);

    this.map.addLayer(this.drawnItems);
}
public getCoordOnClick(event) {
  let convertedEvent = this.map.mouseEventToLatLng(event);
  this.clickCoordinate = convertedEvent;
  console.log("converted event :: ", convertedEvent);
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

}
