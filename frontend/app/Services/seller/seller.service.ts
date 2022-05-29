import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { environment } from '../../../../src/environments/environment';
import { HttpserviceService } from '../httpservice/httpservice.service';


@Injectable({
  providedIn: 'root'
})


export class SellerService {

  constructor(private http: HttpClient, private httpService: HttpserviceService) { }


  private _autoRefresh$ = new Subject();
  get autoRefresh$() {
    return this._autoRefresh$;
  }

  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }
  private token = localStorage.getItem('token');
  private httpOptions = {headers: new HttpHeaders ({'content-type': 'application/json' , token: this.token})};

    




  private sellerUrl = environment.sellerUrl;


 

  private approvedPlats = environment.approvedPlats;
  private approvedChefs= environment.approvedChefs;

  private getallOrderedPlats = environment.getallOrderedPlats;
  private changeOrderstatus = environment.changeOrderstatus;



  getApprovedPlats(status: string) {

      return this.httpService.get(this.sellerUrl + this.approvedPlats + '?status=' + status, this.httpOptions);
    }


    ///////hasnae
    getApprovedChefs(status: string) {

      return this.httpService.get(this.sellerUrl + this.approvedChefs + '?status=' + status, this.httpOptions);
    }

    //Retourner toutes les commandes?
    getAllOrderedPlats(): Observable<any> {
       return this.httpService.get(this.sellerUrl + this.getallOrderedPlats, {});
     }


    //modifier l'etat de la commande
     updateOrderStatus(orderId: any, status: any): Observable<any> {
       return this.httpService.put(this.sellerUrl + this.changeOrderstatus + '?orderId=' + orderId + '&status=' + status, '', this.httpOptions);
    }
 

  }
