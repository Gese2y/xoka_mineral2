import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MineralService {
  private Class =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Class';
  private Mineral_Use =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Mineral_Use';
  private Chemical_Classification =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Chemical_Classification';
  private Tenacity =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Tenacity';
  
  public mineralUrl = environment.rootApiPath + ""; 
  public rootApiPath = environment.rootApiPath;

  constructor(private http: HttpClient) { }
  
  addmineral(mineral) {
    return this.http.post(this.mineralUrl, mineral);
  }
  getmineral() {
    return this.http.get(this.mineralUrl);
  }
  getClass(){
    return this.http.get<any>(this.Class);
  }
  getMineral_Use(){
    return this.http.get<any>(this.Mineral_Use);
  } 
  getChemical_Classification(){
    return this.http.get<any>(this.Chemical_Classification);
  } 
  getTenacity(){
    return this.http.get<any>(this.Tenacity);
  }
  getminerals() {
    return this.http.get(this.rootApiPath + "mineral/minerals");
  }
}
