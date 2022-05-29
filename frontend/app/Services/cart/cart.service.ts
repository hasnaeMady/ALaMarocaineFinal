import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { Observable, Subject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private platApiUrl = environment.PlatUrl;
  private baseUrl = environment.BASE_URL;
  private httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};
  
  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }

  constructor(private http: HttpClient, private httpService: HttpserviceService) { }

  private httpOtions = {headers: new HttpHeaders({ 'content-type': 'application/json' })};



  post( arr: any): Observable<any> {
    console.log(arr, 'custmerdetails');
    return this.httpService.post(environment.CartUrl + environment.addUrl, arr, '');
  }



  addToCart(platId: any): Observable<any> {
    return this.httpService
      .post(`${environment.PlatUrl}/${environment.ADDCART}/${platId}`, {}, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }



  increasePlatsQuantity(platId, CartInfo) {
    console.log('cart details are ', CartInfo);
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .put(`${environment.PlatUrl}/${environment.INC_PLATS_QUANTITY}${platId}`, CartInfo , {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }



 decreasePlatsQuantity(platId, CartInfo) {
    console.log('cart details are ', CartInfo);
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .put(`${environment.PlatUrl}/${environment.DEC_PLATS_QUANTITY}${platId}`, CartInfo , {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }






  removeIteamFromCart(platId: number) {
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .delete(`${environment.PlatUrl}/${environment.REMOVE_PLATS_FROM_CART}/${platId}`, {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }



  getCartPlatsFrom() {
    // tslint:disable-next-line: max-line-length
    return this.httpService.get(`${this.baseUrl}/${environment.GET_PLATS_FROM_CART}`, {headers: new HttpHeaders({token: localStorage.token})});
  }

  getCartItemCount(): Observable<any> {
    console.log('get itmes from cart');
    // tslint:disable-next-line: max-line-length
    return this.httpService.get(`${this.baseUrl}/${environment.COUNT_PLATS_IN_CART}`, {headers: new HttpHeaders({token: localStorage.token})});
  }

  

  addquantity(PLatId: any, quantity: any): Observable<any> {
    return this.httpService.post(environment.quantity + environment.addplatsquantity + '/' + PLatId + '/' + quantity, '', '');  }
}
