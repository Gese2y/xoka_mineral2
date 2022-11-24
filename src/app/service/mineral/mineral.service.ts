import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { MineralService } from 'mineral/mineral.service.ts'
@Injectable({
  providedIn: 'root'
})
export class MineralService {
  
 
  private Class = environment.rootPath + 'BPEL/GetLookUp?DropGownName=Mineral_Class';
  private Mineral_Use =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Use_Of_Mineral';
  private Chemical_Classification =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Chemical_Classification';
  private Tenacity =environment.rootPath + 'BPEL/GetLookUp?DropGownName=Tenacity';
  
  public mineralUrl = environment.rootApiPath + "Mineral"; 
  public rootApiPath = environment.rootApiPath;
  constructor(private http: HttpClient) { }
  
  addminerals(minerals) {
    return this.http.post(this.mineralUrl, minerals);
  }
  getminerals() {
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
  // getminerals() {
  //   return this.http.get(this.rootApiPath + "Mineral");
  // }
  deletemineral(mineral) {
    return this.http.delete(
      this.mineralUrl + "/" + mineral.mineral_Id
    );
  }
  Updatemineral(minerals) {
    return this.http.put(this.mineralUrl+'/id', minerals) ;
  }
}
