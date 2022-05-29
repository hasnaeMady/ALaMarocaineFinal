import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};

  private _autoRefresh$ = new Subject();
  get autoRefresh$() {
    return this._autoRefresh$;
  }
  constructor(private http: HttpClient, private httpService: HttpserviceService) { }
  private httpOtions = {headers: new HttpHeaders({ 'content-type': 'application/json' })};

  
  
  placeOrder(platId: any, AddressId: any): Observable<any> {

    return this.http.post(`${environment.BASE_URL}/${environment.PLACE_ORDER}${AddressId}&platId=${platId}`,
    {}, {headers: new HttpHeaders({token: localStorage.token})});
  }
}