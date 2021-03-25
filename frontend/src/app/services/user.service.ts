import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur} from '../models/utilisateur.model';
import {Observable} from 'rxjs';

// const AUTH_API = 'http://localhost:5000/api/v1/user/auth/';
// const baseUrl = 'http://localhost:5000/api/v1/user';
const AUTH_API = 'http://report.rgrgroup.net/api/v1/user/auth/';
const baseUrl = 'http://report.rgrgroup.net/api/v1/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  login(pseudo: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      pseudo,
      password
    }, httpOptions);
  }

  register(pseudo: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      pseudo,
      email,
      password
    }, httpOptions);
  }
  getFull(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${baseUrl}/device/all`);
  }
  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(baseUrl);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  get(id: any): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
