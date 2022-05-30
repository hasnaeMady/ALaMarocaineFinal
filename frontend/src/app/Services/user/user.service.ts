import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject,Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { UserModule } from 'app/Models/user/user.module';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }

  private searchUserData = new Subject<any>();
  private  baseUrl = environment.BASE_URL;
  constructor(private http: HttpClient, private httpService: HttpserviceService) { }
  private httpOtions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };
 public signUp(data: any) {
    return this.http.post(`${this.baseUrl}/registration`, data);
  }
  public signIn(data: any) {
    return this.http.post(`${this.baseUrl}/user/login`, data);
  }
  verifyUserByToken(token) {
    return this.http.post(`${this.baseUrl}/user/verify/`, token);
  }
  forgetPassword(data) {
    return this.http.post(`${this.baseUrl}/user/forgotpassword`, data);
  }
  public updatePassword(updatePassword: any, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/update/${token}`,
      updatePassword,
    );
  }
  public getAdress(): Observable<any> {
    return this.http.get(`${this.baseUrl}/${environment.GET_ADDRESS_BY_ADDRES}`, {headers: new HttpHeaders({token: localStorage.token})});
  }
  public addAdress(address: any) {
    return this.http
    .post(`${environment.BASE_URL}/${environment.ADD_ADDRESS}`, address, {headers: new HttpHeaders({token: localStorage.token})});
  }
  public updateAdress(address: any) {
    return this.http
    .put(`${environment.BASE_URL}/${environment.UPDATE_ADDRESS}`, address, {headers: new HttpHeaders({token: localStorage.token})});
   }
   updateuser(userId: any, user: any): Observable<any> {
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .put(`${environment.UserUrl}/${environment.editUser}/${userId}`, user, {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }    
}
