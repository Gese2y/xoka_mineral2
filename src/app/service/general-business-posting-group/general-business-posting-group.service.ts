import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GeneralBusinessPostingGroupService {

  public productionTaxUrl =
    environment.rootApiPath + "finance/TAXProdPostingGroup";

  public genBusinessPostingGroupUrl =
    environment.rootApiPath + "finance/GenBusPostingGroups";

  public GenBusPostingGroupsUrl =
    environment.rootApiPath + "finance/GenBusPostingGroups";

public TAXBusPostingGroupUrl =
    environment.rootApiPath + "finance/TAXBusPostingGroup";

  constructor(private http: HttpClient) {}

  getBusinessionTaxes() {
    return this.http.get(this.productionTaxUrl);
  }
  getGenBusPostingGroups() {
    return this.http.get(this.GenBusPostingGroupsUrl);
  }
 
  getTAXBusPostingGroup() {
    return this.http.get(this.TAXBusPostingGroupUrl);
  }
  addGenBusPostingGroups(GenBusPostingGroups) {
    return this.http.post(this.GenBusPostingGroupsUrl, GenBusPostingGroups);
  }

  updateGenBusPostingGroups(GenBusPostingGroups) {
    return this.http.put(
      this.GenBusPostingGroupsUrl,
      GenBusPostingGroups
    );
  }

  deleteGenBusPostingGroups(GenBusPostingGroups) {
    return this.http.delete(
      this.GenBusPostingGroupsUrl + "/" + GenBusPostingGroups.code
    );
  }
}
