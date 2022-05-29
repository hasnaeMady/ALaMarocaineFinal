import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {




  private _autoRefresh$ = new Subject();


  get autoRefresh$() {
    return this._autoRefresh$;
  }



  private baseUrl = environment.BASE_URL;  //BASE_URL: 'http://localhost:8020'


  private httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};

  
  

  
  private  addwhistlistUrl = environment.WISHLIST_ADD; //WISHLIST_ADD: 'alamarocaine/v3/wishlist/addplatWishlist'
  

 
  constructor(private http: HttpClient, private httpService: HttpserviceService) { }



   // ajouter un plat à la liste des souhaits
  addToWishlist(platId: any): Observable<any> {
     return this.httpService
      .post(`${this.baseUrl}/${this.addwhistlistUrl}/${platId}`  , {},  {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(tap(() => {this._autoRefresh$.next(); }) );
  }



  //Retourne  la liste des souhaits
  getWishllistPlats() {

    return this.httpService.get(`${this.baseUrl}/${environment.WISHLIST_GET}`, {headers: new HttpHeaders({token: localStorage.token})});
  }


  //retourne le nombre de plats dans la liste des souhaits
  getWishlistCount(): Observable<any> {
  
    return this.httpService.get(`${this.baseUrl}/${environment.WISHLIST_COUNT}`, {headers: new HttpHeaders({token: localStorage.token})});
  }



  //supprime le plat de la liste des souhaits
  removeFromWishList(orderId: number) {
   
    return this.httpService.delete(`${this.baseUrl}/${environment.WISHLIST_REMOVE}` + orderId, {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }





}
