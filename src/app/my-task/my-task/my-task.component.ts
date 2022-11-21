import { Component, OnInit } from "@angular/core";
import { MyTaskService } from "../my-task.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ServiceService } from '../../service/service.service';
import { environment } from "src/environments/environment";

@Component({
  selector: "app-my-task",
  templateUrl: "./my-task.component.html",
  styleUrls: ["./my-task.component.css"]
})
export class MyTaskComponent implements OnInit {
  taskwaithing = 120;

  taskList = [];
  lockedpromise;
  currentLanguage;
  loading = 0;
  messageAppNo;
  user
  messageCache = [];
  messageObj = {
    currentMessage: null,
    currentMessageIndex: 0,
    messages: null
  };
  direction = {
    NEXT: 'd00',
    PREV: 'd01'
  };
  loadingMessage = false;

  constructor(
    private myTaskService: MyTaskService,
    private router: Router,
    private notificationsService: NotificationsService,
    private modal: NgxSmartModalService,
    private serviceService: ServiceService
  ) { }

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
      

  
    this.checkLanguage();
  }

  canGo(where) {
    if (this.messageObj.messages) {
      if (where == this.direction.NEXT) {
        return this.messageObj.currentMessageIndex < this.messageObj.messages.length - 1;
      }
      else if (where == this.direction.PREV) {
        return this.messageObj.currentMessageIndex > 0;
      }
      return false;
    }
    else {
      return false;
    }
  }

  navigateMessage(direction) {
    if (this.messageObj.messages ? this.messageObj.messages.length > 0 : false) {
      if (
        direction == this.direction.NEXT &&
        this.messageObj.currentMessageIndex < this.messageObj.messages.length - 1
      ) {
        this.messageObj.currentMessageIndex += 1;
        this.messageObj.currentMessage = this.messageObj.messages[
          this.messageObj.currentMessageIndex
        ]['remarks'];
      }
      else if (
        direction == this.direction.PREV &&
        this.messageObj.currentMessageIndex > 0
      ) {
        this.messageObj.currentMessageIndex -= 1;
        this.messageObj.currentMessage = this.messageObj.messages[
          this.messageObj.currentMessageIndex
        ]['remarks'];
      }
    }
  }

  openModal(id) {
    this.modal.getModal(id).open();
  }

  closeModal(id) {
    this.modal.getModal(id).close();
  }

  showMessage(appNo, task) {
    if (appNo != this.messageAppNo) {
      let messageInCache = false;
      this.loadingMessage = true;

      this.messageObj.currentMessage = null;
      this.messageObj.currentMessageIndex = 0;
      this.messageObj.messages = null;

      this.messageCache.some(
        message => {
          if (message['appNo'] == appNo) {
            messageInCache = true;
            this.messageObj.messages = message['messages'];
            if (this.messageObj.messages) {
              this.messageObj.currentMessage = this.messageObj.messages[0]['remarks'];
            }
            this.loadingMessage = false;
            return true;
          }
          return false;
        }
      );

      if (!messageInCache) {
        this.serviceService.GetNote(appNo).subscribe(
          result => {
            this.messageObj.messages = result;
            if (this.messageObj.messages) {
              this.messageCache.push(
                {
                  appNo: this.messageAppNo,
                  messages: result
                }
              );
              this.messageObj.currentMessage = this.messageObj.messages[0]['remarks'];
            }
            this.loadingMessage = false;
          },
          error => {
            this.loadingMessage = false;
            console.error('message error :: ', error);
          }
        );
      }
    }
    this.openModal('messages');
    this.messageAppNo = appNo;
  }

  checkLanguage() {
    if (window["lang"] === "am-et") {
      this.currentLanguage = "amharic";
    }
    else if (window["lang"] === "en-us") {
      this.currentLanguage = "english";
    }
    else {
      this.currentLanguage = "english";
    }
    console.log("language :: ", window["lang"], " current :: ", this.currentLanguage);
  }

  getMyTask(orgid) {
    this.loading = 1
    this.myTaskService.getMytasks(orgid).subscribe(taskList => {
      if (taskList['Table1']) {
        this.taskList = taskList['Table1'];
        this.loading = 0

        if (this.taskList.length == 0) {
          this.loading = 2
        }
      }
      else {
        this.loading = 3
      }
      console.log('taskList', taskList);
      console.log('this.taskList', this.taskList);

      this.taskList = (this.taskList as Array<any>).sort((a, b) => {
        if (a.start_date > b.start_date) {
          return -1;
        } else if (a.start_date < b.start_date) {
          return 1;
        } else {
          return 0;
        }
      });

      let itemNumber = 1;
      this.taskList = (this.taskList as Array<any>).map(
        task => {
          task['showButton'] = false;
          task['itemNumber'] = itemNumber;
          itemNumber++;
          return task;
        }
      );
    }, error => {
      this.loading = 3
      console.log('error');
    });
  }

  IsLockedBy_OtherUser(task) {

    // this.go(task);
    this.lockedpromise = this.myTaskService.IsLockedBy_OtherUser(task.id).subscribe(message => {
      if (!message) {
        this.go(task);
      } else {
        const toast = this.notificationsService.error('Error',
          'This Application No is being Processed by another staff. ' +
          'Please choose another Application No. ' +
          '/ ይህን ማመልከቻ በሌላ ሰራተኛ እየተስተናገደ ስለሆነ እባክዎ ሌላ ማመልከቻ ቁጥር ይውሰዱ፡፡');
      }
      // const toast = this.notificationsService.success('Sucess', message);
    },
      error => {
        console.log(error);
        if (error.status == '400') {
          const toast = this.notificationsService.error('Error', error.error.InnerException.Errors[0].message);

        } else {
          const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
        }
      });
  }

  go(task) {
    console.log("task.to_screen", task);
    if (task.to_screen == "0FC6362D-89AB-40F7-8B64-F0B46AA04875") {
      this.router.navigate([
        "/services/2/" +
        task.todo_comment +
        "/" +
        task.task_types_id +
        "/" +
        task.tasks_id +
        "/" +
        task.service_details_id +
        "/" +
        task.id
      ]);
    } else if (task.to_screen == "4A88387C-2559-4625-B9DF-7F86FCC5D3C4") {
      this.router.navigate([
        "/services/3/" +
        task.todo_comment +
        "/" +
        task.task_types_id +
        "/" +
        task.tasks_id +
        "/" +
        task.service_details_id +
        "/" +
        task.id
      ]);
    } else if (task.to_screen == "E02316F7-8CA1-4104-96A3-FF175B205598") {
      this.router.navigate([
        "/services/4/" +
        task.todo_comment +
        "/" +
        task.task_types_id +
        "/" +
        task.tasks_id +
        "/" +
        task.service_details_id +
        "/" +
        task.id
      ]);
    } else {


      if (task.Module == "Manage") {
        this.router.navigate([
          "/services/1/" +
          task.todo_comment +
          "/" +
          task.task_types_id +
          "/" +
          task.tasks_id +
          "/" +
          task.service_details_id +
          "/" +
          task.id +
          "/" +
          task.to_screen
        ]);
      }
      
     else  if (task.Module == "Services") {
        this.router.navigate([
          "/services/1/" +
          task.todo_comment +
          "/" +
          task.task_types_id +
          "/" +
          task.tasks_id +
          "/" +
          task.service_details_id +
          "/" +
          task.id +
          "/" +
          task.to_screen
        ]);
      }  
       else {
        console.log("base", window["_app_base"]);

        let AppBase = window["_app_base"] !== null && window["_app_base"] !== undefined ?
          window["_app_base"].split("/") :
          Array(4);

        AppBase[4] = task.Module !== null && task.Module !== undefined ?
          task.Module.replaceAll(" ", '-') :
          'Manage';

        AppBase = AppBase.join("/");

        console.log("AppBase", AppBase);

        window.location.href =
          window.location.origin +
          "" +
          AppBase +
          "/services/1/" +
          task.todo_comment +
          "/" +
          task.task_types_id +
          "/" +
          task.tasks_id +
          "/" +
          task.service_details_id +
          "/" +
          task.id +
          "/" +
          task.to_screen;
      }

    }
  }
}