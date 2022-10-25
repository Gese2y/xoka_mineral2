import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasureService {
  // public cUnitUrl = environment.rootApiPath + 'finance/cUnit';
  public UnitofMeasuresUrl = environment.rootApiPath + 'finance/cUnit';


  getUnitofMeasure() {
    return this.http.get(this.UnitofMeasuresUrl);
  }
  constructor(private http: HttpClient) {}

  updateUnitofMeasures(UnitofMeasures) {
    return this.http.put(this.UnitofMeasuresUrl, UnitofMeasures);
  }

  addUnitofMeasures(UnitofMeasures) {
    return this.http.post(this.UnitofMeasuresUrl, UnitofMeasures);
  }
  deleteUnitofMeasures(UnitofMeasures) {
    return this.http.delete(
      this.UnitofMeasuresUrl + "/" + UnitofMeasures.unit
    );
  }
}
