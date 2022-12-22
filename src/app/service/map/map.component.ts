import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'

import { PopupService } from 'src/app/pro-service/popup.service';
import { GisService } from '../gis/gis.service';
import { MapService } from './map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;

  constructor(private gisService: GisService,
    private popup: PopupService,
    private mapservice: MapService ) { }

  ngOnInit() {
    this.initmap()
    // this.gis.getGeological_structure().subscribe((res: any) => {
    //   console.log('rs from oro min ',res);
    //   L.geoJSON(res).addTo(this.map)
      
    // }) 
  

  }

//  if (this.map) {
//     this.map.remove();
//   }
 
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

  Licensearea() {
    this.mapservice.getLicensearea().subscribe((res: any) => {
      console.log('rs from oro min ',res);
      L.geoJSON(res).addTo(this.map)
      
    })
  }
  region() {
    this.mapservice.getororegion().subscribe((res: any) => {
      console.log('rs from oro min ',res);
      L.geoJSON(res).addTo(this.map)
      
    })
  }
  ororoad() {
    this.mapservice.getororoad().subscribe((res: any) => {
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

}
