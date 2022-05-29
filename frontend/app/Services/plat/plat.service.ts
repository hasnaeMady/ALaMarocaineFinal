import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class PlatService {


  private _autoRefresh$ = new Subject();
  get autoRefresh$() {
    return this._autoRefresh$;
  }
  private baseUrl = environment.BASE_URL;
  private httpOptions = {headers: new HttpHeaders({ 'content-type': 'application/json' })};



  private searchPlatData = new Subject<any>();
  private getReviewUrl = environment.getReview;

  
  


  constructor(private http: HttpClient, private httpService: HttpserviceService) { }


  //A SUPPRIMER
  public getAllApprovedPlat(): Observable<any> {
    return this.http.get(`${this.baseUrl}/plats/approved?order=asc`);
  }

 //A SUPPRIMER
  public getAllApprovedPlatByPage(page: number, sortby ?: string, orderBy ?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/plats/approved?page=${page}&order=${orderBy}&sortBy=${sortby}`);
  }

    /// c'est la seule qui sera utilisée
  getallPlats() {
   
    return this.httpService.get(`${this.baseUrl}/plats/`, {headers: new HttpHeaders({token: localStorage.token})});
  }





  // utilisée dans addplat.component.ts
  addPlat(plat: any, imageName: string): Observable<any> {
    return this.httpService
      .post(`${environment.PlatUrl}/${environment.addplats}/${imageName}`, plat, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }




  deletePlat(platId: any): Observable<any> {
    return this.httpService
      .delete(`${environment.PlatUrl}/${environment.deletePlat}/${platId}`, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  updatePlat(platId: any, plat: any): Observable<any> {
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .put(`${environment.PlatUrl}/${environment.editPlat}/${platId}`, plat, {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }

  




   //utilisée dans upload-plat-image.component.ts
  uploadPlatImage(platId,  formData): Observable<any> {
    return this.httpService
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PlatUrl}/${environment.addPlatImage}/${platId}`, formData, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }


  
  getPlatByid(Platid: any): Observable<any> {
   return this.http.get(`${this.baseUrl}/plats/getplat/${Platid}`, {});
  }

  setSearchPlatData(message: any) {
    
    return this.searchPlatData.next({ plat: message });
  }



  getSearchPlatData(): Observable<any> {
    return this.searchPlatData.asObservable();
  }



  public getRateOfPlatById(platId: any): Observable<any> {

 
    return this.http.get(environment.BASE_URL + '/' + environment.avgrateofplat + platId,{});
  }




  public getPlatById(platId: any): Observable<any> {
    
    return this.http.get(environment.BASE_URL + environment.getplatbyIdurl + platId, {});
  }


  public ratingandreview(platId: number, data: any , token: any) {
   const tokens = token;
   return this.http
      .put(environment.BASE_URL + '/' + environment.WRITE_REVIEW + platId, data, {headers: new HttpHeaders({token})})
      .pipe( tap(() => {this.searchPlatData.next();}));
  }



  public getratingandreview(platId: number) {
    return this.http.get(environment.BASE_URL + environment.ratereview + platId, this.httpOptions);
  }


////////////////////////////////////////////////////////////////////////////////
  getInProgressOrderedPlats(): Observable<any> {
 
   return this.httpService.get(environment.sellerUrl + environment.getOrdersByseller, {});
   }
//////////////////////////////////////////////////////////////

  public getReview(platId: number) {
   
    return this.http.get(`${environment.BASE_URL}/${this.getReviewUrl}?platId=${platId}`, this.httpOptions);
  }

  public getSortedPlatByRate(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/${environment.getSortedPlatByRate}`, this.httpOptions);
  }
  public getOnePlat(platId: number , token: any) {
    return this.http.get(`${this.baseUrl}/plats/getplat/${platId}`,
    {headers: new HttpHeaders({token})});
  }

  public getOnePlatById(platId: number) {
    return this.http.get(`${this.baseUrl}/plats/getplat/${platId}`,
    this.httpOptions);
  }





}
