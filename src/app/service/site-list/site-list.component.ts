import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { SiteService } from '../Site/Site.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
public site: any;
@ViewChild("tabset") tabset: TabsetComponent;
  @Input() workingUser;
  selectedFile: any;
  selectedprofromtree: any;
  toMes: boolean;
  @Input() LicenceData;
  goto(id) {
    this.tabset.tabs[id].active = true;
  } 
  Site: site;
  public edit_form = false;
constructor(private SiteService: SiteService) {
  this.Site = new site();
}


  ngOnInit() {
    this.goto(1);
    this.getsite();
  }
  getsite() {
    this.SiteService.getsite().subscribe(
      (response) => {
        this.site = response["site"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  EnableFinspronew(resourcedeposit) {
    // this.propertyregForm = false;
    this.selectedFile = resourcedeposit;
    // this.completed.emit();
    console.log('next to measurement');
    this.toMes = true;
    this.selectedprofromtree;
    this.selectedprofromtree = {
      Site_ID: site.Site_ID
    };
    this.getsite();
  }

}
export class site{
  static Site_ID: any;

}