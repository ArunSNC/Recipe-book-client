import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, take } from 'rxjs/operators';
import { retry, tap } from 'rxjs/operators';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
   return this.authService.user.pipe(take(1), exhaustMap(user => {
    if(!user){
      return next.handle(req);
    }
     let tokenizedRequest = req.clone({
       setHeaders: {
         Authorization: user.token as string
       }
     })
    return next.handle(tokenizedRequest)
    .pipe(retry(2),catchError((error: HttpErrorResponse) => {
        if(error.status !== 401){
          console.log(error.message)
        }
        return throwError(error)
      }));
    }));
  }
}
