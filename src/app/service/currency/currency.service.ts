import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public currencyUrl =
  environment.rootApiPath + "CurrencyID";

constructor(private http: HttpClient) {}

getcurrencyss() {
  return this.http.get(this.currencyUrl);
}
addcurrencyss(currency) {
  return this.http.post(this.currencyUrl, currency);
}
updatecurrencyss(currency) {
  return this.http.put(this.currencyUrl, currency);
}
deletecurrencyss(currency) {
  return this.http.delete(
    this.currencyUrl + "/" + currency.currencyID
  );
}
}
