import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ServiceService } from "./service.service";
import { NotificationsService } from "angular2-notifications";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { LayoutService } from "./task-layout/layout.service";
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "src/environments/environment";
import { EventEmitter } from "events";
import { NgxSmartModalService } from "ngx-smart-modal";
@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./demo/demo.component.css"],
})
export class ServiceComponent implements OnInit {
  _opened = false;
  public ID = 0;
  loading = true;
  licenceService;
  licenceData: any = '';
  AppNo;
  tskTyp;
  DropDownList;
  disablefins = true;
  DocID;
  todoID;
  tskID;
  SDP_ID;
  Service_ID;
  Licence_Service_ID;
  FormData;
  PriveLicence;
  AppNoList;
  PriveAppNoList;
  PreAppData;
  PreTaskData;
  AppN;
  TaskN;

  saveForms;

  serviceEvent = new EventEmitter();
  eventTypes = {
    JSONFOUND: 'ev001',
    ALREADYAPPLIED: 'ev002'
  }
  mimeExtension = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      extension: 'xlsx',
      previewable: false
    },
    'application/vnd.ms-excel': {
      extension: 'xls',
      previewable: false
    },
    'text/csv': {
      extension: 'csv',
      previewable: false
    },
    'application/pdf': {
      extension: 'pdf',
      previewable: true
    },
    'image/jpeg': {
      extension: 'jpg',
      previewable: true
    },
    'image/png': {
      extension: 'png',
      previewable: true
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      extension: 'docx',
      previewable: false
    },
    'application/msword': {
      extension: 'doc',
      previewable: false
    },
    'image/gif': {
      extension: 'gif',
      previewable: true
    },
    'application/geojson': {
      extension: 'geojson',
      previewable: false
    },
    'application/x-zip-compressed': {
      extension: 'zip',
      previewable: false
    },
  }
  validated=false;
  preAppID;
  formcode;
  selectedTask;
  ifAppNo = false;
  ifTask = false;
  ifTaskDetail = false;
  selectedpreTask;
  SelectedpreApp;
  RequerdDocspre;
  currentRemark;
  SavedFiles;
  SavedFilespre;
  preNoteObj = { remarks: '', postit_note_code: '' };
  NoteObj = { remarks: "", postit_note_code: "" };
  RequerdDocs;

  public CustomerTypeLookUP;
  public CustomerLookUP;
  public CustomerBankLookUP;
  public SuspendedReasonLookUP;
  public PropertyTypeLookUP;
  public PropertyStatusLookUP;
  public ServiceDeliveryUnitLookUP;
  public WoredaLookUP;
  public PlotStutusLookUP;
  public PlotLandUseLookUP;
  public TransferTypeLookUP;
  public Lease_Type_Lookup;
  displayRivew = false;
  notes;
  modalRef: BsModalRef;
  public workingUser: {
    organization_code: "00000000-0000-0000-0000-000000000000";
  };
  SaveDataURL: string;
  http: any;
  AppCode: any;




  subscribe;

  emit;
  public urlParams: any;
  selectedNote: any;
  loadingPreDoc: boolean = true;

  constructor(
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private notificationsService: NotificationsService,
    private layoutService: LayoutService,
    private service: LayoutService
  ) {}

  ngOnInit() {
    this.validated=true;
    this.activatedRoute.params.subscribe((params: Params) => {
//      console.log(params["id"]+"pARSAM SERVICE");

      if(this.Service_ID==undefined){
        this.Service_ID=params["id"];
      }
      if (params["formcode"] == "a94d6841-66f4-4e2a-99ea-193bd55cbe64") {
        this.ID = 2;
      } else if (params["formcode"] == "84f996c2-bc57-44fc-900f-0a8e19f48852") {
        this.ID = 32;
      } else if (params["formcode"] == "343a087e-8a4b-4904-8ef3-08f723b74d3d") {
        this.ID = 33;
        this.serviceService.use=true
      // } else if (params["formcode"] == "3a1f0b93-8b7b-4dcc-a0bf-05615b695fe1") {
      //   this.ID = 34;
       } else if (params["formcode"] == "60ca1a18-ff1c-46da-babd-0159bd0124b0") {
        this.ID = 34;
      } else if (params["formcode"] == "6") {
        this.ID = 35;
      } else if (params["formcode"] == "7") {
        this.ID = 36;
       } else if (params["formcode"] == "8") {
        this.ID = 37;
      }   else if (params["formcode"] == "343a087e-8a4b-4904-8ef3-08f723b74d3d") {
        this.ID = 38;
      } else if (params["formcode"] == "524a60fd-97c3-4c36-a18c-1b8467b8b19c") {
        this.ID = 40;
      }
      else if (params["formcode"] == "b576e8fa-c322-4c15-bd78-28a4ce175fd8") {
        this.ID = 41;
      }else if (params["formcode"] == "ee461baf-5698-4145-85e7-815b63e592f2") {
        this.ID = 42;
      }else if (params["formcode"] == "11c0dc44-95f6-46ef-bb8c-9148258722f8") {
        this.ID = 43;
      }else if (params["formcode"] == "7b7cacaa-57e6-4d48-b556-683e4e116554") {
        this.ID = 44;
      }else if (params["formcode"] == "fc958904-ac3c-43bf-afe3-db003cdc5096") {
        this.ID = 45;
      }
       else {
        this.ID = 1;
        this.serviceEvent.on(
          this.eventTypes.JSONFOUND,
          () => {
//            console.log('rendering form...');
            this.service.getFormData(params['formcode'], 2).subscribe(data => {
              this.ID = 1;
            }, error => {
              this.ID = 404;
            });
          });
      }

      //  0A54D533-A35A-42AA-9D4D-F5A1A6B1686E   Review Online Application
      //   E3C17C78-0526-41DE-9B7E-0A0EC5B270CA  Online Application for Data Request

      // this.ID = params['id'];
      this.AppNo = params["AppNo"];
      this.getAll(this.AppNo);
      this.tskTyp = params["tskTyp"];
      this.tskID = params["tskID"];
      if (this.tskTyp == "c800fb16-f961-e111-95d6-00e04c05559b") {
        this.getTaskRule(params["tskID"]);
      }
      this.DocID = params["docid"];
      this.getFormData(params["docid"]);
      this.todoID = params["todoID"];
      this.formcode = params["formcode"];
    });

    this.getUserWorkInfo();
    this.getLookups();
    this.getRequiredDocs();

//    console.log("selectedTask " + this.selectedTask);
  }


  getUserWorkInfo() {
    this.serviceService.getUserWorkInfo().subscribe(
      (response) => {
        if(Array.isArray(response)){
          if(response.length > 0){
            this.workingUser = response[0];
//            console.log("user-info-response", this.workingUser);
          }
        }
      },
      (error) => {
//        console.log("user-info-error", error);
      }
    );}

  Back() {
    this.serviceService.Back(this.AppNo, this.todoID).subscribe(
      (message) => {
        if (message == true) {
          const toast = this.notificationsService.success(
            "Success",
            "The process was backed to the priveyes stage successfully"
          );
          this.Close();
        } else {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  } isvalidated(todoID, tskID, plotid, proid, DocID) {
    this.serviceService
      .isvalidated(todoID, tskID, plotid, proid, DocID)
      .subscribe(
        (Validated) => {
          // const toast = this.notificationsService.success("success", "successfull");
//          console.log("validateing.... => " + Validated);
          if (Validated == "Validated") {
            this.validated = true;
            this.disablefins = false;
          } else {
            this.validated = true;
            this.disablefins = false;
            // this.disablefins = true;
            // this.validated = false;
            // const toast = this.notificationsService.warn("Warning", Validated);
          }
          // this.RequerdDocs = RequerdDocs;

          // this.getAllDocument();
//          // console.log('RequerdDocs', this.RequerdDocs);
        },
        (error) => {
//          console.log("error");
        }
      );
  }
  addNote() {
    this.serviceService
      .addNote(this.AppNo, this.NoteObj.remarks, this.DocID)
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success("Sucess", "Saved");
          this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }
  saveDataCompleted(response) {
    //this.saveForm('{}');
    this.disablefins = false;
    this.AppNo = response[0];
    this.DocID = response[1];
    this.todoID = response[2];
    this.getAll(this.AppNo);
  }
  saveDataCompletedAA(response) {
    //this.saveForm('{}');
    this.disablefins = false;
  
  }
  saveNote() {
    this.serviceService
      .saveNote(this.NoteObj.remarks, this.NoteObj.postit_note_code, this.DocID)
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Edited sucessfully"
          );
          this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  DeleteNote() {
    this.serviceService
      .DeleteNote(this.AppNo, this.NoteObj.postit_note_code)
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Deleted sucessfully"
          );
          this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }
  sendNote() {
    this.serviceService
      .sendNote(this.NoteObj.remarks, this.AppNo, this.todoID, this.SDP_ID)
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Sent Sucessfully"
          );
          this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  GetNote() {
    this.serviceService.GetNote(this.AppNo).subscribe(
      (Notes) => {
        if (Notes) {
//          console.log("NoteObj", Notes);
          this.NoteObj = Notes[0];
        } else {
          this.NoteObj = { remarks: "", postit_note_code: "" };
        }
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  public getAll(AppNo) {
    this.serviceService.getAll(AppNo).subscribe(
      (licenceService) => {
       console.log("get-all-response",AppNo, licenceService);

        this.licenceService = licenceService;
        this.licenceData = this.licenceService.list[0];
        if(this.licenceService.list.length > 0 ){
          this.licenceData = this.licenceService.list[0];
//          console.log('Licence data1', this.licenceData);
this.SDP_ID = this.licenceData.SDP_ID;
this.Service_ID = this.licenceData.Service_ID;
this.Licence_Service_ID = this.licenceData.Licence_Service_ID;
this.serviceService.AppCode = this.licenceData.Licence_Service_ID;
         this.serviceService.AppNO=this.licenceData.Application_No
          // this.serviceService.Service_Name=this.licenceData.Service_Name
          // this.serviceService.AppCode=this.Licence_Service_ID``
          //this.AppCode = this.licenceData.Licence_Service_ID;//
          this.AppNo = this.licenceData.Application_No;//

          if (this.licenceData.Certificate_Code > 0) {
            this.getPriveysLicence(this.licenceData.Certificate_Code);
          }
          else{
            this.getPriveysLicence(this.licenceData.Application_No);
          }
        }
        // this.disablefins = true;

//        // console.log('Licence data2', this.licenceData);
        // this.taskType = this.licenceData.TaskType;
        this.loading = false;
      },
      (error) => {
//        console.log("get-all-error" + error);
      }
    );
  }

  Submit(ruleid) {
   console.log("next", this.licenceData,this.serviceService.dedicate_license);

    this.disablefins = true;
    this.serviceService
      .Submit(this.licenceData.Application_No,
        this.DocID ? this.DocID : "00000000-0000-0000-0000-000000000000",
        this.todoID ? this.todoID : "00000000-0000-0000-0000-000000000000",
        ruleid
      )
      // .Submit(
      //   this.serviceService.dedicate_license? this.serviceService.dedicate_license[0]: "00000000-0000-0000-0000-000000000000",
      //   this.serviceService.dedicate_license? this.serviceService.dedicate_license[1]: "00000000-0000-0000-0000-000000000000",
      //   this.serviceService.dedicate_license? this.serviceService.dedicate_license[2]: "00000000-0000-0000-0000-000000000000",
      //   ruleid
      // )
      .subscribe(
        (message) => {
//          console.log("next-response", message);

//          // console.log('message', message);
          const toast = this.notificationsService.success("Sucess", "sucesss");
          this.Close();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  public _toggleOpened(): void {
    this._opened = !this._opened;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "gray modal-lg" })
    );
  }

  closeModal() {
//    // console.log('closeing.....');
    this.modalRef.hide();
  }

//   getRequiredDocs() {
//     this.serviceService.getRequerdDocs(this.tskID).subscribe(
//       (RequerdDocs) => {
//         this.RequerdDocs = RequerdDocs;

// //        // console.log('RequerdDocs', this.RequerdDocs);
//       },
//       (error) => {
// //        console.log("error : ", error);
//       }
//     );
//   }

  upload(event, RequiredDoc) {
    const File = event.files[0];
    let base64file;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener("loadend", (e) => {
      base64file = reader.result;
      this.serviceService
        .saveFile(
          base64file,
          File.type,
          this.AppNo,
          RequiredDoc.requirement_code,
          "tasktype",
          RequiredDoc.description_en
        )
        .subscribe(
          (message) => {
//            // console.log('message', message);
          },
          (error) => {
//            console.log("error");
          }
        );
    });
  }

  selectNotes(note) {
    this.selectedNote = note;
    this.preNoteObj = note;
    this.ngxSmartModalService.getModal("Note").open();
  }

  getTaskData(task) {
    this.preAppID = 0;
    this.PreTaskData = [];
    for (let i = 0; i < this.PreAppData.length; i++) {
      if (this.PreAppData[i].tasks_task_code == task) {
//        // console.log('this.PreAppData[i]', this.PreAppData[i]);
        this.PreTaskData.push(this.PreAppData[i]);
      }
    }
//    // console.log('PreTaskData', this.PreTaskData);
  }
  getRequiredDocs() {
    this.serviceService.getRequerdDocs(this.tskID).subscribe(
      (RequerdDocs) => {
        this.RequerdDocs = RequerdDocs;

        if (this.RequerdDocs) {
          for (let i = 0; i < this.RequerdDocs.length; i++) {
            if (this.RequerdDocs[i].description_en == "Dummy") {
              this.RequerdDocs.splice(i, 1);
              break;
            }
          }
          this.getAllDocument();
        }
        // console.log('RequerdDocs', this.RequerdDocs);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getAllDocument() {
    this.serviceService.getAllDocument(this.licenceData.Licence_Service_ID, this.DocID).subscribe(SavedFiles => {
      this.SavedFiles = SavedFiles;
      if (this.RequerdDocs != null){
      for (let i = 0; i < this.RequerdDocs.length; i++) {
        for (let j = 0; j < SavedFiles.length; j++) {
          if (this.RequerdDocs[i].requirement_code == SavedFiles[j].requirement_code) {
            this.RequerdDocs[i].File = 'data:image/jpg;base64, ' + SavedFiles[j].document;
            this.RequerdDocs[i].File = this.sanitizer.bypassSecurityTrustResourceUrl(this.RequerdDocs[i].File);
            this.RequerdDocs[i].document_code = SavedFiles[j].document_code;
          }
        }
      }
      console.log('SavedFiles', this.SavedFiles);
    }}, error => {
      console.log('error');
    });
  }
  getRequiredDocspre(tskID) {
    this.serviceService.getRequerdDocs(tskID).subscribe(RequerdDocs => {
      this.RequerdDocspre = RequerdDocs;
      if (this.RequerdDocs != null)
        for (let i = 0; i < this.RequerdDocs.length; i++) {
          if (this.RequerdDocs[i].description_en == "Dummy") {
            this.RequerdDocs.splice(i, 1);
            break;
          }
        }
      this.getAllDocument();
       console.log('RequerdDocs', this.RequerdDocs);
    }, error => {
      console.log('error');
    });
  }

  signatures = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png"
  };

  detectMimeType(b64) {
    for (var s in this.signatures) {
      if (b64.indexOf(s) === 0) {
        return this.signatures[s];
      }
    }
  }

  getAllDocumentpre(Licence_Service_ID, DocID) {
    this.loadingPreDoc = true;
    this.serviceService.getAllDocument(Licence_Service_ID, DocID).subscribe(
      (SavedFiles) => {
        this.loadingPreDoc = false;
        console.log("pdf file", SavedFiles)
        this.SavedFilespre = SavedFiles;
          for (let i = 0; i < this.RequerdDocspre.length; i++) {
            for (let j = 0; j < SavedFiles.length; j++) {
              if (
                this.RequerdDocspre[i].requirement_code ==
                SavedFiles[j].requirement_code
              ) {

                try {
                  let fileData = JSON.parse(atob(
                    SavedFiles[j].document
                  ));

                  let { type, data } = fileData;

                  this.RequerdDocspre[i].mimeType = type;
                  this.RequerdDocspre[i].File =
                    "data:" + type + ";base64, " + data;
                  this.RequerdDocspre[
                    i
                  ].File = this.sanitizer.bypassSecurityTrustResourceUrl(
                    this.RequerdDocspre[i].File
                  );

                  this.RequerdDocspre[i].document_code =
                    SavedFiles[j].document_code;
                }
                catch (e) {
                  console.error(e);
                }
              }

            }
          }
        console.log("SavedFiles", this.SavedFiles);
        console.log("SavedFilesPre", this.RequerdDocspre);
      },
      (error) => {
        this.loadingPreDoc = false;
        console.log("error");
      }
    );
  }

  selectNote(value){

    this.currentRemark = this.notes[value]['remarks'];
  }


  GetNotePrevius(AppNo) {

    this.serviceService.GetNote(AppNo).subscribe(Notes => {
      if (Notes) {
//        console.log('NoteObj', Notes);
        this.preNoteObj = Notes[0];
      }
    }, error => {
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
  }

  getAppData(appNO) {
    this.preAppID = 0;
    this.serviceService.getTodandAppNo(appNO).subscribe(PreAppData => {
      this.PreAppData = PreAppData;
      // this.PreAppData = PreAppData;
//      console.log('PriveLicence', this.PriveLicence);
      for (let i = 0; i < this.PriveLicence.length; i++) {
        if (this.PriveLicence[i].Application_No == appNO) {
          this.SelectedpreApp = this.PriveLicence[i];
//          console.log('this.SelectedpreApp', this.SelectedpreApp);
        }
      }
      this.PreAppData = (Object.assign([], this.PreAppData.Table));
      // this.PreAppData = (Object.assign({}, this.PreAppData.Table));
//      // console.log('PreAppData', this.PreAppData);
      this.ifTask = true;
      this.GetNotePrevius(appNO);
      if (this.TaskN) {
        this.getTaskData(this.TaskN);

      }
    }, error => {
//      console.log('error');
    });
  }
  SelectTask(task) {
 console.log('task', task);
    this.selectedpreTask = task;
    this.selectedTask = task;
    this.getRequiredDocspre(task.tasks_task_code);
    this.getAllDocumentpre(this.SelectedpreApp.Licence_Service_ID, task.docId);
    if (task.form_code == "a7a1e05e-32c2-4f44-ad58-306572c64593") {
      this.preAppID = 2;
//      // console.log('to', 2);
    } else if (task.form_code == "343a087e-8a4b-4904-8ef3-08f723b74d3d") {
      this.preAppID = 3;
//      // console.log('to', 3);
    } else if (task.form_code == "9e0834e9-7ec2-460c-a5ed-7ade1204c7ee") {
      this.preAppID = 4;
//      // console.log('to', 4);
    } else {
      this.preAppID = 1;
//      // console.log('to', 1);
    }
    this.ifTaskDetail = true;
  }

  saveForm(formData) {
//    // console.log('formData', formData);
if( this.Service_ID=='c96544f2-d365-4ee3-825b-78e945c19fbf'){
  this.tskID="f1c93d72-07ca-4397-9108-08a9b69a811d"
}
else if( this.Service_ID=='6e32262b-61e6-4e8d-81df-4dae2193abe1'){
  this.tskID="bf23c7b0-576c-44ca-8475-34642e3df21a"
}
else if( this.Service_ID=='60c04f1e-646e-471c-9f96-55294f2cb7df'){
  this.tskID="eb2783ce-1283-434e-b076-72f1c40c7bfe"
}
    this.serviceService
      .saveForm(
        this.licenceData
        ? this.licenceData.Licence_Service_ID
        : "00000000-0000-0000-0000-000000000000",
      this.Service_ID,
      
      this.tskID ,
      this.workingUser.organization_code,
      JSON.stringify(formData),
      this.DocID || "00000000-0000-0000-0000-000000000000",
      this.todoID || "00000000-0000-0000-0000-000000000000"
      )
      .subscribe(
        (message) => {
          this.disablefins = false;
          this.AppCode = message[0];
          this.DocID = message[1];
          this.todoID = message[2];
          this.getAll(this.AppCode);
          const toast = this.notificationsService.success("Sucess", "Saved");
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  saveData(formData) {
    //    // console.log('formData', formData);
    if( this.Service_ID=='c96544f2-d365-4ee3-825b-78e945c19fbf'){
      this.tskID="f1c93d72-07ca-4397-9108-08a9b69a811d"
    }
    else if( this.Service_ID=='6e32262b-61e6-4e8d-81df-4dae2193abe1'){
      this.tskID="bf23c7b0-576c-44ca-8475-34642e3df21a"
    }
    else if( this.Service_ID=='60c04f1e-646e-471c-9f96-55294f2cb7df'){
      this.tskID="eb2783ce-1283-434e-b076-72f1c40c7bfe"
    }
        this.serviceService
          .saveForm(
            this.licenceData
            ? this.licenceData.Licence_Service_ID
            : "00000000-0000-0000-0000-000000000000",
          this.Service_ID,
          this.tskID ||"bf23c7b0-576c-44ca-8475-34642e3df21a",
          this.workingUser.organization_code,
          JSON.stringify(formData),
          this.DocID || "00000000-0000-0000-0000-000000000000",
          this.todoID || "00000000-0000-0000-0000-000000000000"
          )
          .subscribe(
            (message) => {
              // this.disablefins = false;
              this.AppCode = message[0];
              this.DocID = message[1];
              this.todoID = message[2];
              this.getAll(this.AppCode);
              const toast = this.notificationsService.success("Sucess", "Saved");
            },
            (error) => {
              const toast = this.notificationsService.error(
                "Error",
                "SomeThing Went Wrong"
              );
            }
          );
      }
  getFormData(DocID) {
    this.serviceService.GetForm(DocID).subscribe(
      (FormData) => {
        this.FormData = FormData;

        this.FormData = JSON.parse(this.FormData);
        // this.FormData = (Object.assign({}, this.FormData));
//        // console.log('FormData', FormData);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getTaskRule(tasksId) {
    this.serviceService.getTaskRule(tasksId).subscribe(
      (DropDownList) => {
        this.DropDownList = DropDownList;
        this.DropDownList = Object.assign([], this.DropDownList);
//        // console.log('DropDownList', DropDownList);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  Close() {
    this.router.navigate(["/task/MyTask"]);
  }

  SubmitAR(ruleid) {
    this.disablefins = true;
    this.serviceService
      .SubmitAR(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          if (message) {
            const toast = this.notificationsService.success(
              "Sucess",
              "sucesss"
            );
          } else {
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
          this.Close();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  getLookups() {
    this.getCustomerTypeLookUP();
    this.getSuspendedReasonLookUP();
    this.getPropertyTypeLookUP();
    this.getPropertyStatusLookUP();
    this.getServiceDeliveryUnitLookUP();
    this.getWoredaLookUP();
    this.getPlotStutusLookUP();
    this.getPlotLandUseLookUP();
    this.getCustomerLookUP();
    this.getTransferTypeLookUP();
    this.getLease_Type_Lookup();
  }

  getPriveysLicence(Certificate_Code) {
    this.AppN = null;
    this.serviceService.getPriveys(Certificate_Code).subscribe(PriveLicence => {
      this.PriveLicence = PriveLicence;
      this.PriveLicence = (Object.assign([], this.PriveLicence.list));
//      console.log('this.PriveLicence', this.PriveLicence);
      this.AppNoList = [];
      for (let i = 0; i < this.PriveLicence.length; i++) {
        this.AppNoList[i] = {};
        this.AppNoList[i].Application_No = this.PriveLicence[i].Application_No;

      }


      this.PriveAppNoList = (Object.assign([], this.AppNo));
//      // console.log('this.AppNoList', this.AppNoList);
//      // console.log('PriveLicence', PriveLicence);
      this.ifAppNo = true;

      this.AppN = this.AppNo;
      this.getAppData(this.AppN);
      this.TaskN = this.tskID;
    }, error => {
//      console.log('error');
    });
  }

  getCustomerTypeLookUP() {
    this.serviceService.getCustomerTypeLookUP().subscribe(
      (CustomerTypeLookUP) => {
        this.CustomerTypeLookUP = CustomerTypeLookUP;
        this.CustomerTypeLookUP = Object.assign(
          [],
          this.CustomerTypeLookUP.list
        );
//        //  console.log('CustomerTypeLookUP', CustomerTypeLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getSuspendedReasonLookUP() {
    this.serviceService.getSuspendedReasonLookUP().subscribe(
      (SuspendedReasonLookUP) => {
        this.SuspendedReasonLookUP = SuspendedReasonLookUP;
        this.SuspendedReasonLookUP = Object.assign(
          [],
          this.SuspendedReasonLookUP.list
        );
//        // console.log('SuspendedReasonLookUP', SuspendedReasonLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getPropertyTypeLookUP() {
    this.serviceService.getPropertyTypeLookUP().subscribe(
      (PropertyTypeLookUP) => {
        this.PropertyTypeLookUP = PropertyTypeLookUP;
        this.PropertyTypeLookUP = Object.assign(
          [],
          this.PropertyTypeLookUP.list
        );
//        // console.log('PropertyTypeLookUP', PropertyTypeLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getPropertyStatusLookUP() {
    this.serviceService.getPropertyStatusLookUP().subscribe(
      (PropertyStatusLookUP) => {
        this.PropertyStatusLookUP = PropertyStatusLookUP;
        this.PropertyStatusLookUP = Object.assign(
          [],
          this.PropertyStatusLookUP.list
        );
//        // console.log('PropertyStatusLookUP', PropertyStatusLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getServiceDeliveryUnitLookUP() {
    this.serviceService.getServiceDeliveryUnitLookUP().subscribe(
      (ServiceDeliveryUnitLookUP) => {
        this.ServiceDeliveryUnitLookUP = ServiceDeliveryUnitLookUP;
        this.ServiceDeliveryUnitLookUP = Object.assign(
          [],
          this.ServiceDeliveryUnitLookUP
        );
//        console.log("ServiceDeliveryUnitLookUP", ServiceDeliveryUnitLookUP);
      },
      (error) => {
//        console.log("service delivery error : ", error);
      }
    );
  }

  getTransferTypeLookUP() {
    this.serviceService.getTransferTypeLookUP().subscribe(
      (TransferTypeLookUP) => {
        this.TransferTypeLookUP = TransferTypeLookUP;
        this.TransferTypeLookUP = Object.assign(
          [],
          this.TransferTypeLookUP.list
        );
//        console.log("TransferTypeLookUP", TransferTypeLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getLease_Type_Lookup() {
    this.serviceService.getLease_Type_Lookup().subscribe(
      (Lease_Type_Lookup) => {
        this.Lease_Type_Lookup = Lease_Type_Lookup;
        this.Lease_Type_Lookup = Object.assign([], this.Lease_Type_Lookup.list);
//        console.log("Lease_Type_Lookup", Lease_Type_Lookup);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getWoredaLookUP() {
    this.serviceService.getWoredaLookUP().subscribe(
      (WoredaLookUP) => {
        this.WoredaLookUP = WoredaLookUP;
        this.WoredaLookUP = Object.assign([], this.WoredaLookUP.list);
//        // console.log('WoredaLookUP', WoredaLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getCustomerLookUP() {
    this.serviceService.getCustomerLookUP().subscribe(
      (CustomerLookUP) => {
        this.CustomerLookUP = CustomerLookUP;
        this.CustomerLookUP = Object.assign([], this.CustomerLookUP.list);
        for (let i = 0; i < this.CustomerLookUP.length; i++) {
          this.CustomerLookUP[i].FullName_AM =
            this.CustomerLookUP[i].Applicant_First_Name_AM +
            " " +
            this.CustomerLookUP[i].Applicant_Middle_Name_AM +
            " " +
            this.CustomerLookUP[i].Applicant_Last_Name_AM;
          this.CustomerLookUP[i].FullName_EN =
            this.CustomerLookUP[i].Applicant_First_Name_EN +
            " " +
            this.CustomerLookUP[i].Applicant_Middle_Name_En +
            " " +
            this.CustomerLookUP[i].Applicant_Last_Name_EN;
        }
        this.getCustomerBankLookUP();
//        console.log("CustomerLookUP", this.CustomerLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getCustomerBankLookUP() {
    this.CustomerBankLookUP = [];
    for (let i = 0; i < this.CustomerLookUP.length; i++) {
      if (
        this.CustomerLookUP[i].Customer_Type_ID == "3" ||
        this.CustomerLookUP[i].Customer_Type_ID == "5"
      ) {
        this.CustomerBankLookUP.push(this.CustomerLookUP[i]);
      }
    }
//    console.log("CustomerBankLookUP", this.CustomerBankLookUP);
  }

  getPlotStutusLookUP() {
    this.serviceService.getPlotStutusLookUP().subscribe(
      (PlotStutusLookUP) => {
        this.PlotStutusLookUP = PlotStutusLookUP;
        this.PlotStutusLookUP = Object.assign([], this.PlotStutusLookUP.list);
//        // console.log('PlotStutusLookUP', PlotStutusLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }

  getPlotLandUseLookUP() {
    this.serviceService.getPlotLandUseLookUP().subscribe(
      (PlotLandUseLookUP) => {
        this.PlotLandUseLookUP = PlotLandUseLookUP;
        this.PlotLandUseLookUP = Object.assign([], this.PlotLandUseLookUP.list);
//        // console.log('PlotLandUseLookUP', PlotLandUseLookUP);
      },
      (error) => {
//        console.log("error");
      }
    );
  }
}
