import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessOrganizationTypeService {
  public procAdBusinessTypeUrl = environment.rootApiPath + "finance/procAdBusinessType";

  constructor(private http: HttpClient) {}

  addprocAdBusinessTypes(procAdBusinessType) {
    return this.http.post(this.procAdBusinessTypeUrl, procAdBusinessType);
  }

  getprocAdBusinessTypes() {
    return this.http.get(this.procAdBusinessTypeUrl);
  }
 
  updateprocAdBusinessTypes(procAdBusinessType) {
    return this.http.put(this.procAdBusinessTypeUrl, procAdBusinessType);
  }
  deleteprocAdBusinessTypes(procAdBusinessType) {
    return this.http.delete(
      this.procAdBusinessTypeUrl + "/" + procAdBusinessType.id
    );
  }
}
