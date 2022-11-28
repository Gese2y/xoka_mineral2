import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ServiceRoutingModule } from "./service-routing.module";
import { ServiceComponent } from "./service.component";
import { ServiceService } from "./service.service";
import { TreeModule } from "primeng/tree";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { TabsModule } from "ngx-bootstrap/tabs";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from "../shared/loading/loading.component";
import { SimpleNotificationsModule } from "angular2-notifications";
import { TranslateModule } from "@ngx-translate/core";
import { SidebarModule } from "ng-sidebar";
import { BrowserModule } from "@angular/platform-browser";
import { DialogModule } from "primeng/dialog";

import {
  FileUploadModule,
  AutoCompleteModule,
  DropdownModule,
  TabMenuModule,
  TabView,
  TabViewModule,
  ProgressSpinnerModule,
} from "primeng/primeng";
import { FormDisplayComponent } from "./form-display/form-display.component";
import { SurveyComponent } from "./task-layout/survey.component";
import { DemoComponent } from "./demo/demo.component";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxPaginationModule } from 'ngx-pagination';
import { TaxTypeComponent } from './tax-type/tax-type.component';
import { UnitOfMeasureComponent } from "./unit-of-measure/unit-of-measure.component";
import { CurrencyComponent } from './currency/currency.component';
import { PeriodsComponent } from './periods/periods.component';
import { MineralComponent } from './mineral/mineral.component';
import { MineralUseComponent } from './mineral-use/mineral-use.component';
import { ResourceDepositComponent } from './resource-deposit/resource-deposit.component';
import { SiteComponent } from './site/site.component';
import { ListMineralComponent } from './list-mineral/list-mineral.component';
import { SiteListComponent } from './site-list/site-list.component';
import {GMapModule} from 'primeng/gmap';
import { SiteMapComponent } from './site-map/site-map.component';
// import { ArchwizardModule } from 'angular-archwizard';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    DialogModule,
    MatDialogModule,
    FormsModule,
    ServiceRoutingModule,
    AngularFontAwesomeModule,
    TreeModule,
    // ArchwizardModule,
ProgressSpinnerModule,
NgxPaginationModule,
    TableModule,
    TabsModule.forRoot(),
    // AgmCoreModule.forRoot({
      // apiKey: ''
    // }),
    // LeafletModule,
    CheckboxModule,
    ToastModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forChild({}),
    SidebarModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule,
    AutoCompleteModule,
    DropdownModule,
    // LeafletModule
    GMapModule 
    
  ],
  declarations: [
   
    ServiceComponent,
    LoadingComponent,
    FormDisplayComponent,
    SurveyComponent,
    
    DemoComponent,
    TaxTypeComponent,
    
    UnitOfMeasureComponent,
    CurrencyComponent,
    SurveyComponent,
    PeriodsComponent,
    MineralComponent,
    MineralUseComponent,
    ResourceDepositComponent,
    SiteComponent,
    ListMineralComponent,
    SiteListComponent,
    SiteMapComponent,
   
  ],
  providers: [
    ServiceService,
    MessageService,
    // MaintainCustomerService,
    // MaintainVendorService,
    // MaintainInventoryitemService,
  ],
  entryComponents : [
    // UserComponent,
  
  ]
})
export class ServiceModule {}
