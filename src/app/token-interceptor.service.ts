import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    let token = sessionStorage.getItem('Auth_token');
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: token as string
      }
    })
    return next.handle(tokenizedRequest);
  }
}
