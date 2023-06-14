import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
import { InputTextModule } from 'primeng/inputtext';

import {
  FileUploadModule,
  AutoCompleteModule,
  DropdownModule,
  TabMenuModule,
  TabView,
  TabViewModule,
  ProgressSpinnerModule,
} from "primeng/primeng";

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
import { SiteMapssComponent } from "./site-mapss/site-mapss.component";
import { GeojsondeskComponent } from "./geojsondesk/geojsondesk.component";

import { SurveyComponent } from "./task-layout/layout.component";
// import { FormDisplayComponent } from "./form-display/form-display.component";
import { MapComponent } from './map/map.component';
import { MineralUsesComponent } from "./mineral-uses/mineral-uses.component";
import { GisComponent } from "./gis/gis.component";
import { FormDisplayComponent } from "./form-display/form-display.component";
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { ButtonModule } from 'primeng/button';
import { LicenseComponent } from './license/license.component';
import { RenewalInformationComponent } from './renewal-information/renewal-information.component';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import { ArchwizardModule } from 'angular-archwizard';
import { GisPlotComponent } from './gis-plot/gis-plot.component';
import { DutyFreeVehiclesAndMachineryDataComponent } from './duty-free-vehicles-and-machinery-data/duty-free-vehicles-and-machinery-data.component';
import { EnvironmentalConsiderationComponent } from './environmental-consideration/environmental-consideration.component';
import { LicenseeMineralProductionInspectionComponent } from './licensee-mineral-production-inspection/licensee-mineral-production-inspection.component';
import { MiningRevenueCollectedFromLicenseeComponent } from './mining-revenue-collected-from-licensee/mining-revenue-collected-from-licensee.component';
import { MineralProductionComponent } from './mineral-production/mineral-production.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    MatDialogModule,
    FormsModule,
    ServiceRoutingModule,
    AngularFontAwesomeModule,
    TreeModule,
    ArchwizardModule,
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
    GMapModule ,
    // TabsModule
        TabViewModule

  ],
  declarations: [

    ServiceComponent,
    LoadingComponent,
    SurveyComponent,
    FormDisplayComponent,

    DemoComponent,
    TaxTypeComponent,

    UnitOfMeasureComponent,
    CurrencyComponent,

    PeriodsComponent,
    MineralComponent,
    MineralUseComponent,
    MineralUsesComponent,
    ResourceDepositComponent,
    SiteComponent,
    ListMineralComponent,
    SiteListComponent,
    SiteMapComponent,
    SiteMapssComponent,
    GisComponent,
      GeojsondeskComponent,
      MapComponent,
      CustomerNewComponent,
      LicenseComponent,
      RenewalInformationComponent,
      CustomerTypeComponent,
      GisPlotComponent,
      DutyFreeVehiclesAndMachineryDataComponent,
      EnvironmentalConsiderationComponent,
      LicenseeMineralProductionInspectionComponent,
      MiningRevenueCollectedFromLicenseeComponent,
      MineralProductionComponent
  // DrawmapComponent

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
    GisComponent
  ]
})
export class ServiceModule {}
