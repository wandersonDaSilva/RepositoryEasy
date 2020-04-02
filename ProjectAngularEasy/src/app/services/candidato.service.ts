import { Candidato } from './../model/candidato';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  candidato: any;

  private urlApi = 'https://localhost:44369/api/candidato';

  constructor(private http: HttpClient) { }

listCandidato(): Observable<any> {
  debugger;
  return this.http.get(`${ this.urlApi }`);
}

loadById(id) {
  return this.http.get(`${ this.urlApi }/${id}`);
}

createCandidato(cand: Candidato): Observable<any> {
  debugger;
  const header = new HttpHeaders().set('Content-type', 'application/json');
  const candidato = JSON.stringify(cand);
  return this.http.post(`${ this.urlApi }`, candidato, { headers: header});
}

update(id, cand): Observable<any> {
  debugger;
  const header = new HttpHeaders().set('Content-type', 'application/json');
  const candidato = JSON.stringify(cand);
  return this.http.put(`${ this.urlApi }/${id}`, candidato, { headers: header});
}

delete(id) {
  return this.http.delete(`${ this.urlApi }/${id}`);
}

}

