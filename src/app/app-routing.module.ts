import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceComponent } from "./service/service.component";
import { CustomerNewComponent } from "./service/customer-new/customer-new.component";
import { LicenseComponent } from "./service/license/license.component";
import { RenewalInformationComponent } from "./service/renewal-information/renewal-information.component";
import { GisPlotComponent } from "./service/gis-plot/gis-plot.component";

const routes: Routes = [
  {path: "gis", component: GisPlotComponent},
    {
    path: "",
    redirectTo: "/task/MyTask",
    pathMatch: "full",
  },
  // { path: "**", redirectTo: "/task/MyTask", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
