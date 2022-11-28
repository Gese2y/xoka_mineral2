import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  constructor(private http: HttpClient) { }

  getFormData(formCode, taskNumber): Observable<FormData> {
    if (environment.production) {
      console.log(environment.formPath + formCode + ".json");
      if (taskNumber > 1) {
        return this.http.get<any>(environment.formPath + formCode + ".json");
      }
      else {
        return this.http.get<any>(environment.formPathPrimary + formCode + ".json");
      }
    }
    else {
      return this.http.get<any>(`http://localhost/cdn/json/${taskNumber > 1 ? '' : 'first/'}${formCode}.json`);
    }
  }
}
