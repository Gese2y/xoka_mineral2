import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { MineralService } from '../Mineral/Mineral.service';


@Component({
  selector: 'app-list-mineral',
  templateUrl: './list-mineral.component.html',
  styleUrls: ['./list-mineral.component.css']
})
export class ListMineralComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;
  // @Input() workingUser;
  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  mineral: mineral;
  public edit_form = false;
public minerals: any
constructor(private MineralService: MineralService) {
  this.mineral = new mineral();
}


  ngOnInit() {
    this.goto(1);
    this.getminerals();
  }
  getminerals() {
    this.MineralService.getminerals().subscribe(
      (response) => {
        this.minerals = response;
      },
      (error) => {
        console.log("error");
      }
    );
  }
  selectminerals($event, minerals) {
    console.log(minerals)
    $event.preventDefault();
    this.edit_form = true;
    this.minerals = minerals;
    this.goto(0);
  } 
}
export class mineral{

}