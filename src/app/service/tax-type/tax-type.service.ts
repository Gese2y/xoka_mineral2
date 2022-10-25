import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root",
  })
  export class TaxTypeService {
    public taxtypeUrl =
    environment.rootApiPath + "finance/CTax";
    public org_IDUrl =
    environment.rootApiPath + "finance/procADOrg";

  constructor(private http: HttpClient) {}

  gettaxtype() {
    return this.http.get(this.taxtypeUrl);
  }

  addtaxtypes(taxtype) {
    return this.http.post(this.taxtypeUrl, taxtype);
  }

  updatetaxtypes(taxtype) {
    return this.http.put(this.taxtypeUrl, taxtype);
  }

  deletetaxtypes(taxtype) {
    return this.http.delete(
      this.taxtypeUrl + "/" + taxtype.code
    );
  }
  getorg_ID() {
    return this.http.get(this.org_IDUrl);
  }
}
