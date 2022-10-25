import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
  public labels: any = {
      previousLabel: '<<',
      nextLabel: '>>',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
    };
  constructor(private serviceService:ServiceService) { 
    this.serviceService.disableBrowserBackButton();
  }

  ngOnInit() {
    // this.serviceService.getUsers().subscribe(data=>{
    //   this.userList=data
    //   this.userList=this.userList.procaspnetUserss
    //   console.log(this.userList)
    // })
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
