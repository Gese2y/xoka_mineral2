import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryCostingMethodsService {
  public inventoryCostingMethodUrl =
  environment.rootApiPath + "CostMethod";
  constructor(private http: HttpClient) { }
  
  getInventoryCostingMethodss() {
    return this.http.get(this.inventoryCostingMethodUrl);
  }
  addInventoryCostingMethodss(inventoryCostingMethod) {
    return this.http.post(this.inventoryCostingMethodUrl, inventoryCostingMethod);
  }
  updateInventoryCostingMethodss(inventoryCostingMethod) {
    return this.http.put(this.inventoryCostingMethodUrl, inventoryCostingMethod);
  }
  deleteInventoryCostingMethod(inventoryCostingMethod) {
    return this.http.delete(
      this.inventoryCostingMethodUrl + "/" + inventoryCostingMethod.id
    );
  }
}
