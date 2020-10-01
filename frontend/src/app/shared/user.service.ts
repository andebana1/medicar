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

  logout(){
    const body = {
      token: this.getToken(),
      client_id: environment.client_id,
      client_secret: environment.client_secret
    }

    this.deleteUserData();

    return this.http.post(environment.API + '/o/revoke_token/', body, this.noAuthHeader);
  }

  setToken(token_payload: any){
    return localStorage.setItem('token', JSON.stringify(token_payload));
  }

  getToken(){
    return JSON.parse(localStorage.getItem('token')).access_token;
  }

  getTokenType(){
    return JSON.parse(localStorage.getItem('token')).token_type;
  }

  getRefreshToken(){
    return JSON.parse(localStorage.getItem('token')).refresh_token;
  }

  getTokenPayload(){
    return JSON.parse(localStorage.getItem('token'));
  }

  deleteToken(){
    return localStorage.removeItem('token');
  }

  setUserData(data: any){
    return localStorage.setItem('user', JSON.stringify(data));
  }

  getUserName(){
    return JSON.parse(localStorage.getItem('user')).username;
  }

  deleteUserData(){
    return localStorage.removeItem('user');
  }

  isLoggedIn(){
    let tokenPayload = this.getTokenPayload();
    if(tokenPayload){
      return true;
    }else{
      return false;
    }
  }

  createUser(formdata: any){
    return this.http.post(environment.API + '/user/register/', formdata, this.noAuthHeader);
  }

  getUser(){
    return this.http.get(environment.API + '/user/');
  }

  saveCredentials(credentials: any){
    return localStorage.setItem('credentials', JSON.stringify(credentials));
  }

  getCredentials(){
    return JSON.parse(localStorage.getItem('credentials'));    
  }

  deleteCredentials(){
    return localStorage.removeItem('credentials');
  }

  async refreshUser() : Promise<boolean>{
    let result: boolean = false;
    const refreshToken = this.getRefreshToken();
    const body = {
      grant_type: "refresh_token",
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      refresh_token: refreshToken
    };

    await this.http.post(environment.API + '/o/token/', body, this.noAuthHeader)
      .toPromise()
      .then(response=>{
        this.setToken(response);
        result = true;
      }, erro=>{
        result = false;
      });

      return result;
  }
}
