import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

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
            ev => {},
            err=>{
              console.log(err);
            }
          )
        );
    }
    // return next.handle(request);
  }
}
