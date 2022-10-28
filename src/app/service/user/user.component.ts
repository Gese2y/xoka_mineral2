import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { exit } from 'process';
import { ServiceService } from '../service.service';
// import * as L from 'leaflet'
// import { MouseEvent } from '@agm/core';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'
]
  
})
export class UserComponent implements OnInit {
  // title = 'My first AGM project';
  // lat = 51.678418;
  // lng = 7.809007;

  
   map:any;
  options: any;
  overlays: any[];
  // public initMap(): void {
  //   this.map = L.map('map', {
  //     center: [ 39.8282, -98.5795 ],
  //     zoom: 3
  //   });
  // }

  // ngAfterViewInit(): void {
  //   this.initMap();
  // //   this.options = {
  // //     center: {lat: 36.890257, lng: 30.707417},
  // //     zoom: 12
  // // };
  // }

  userList:any
  userID:string;
  isTaken:string;
  config:any = {
    itemsPerPage: 6,
    currentPage: 1,
  };
  public maxSize: number = 10;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public site:site;
  public labels: any = {
      previousLabel: '<<',
      nextLabel: '>>',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
    };
  BasicFormnew: any;
  constructor(private serviceService:ServiceService) { 
    // this.serviceService.disableBrowserBackButton();
    this.site=new site;
    
  }

  ngOnInit() {
    // this.serviceService.getUsers().subscribe(data=>{
    //   this.userList=data
    //   this.userList=this.userList.procaspnetUserss
    //   console.log(this.userList)
    // }) 
    this.initmap();
   
}
initmap() {
  this.map = L.map("map", {
      center: [
          9.145, 40.4897
      ],
      zoom: 6
  });

}
   onClickEvent() {
    // console.log(this.BasicFormnew.controls['Latitude'].value);
    
    let x = this.BasicFormnew.controls['Latitude'].value;
    let y = this.BasicFormnew.controls['Longitude'].value;
    let coordinate='POINT ('+ x +' ,'+ y +')';
    
    this.BasicFormnew.controls['coordinate'].setValue(coordinate)
  }
  onPageChange(event){
    this.config.currentPage = event;
  }
  // setUserID(userId){
  //   this.userID=userId
  //   this.serviceService.getEmployeeByUserID(this.userID).subscribe(data=>{
  //     console.log("Emp Data By user ID",data.c_Employees);
  //     if(data.c_Employees.length==1){
  //       this.isTaken="yes";
  //     }else{
  //       this.isTaken="no";
  //     }
  //   })
    
  // }
  
  submitForm(){
     if(this.isTaken=="no"){
    this.serviceService.userid=this.userID
     }
     this.serviceService.desplayuserid=false
  }
  close(){
    this.serviceService.desplayuserid=false
  }
}
export class site{
  Latitude:any;
  Longitude: any;
}