import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MineralService } from "./mineral.service";
import { NotificationsService } from "angular2-notifications";
import { Guid } from 'guid-typescript';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-mineral',
  templateUrl: './mineral.component.html',
  styleUrls: ['./mineral.component.css']
})
export class MineralComponent implements OnInit {
public mineral: any;
public minerals:minerals
// public edit_form:any;
@Output() onclose = new EventEmitter();
public IsAddFormVisible: any;
  ClassList: any;
  public Mineral_UseList: any;
  Chemical_ClassificationList: any;
  TenacityList: any;
  urlParams: any;
  @Input() licenceData;
  @Input() workingUser;
  @Output() saveDataCompleted = new EventEmitter();
  constructor(
private MineralService: MineralService,
private notificationsService: NotificationsService,
public serviceService:ServiceService,
  ) { 
    this.minerals = new minerals;
  }

  ngOnInit() {
    this. addmineral();

    this.minerals.Mineral_ID= Guid.create();
    this.minerals.Chemical_Classification= Guid.create();
    this.minerals.Mineral_Use= Guid.create();

    this.MineralService.getClass().subscribe(data=>{
      this.ClassList=data;
      this.ClassList=this.ClassList;
    })
     this.MineralService.getMineral_Use().subscribe(data=>{
      this.Mineral_UseList=data;
      this.Mineral_UseList=this.Mineral_UseList;
    }) 
    this.MineralService.getChemical_Classification().subscribe(data=>{
      this.Chemical_ClassificationList=data;
      this.Chemical_ClassificationList=this.Chemical_ClassificationList;
    })
    this.MineralService.getTenacity().subscribe(data=>{
      this.TenacityList=data;
      this.TenacityList=this.TenacityList;
    })

  }
  getmineral() {
    this.MineralService.getmineral().subscribe(
      (response) => {
        this.mineral = response["mineral"];
      },
      (error) => {
        console.log("error");
      }
    );
  }
  addmineral() {
    console.log(this.minerals);  
    this.MineralService.addmineral(this.minerals).subscribe(
      (response) => {
        this.getmineral();
        const toast = this.notificationsService.success("Success", "Saved");
        // this.closeup();
        this.clearForm();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  saveData() {
    console.log(this.workingUser);
    this.serviceService
      .saveForm(
        this.licenceData ? this.licenceData.Licence_Service_ID : "00000000-0000-0000-0000-000000000000",
        this.licenceData ? this.licenceData.Service_ID : this.urlParams.id,
        "c30c953e-7001-485a-80cd-7dd9d45b86f1",
        "1e60f3a1-7017-47bf-95f4-f0e47c793c72",
        "{}",
        this.urlParams.docid || "00000000-0000-0000-0000-000000000000",
        this.urlParams.todoID || "00000000-0000-0000-0000-000000000000"
      )
      .subscribe(
        (response) => {
          console.log("trans-resp", response);
          this.getLicenceService(response);
        },
        (error) => {
          console.log("save-data-error", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  public getLicenceService(saveDataResponse) {
    this.serviceService.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        console.log("all-response", response);
        let licenceData = response["list"][0];
        this.saveDataCompleted.emit(saveDataResponse);
     this.addmineral();
      },
      (error) => {
        console.log("all-error" + error);
      }
    );
  }


  clearForm(){
    this.mineral = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
    this.minerals.Mineral_ID= Guid.create();
    this.minerals.Chemical_Classification= Guid.create();
    this.minerals.Mineral_Use= Guid.create();
    // this.sites.Site_ID= Guid.create();
    this.minerals.Mineral_ID = this.minerals.Mineral_ID.value;
    this.minerals.Mineral_Use = this.minerals.Mineral_Use.value;
    this.minerals.Chemical_Classification = this.minerals.Chemical_Classification.value;
  }
  closeup() {
    this.onclose.emit();
  }
}
class minerals{
  public Mineral_ID:any;
  public Code:any;
  public Name:any;
  public Class:any;
  public Mineral_Use:any;
  public Chemical_Classification:any;
  public Crystal_Structure:any;
  public Hardness:any;
  public Lustre:any;
  public Diaphaneity:any;
  public Color:any;
  public Streak:any;
  public Fracture:any;
  public Parting:any;
  public Tenacity:any;
  public Specific_Gravity:any;
  public Other_Properties:any;
  public Is_Active:any;
  public Remarks:any;
  public Created_By:any;
  public Updated_By:any;
  public Deleted_By:any;
  public Is_Deleted:any;
  public Created_Date:any;
  public Updated_Date:any;
  public Deleted_Date:any;
}