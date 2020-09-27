import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    id: undefined,
    username: '',
    email: '',
    password: ''
  }

  noAuthHeader = { headers: new HttpHeaders({ 'no-auth-required': 'True' }) };

  constructor(private http: HttpClient) { }

  login(credentials){
    // console.log('cred: ', credentials);
    credentials['client_id'] = environment.client_id;
    credentials['client_secret'] = environment.client_secret;
    credentials['grant_type'] = environment.grant_type;
    credentials['scope'] = environment.scope;
    
    return this.http.post(environment.API + '/o/token/', credentials, this.noAuthHeader);
  }

  setToken(token_payload: any){
    console.log('token pay: ', token_payload);
    return localStorage.setItem('token', JSON.stringify(token_payload));
  }

  getToken(){
    return JSON.parse(localStorage.getItem('token')).access_token;
  }

  getTokenType(){
    return JSON.parse(localStorage.getItem('token')).token_type;
  }

  getTokenPayload(){
    return JSON.parse(localStorage.getItem('token'));
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    let tokenPayload = this.getTokenPayload();
    if(tokenPayload){
      return true;
    }else{
      return false;
    }
  }
}
