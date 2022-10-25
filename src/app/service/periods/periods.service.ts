import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  public procAdPeriodsUrl = environment.rootApiPath + "finance/procAdPeriods"; 
  public isactiveUrl = environment.rootApiPath + "finance/procAdPeriods";
  // public org_IDUrl = environment.rootApiPath + "finance/procADOrg";
  public yearUrl = environment.rootApiPath + "finance/ProcAdYear";

  constructor(private http: HttpClient) {}

  getprocAdPeriods() {
    return this.http.get(this.procAdPeriodsUrl);
  }
  getisactive() {
    return this.http.get(this.isactiveUrl);
  }
  addperiods(procAdPeriods) {
    return this.http.post(this.procAdPeriodsUrl, procAdPeriods);
  }
  // getorg_ID() {
  //   return this.http.get(this.org_IDUrl);
  // } 
  getyear() {
    return this.http.get(this.yearUrl);
  }
  updateperiods(procAdPeriods) {
    return this.http.put(this.procAdPeriodsUrl, procAdPeriods);
  }
  deleteperiods(procAdPeriods) {
    return this.http.delete(
      this.procAdPeriodsUrl + "/" + procAdPeriods.startDate
    );
  }
}
