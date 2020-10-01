import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {}

  // tryRefreshToken(){
  //   let result: boolean;
  //   this.userService.refreshUser().subscribe(
  //     response=>{
  //       this.userService.setToken(response);
  //       result = true;
  //     }, erro=>{
  //       result = false;
  //     }
  //   );

  //   return result
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.headers.get('no-auth-required')){
      request.headers.delete('no-auth-required');
      const newReq = request.clone({
        headers: request.headers.delete('no-auth-required')
      });
      newReq.headers.set('Accept', 'application/json');
      return next.handle(newReq);
    }else{
      const clonedHeaders = request.clone({
        headers: request.headers.set('Authorization', this.userService.getTokenType() + ' ' + this.userService.getToken()),
      });
      return next.handle(clonedHeaders)
        .pipe(
          tap(
            ev => {
              return ev;
            },
            async err=>{
              if(err.status === 401 && this.userService.isLoggedIn()){
                const result = await this.userService.refreshUser();
                if(result){
                  this.router.navigateByUrl('/home');
                }else{
                  this.userService.deleteToken();
                  this.userService.deleteUserData();
                  this.router.navigateByUrl('/login');
                }
              }
            }
          )
        );
    }
    // return next.handle(request);
  }
}
