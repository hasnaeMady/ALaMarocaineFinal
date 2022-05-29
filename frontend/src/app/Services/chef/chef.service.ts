import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ChefService {

 
  private _autoRefresh$ = new Subject();
  get autoRefresh$() {
    return this._autoRefresh$;
  }
  private baseUrl = environment.BASE_URL;
  private httpOptions = {headers: new HttpHeaders({ 'content-type': 'application/json' })};


  private searchChefData = new Subject<any>();//
  private notesList = new Subject<any>();//
  private getReviewUrl = environment.getReview;//

  
  


  constructor(private http: HttpClient, private httpService: HttpserviceService) { }


  //A SUPPRIMER
  public getAllApprovedChef(): Observable<any> {
    return this.http.get(`${this.baseUrl}/chefs/approved?order=asc`);
  }

 //A SUPPRIMER
  public getAllApprovedChefsByPage(page: number, sortby ?: string, orderBy ?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/chefs/approved?page=${page}&order=${orderBy}&sortBy=${sortby}`);
  }

    /// c'est la seule qui sera utilisée
  getallChefs() {
   
  
    return this.httpService.get(`${this.baseUrl}/chefs/`, {headers: new HttpHeaders({token: localStorage.token})});
  }





  // utilisée dans addplat.component.ts

  //Ajouter  un chef
  addChef(chef: any, imageName: string): Observable<any> {
    return this.httpService
      .post(`${environment.ChefUrl}/${environment.addchefs}/${imageName}`, chef, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }



  //supprimer un chef
  deleteChef(chefId: any): Observable<any> {
    return this.httpService
      .delete(`${environment.ChefUrl}/${environment.deleteChef}/${chefId}`, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }


  //Modifier un chef
  updateChef(chefId: any, chef: any): Observable<any> {
    return this.httpService
  
    .put(`${environment.ChefUrl}/${environment.editChef}/${chefId}`, chef, {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }

 




   //utilisée dans upload-plat-image.component.ts
  uploadChefImage(chefId,  formData): Observable<any> {
    return this.httpService
      // tslint:disable-next-line: max-line-length
      .post(`${environment.ChefUrl}/${environment.addChefImage}/${chefId}`, formData, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }


  
  getChefByid(Chefid: any): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/chefs/getchef/${Chefid}`,
       {});
  }

  setSearchChefData(message: any) {
 
    return this.searchChefData.next({ chef: message });
  }
  getSearchChefData(): Observable<any> {

    return this.searchChefData.asObservable();
  }




  public getChefById(chefId: any): Observable<any> {
  
    return this.http.get(
      environment.BASE_URL + environment.getchefbyIdurl + chefId,
      {}
    );
  }
  public ratingandreview(chefId: number, data: any , token: any) {
    
    const tokens = token;

    return this.http
      .put(environment.BASE_URL + '/' + environment.WRITE_REVIEW + chefId, data, {headers: new HttpHeaders({token})})
      .pipe(tap(() => {
          this.searchChefData.next();
        })
      );
  }

  public getratingandreview(chefId: number) {
    return this.http.get(environment.BASE_URL + environment.ratereview + chefId, this.httpOptions);
  }

  getInProgressOrderedChefs(): Observable<any> {
     return this.httpService.get(environment.sellerUrl + environment.getOrdersByseller, {});
   }

  public getReview(chefId: number) {
     return this.http.get(`${environment.BASE_URL}/${this.getReviewUrl}?chefId=${chefId}`, this.httpOptions);
  }









  public getOneChef(chefId: number , token: any) {
    return this.http.get(`${this.baseUrl}/chefs/getchef/${chefId}`, {headers: new HttpHeaders({token})});}



  public getOneChefById(chefId: number) {
   return this.http.get(`${this.baseUrl}/chefs/getchef/${chefId}`,this.httpOptions);}


}
