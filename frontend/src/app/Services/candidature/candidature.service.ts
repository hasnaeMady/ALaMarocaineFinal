import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:8020';

  public registerCondidature(condidatureData: any) {
    return this.http.post(this.API + '/registerCondidature', condidatureData);
  }

  public getCondidatures() {
    return this.http.get(this.API + '/getCondidatures');
  }

  public deleteCondidature(id: any) {
    return this.http.delete(this.API + '/deleteCondidature?id=' + id);
  }

  public updateCondidatures(condidature: any) {
    return this.http.put(this.API + '/updateCondidatures', condidature);
  }
}
