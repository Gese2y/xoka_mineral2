import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { TabsetComponent } from 'ngx-bootstrap';
import { SiteService } from '../Site/Site.service';
// import { StepModel } from 'step.model';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
// public site: any;
public sites: any;
site: site;
@ViewChild("tabset") tabset: TabsetComponent;


  @Input() workingUser;
  selectedFile: any;
    selectedprofromtree: any;
  toMes;
  @Input() LicenceData;
  staticTabs: any;
  StatusList: any;
  goto(id) {
    this.tabset.tabs[id].active = true;
  } 
  public edit_form = false;
constructor(private SiteService: SiteService) {
  this.site = new site();
  
}
selectTab(tabId: number) {
  this.staticTabs.tabs[tabId].active = true;
}


  ngOnInit() {
    this.goto(1);
    this.getsite();
  }
  
 
  getsite() {
    this.SiteService.getsite().subscribe(
      (response) => {
        this.sites = response;
      },
      (error) => {
        console.log("error");
      }
    );
  }
  selectsite(site) {
    console.log(site)
    // $event.preventDefault();
    this.edit_form = true;
    this.site = site;
    // this.goto(0);
  } 
  addsite() {
    this.site = new site();
    this.edit_form = false;
    this.goto(0);
  }
  // EnableFinspronew(resourcedeposit) {
  //   // this.propertyregForm = false;
  //   this.selectedFile = resourcedeposit;
  //   // this.completed.emit();
  //   console.log('next to measurement');
  //   this.toMes = true;
  //   this.selectedprofromtree;
  //   this.selectedprofromtree = {
  //     Site_ID: site.Site_ID
  //   };
  //   this.getsite();
  // }
  closeup() {
    this.goto(1);
    this.site = new site();
    this.getsite();
  }

}
export class site{
  public site_Id:any;
  public site_Name:any;
  public region:any;
  public zone:any;
  public woreda:any;
  public kebele_Locality:any;
  public date_Registered:any;
  public coordinate:any;
  public status:any;
  public is_Active:any;
  public remarks:any;
  public created_By:any
  public updated_By:any;
  public deleted_By:any;
  public is_Deleted:any;
   public created_Date:any;
   public updated_Date:any;
   public deleted_Date:any;
   public licence_Service_Id:any;
   public application_No:any;

}
