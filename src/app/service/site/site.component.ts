import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { SiteService } from './Site.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
public IsAddFormVisible: any;
public sites: any;
public site:site;
public StatusList:site;
 public  RegionList: any;
 public  ZoneList: any;
 public  WoredaList: any;
// public edit_form:any;
  constructor(
    private SiteService: SiteService,
    private notificationsService: NotificationsService
  ) { 
    this.site= new site; 
   
  }

  ngOnInit() {

    
    this.site.Site_ID= Guid.create();
   // this.site.Site_ID = this.sites.Site_ID.value;

    this.SiteService.getStatus().subscribe(data=>{
      this.StatusList=data;
      this.StatusList=this.StatusList;
    })
    this.SiteService.getRegion().subscribe(data=>{
      this.RegionList=data;
      this.RegionList=this.RegionList;
    })
    this.SiteService.getZone().subscribe(data=>{
      this.ZoneList=data;
      this.ZoneList=this.ZoneList;
    })
     this.SiteService.getWoreda().subscribe(data=>{
      this.WoredaList=data;
      this.WoredaList=this.WoredaList;
    })
  }
  getsite() {
    this.SiteService.getsite().subscribe(
      (response) => {
        console.log("site", response);
        this.sites = response["site"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  registersite() {
    this.SiteService.addsite(this.site)
      .subscribe(
        (response) => {
          this.getsite();
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  clearForm(){
    this.sites = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    this.sites.Site_ID= Guid.create();
    // this.sites.Site_ID= Guid.create();
    this.sites.Site_ID = this.sites.Site_ID.value;
  }
}
class site{
  public Site_ID:any;
  public Site_Name:any;
  public Region:any;
  public Zone:any;
  public Woreda:any;
  public Kebele_Locality:any;
  public Date_Registered:any;
  public Coordinate:any;
  public Status:any;
  public Is_Active:any;
  public Remarks:any;
  public Created_By:any;
  public Updated_By:any;
  public Deleted_By:any;
  public Is_Deleted:any;
  public Created_Date:any;
  public Updated_Date:any;
  public Deleted_Date:any;
  public Licence_Service_ID:any;
  public Application_No:any;
}