import {Component, OnInit} from '@angular/core';
import {MyTaskService} from '../my-task.service';
import {Router} from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  taskwaithing = 120;

  taskList;
  user: any;

  constructor(private myTaskService: MyTaskService, private router: Router, 
    private serviceService: ServiceService) {
  }

  ngOnInit() {
    this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).subscribe(
      (response)=>{
   
          this.user = response[0].organization_code;
          this.getMyTask(this.user)
      },
      (error)=>{
      console.log("user error");
      }
          );
    ;
  }

  getMyTask(orgid) {
    this.myTaskService.getMytasks(orgid).subscribe(taskList => {
      this.taskList = taskList;
      this.taskList = (Object.assign([], this.taskList.Table1));
      console.log('taskList', taskList);
    }, error => {
      console.log('error');
    });
  }


  go(task) {
    console.log('task.to_screen', task.to_screen);
    if (task.to_screen == 'a7a1e05e-32c2-4f44-ad58-306572c64593') {
      this.router.navigate(['/services/2/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id]);
    } else if (task.to_screen == 'da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff') {
      this.router.navigate(['/services/3/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id]);
    } else if (task.to_screen == '9e0834e9-7ec2-460c-a5ed-7ade1204c7ee') {
      this.router.navigate(['/services/4/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id]);
    } else {
      let urlSegment = location.pathname.split('/');
      let languagePrefix = urlSegment[2];
      let siteName = urlSegment[1];
      let parentPage = (task.systems as string).replace(/ /g, '-');
      let modulePage = (task.Module as string).replace(/ /g, '-');
      let erpPage = urlSegment[3];
      let fullPath = `/${siteName}/${languagePrefix}/${erpPage}/${parentPage}/${modulePage}/services/1/${task.todo_comment}/${task.task_types_id}/${task.tasks_id}/${task.service_details_id}/${task.id}/${task.to_screen}`;
      location.assign(fullPath);
    }
    // a7a1e05e-32c2-4f44-ad58-306572c64593 for plot
    // da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff for property
    // 9e0834e9-7ec2-460c-a5ed-7ade1204c7ee for certefcate

    // this.router.navigate(['/service/1']);
  }
}
