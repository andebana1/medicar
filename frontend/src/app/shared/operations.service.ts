import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  constructor(private http: HttpClient) { }


  getConsultas(){
    return this.http.get(environment.API + '/consultas/');
  }
}
