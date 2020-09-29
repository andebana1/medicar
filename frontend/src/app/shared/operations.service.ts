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

  getEspecialidades(){
    return this.http.get(environment.API + '/especialidades/');
  }

  getMedicos(params?){
    let url = '/medicos/';
    url += params ? '?' + params : '';
    return this.http.get(environment.API + url); 
  }

  getAgendas(params?){
    let url = '/agendas/';
    url += params ? '?' + params : '';
    return this.http.get(environment.API + url); 
  }

  createConsulta(agenda_id: number, horario: string){
    const body = {
      agenda_id: agenda_id.toString(),
      horario: horario
    }

    return this.http.post(environment.API + '/consultas/', body);
  }

  uncheckConsulta(id: number){
    return this.http.delete(environment.API + `/consultas/${id}`);
  }
}
