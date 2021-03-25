import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Appel} from '../models/appel.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// const baseUrl = 'http://localhost:5000/api/v1/appel';
const baseUrl = 'http://report.rgrgroup.net/api/v1/appel';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AppelService {

  constructor(private http: HttpClient) {
  }

  getAll(id: any): Observable<Appel[]> {
    return this.http.get<Appel[]>(`${baseUrl}/all/${id}`);
  }

  getAllAdmin(): Observable<Appel[]> {
    return this.http.get<Appel[]>(`${baseUrl}/all/admin`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getOne(id: any): Observable<Appel> {
    return this.http.get<Appel>(`${baseUrl}/${id}`);
  }

  create(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
