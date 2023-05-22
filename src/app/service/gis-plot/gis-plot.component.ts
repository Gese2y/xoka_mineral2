import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { GisPlotService } from '../gis-plot.service';

@Component({
  selector: 'app-gis-plot',
  templateUrl: './gis-plot.component.html',
  styleUrls: ['./gis-plot.component.css']
})
export class GisPlotComponent implements OnInit {

  map: any;
  border = [ "Eth_Zone","Eth_Region"];
  borderFeature = new Set();
  activeSite: any;
  baselayer: any;
  zon: any;
  reg: any;

  constructor(
    private gis: GisPlotService
  ) { }
  ngOnInit() {
    this.initmap();

      this.gis.getBordereatures('ethiopia-admin3').subscribe((res: any) => {
        this.zon = L.geoJSON(res)
      });

      this.gis.getBordereatures('Eth_Regions').subscribe((res: any) => {
        console.log('res reg',res);

        this.reg = L.geoJSON(res)
      });
    console.log('borderFeature ',this.borderFeature);
    this.gis.getAllLicences().subscribe((res: any) => {
      console.log(res);

      this.activeSite = L.geoJSON(res,  {
        onEachFeature: function(feature, layer) {
          layer.bindPopup(`<div><div>${feature.id}</div>`
                          + `<div>${feature.properties.Area}</div>`
                          + `<div>${feature.properties.Commodit}</div>`
                          + `<div>${feature.properties.Map_Refe}</div></div>`

                          );
        }
      });
    })

  }



  marker: any;
  initmap() {
    this.map = L.map("map", {
      center: [9.145, 40.4897],
      zoom: 7,
    });

    const baselayers = {
      openstreetmap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ),
      googleStreets: L.tileLayer(
        "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      ),
      googleHybrid: L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      ),
      googleSat: L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      ),
      googleTerrain: L.tileLayer(
        "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      ),
      VMap: L.tileLayer(
        "https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=8fb3246c12d442525034be04bcd038f22e34571be4adbd4c"
      ),
    };

    var overlays = {};

    L.control.layers(baselayers, overlays).addTo(this.map);

    baselayers["googleTerrain"].addTo(this.map);
  }

  allsite($event: any) {
    if ($event.target.checked) {

      this.map.addLayer(this.activeSite);
      console.log(this.activeSite);
    } else  {
        console.log('deleting allsite ....');
        this.map.removeLayer(this.activeSite);
    }
  }

  // zone(event: any) {
  //   console.log('this.zon',this.zon);

  //   if (event.target.checked) {
  //     console.log('draw zone ....');
  //     this.map.addLayer(this.zon);
  //   } else  {

  //     this.map.removeLayer(this.zon);
  //     console.log('deleted zone ....');
  //   }
  // }

  // region($event: any) {

  //   if ($event.target.checked) {
  //     console.log('draw region ....');
  //     this.map.addLayer(this.reg);
  //   } else  {

  //     this.map.removeLayer(this.reg);
  //     console.log('deleted region ....');
  //   }
  // }

}
