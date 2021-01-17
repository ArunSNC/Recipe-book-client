import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Token } from "./login/login.component";

interface registerResponseData{
    message: string;
    success: boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService{

    user = new BehaviorSubject<any>(null);

    expirationTimer: any;

    constructor(private http:HttpClient, private router: Router){}

    registerUser(registerData: any){
        return this.http.post<registerResponseData>('http://localhost:1337/api/user/register', registerData)
        .pipe(catchError(this.handleError));
    }

    loginUser(loginData: any){
        return this.http.post<Token>('http://localhost:1337/api/user/login', loginData)
        .pipe(catchError(this.handleError), tap(resData => this.handleAuth(resData.id, resData.token, resData.iat, resData.exp, resData.success)));;
    }

    logoutUser(){
        this.user.next(null);
        this.router.navigate(['auth','login']);
        localStorage.removeItem('userData');
    }

    autoLogin(){
        const user = JSON.parse(localStorage.getItem('userData') as string);
        if(!user){
            return;
        }
        const loadedUser = new User(user.id, user.token, user.iat, user.exp,user.success);

        if(loadedUser._token){
            this.user.next(loadedUser);
            const expirationDuration: any = new Date(user.exp * 1000).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        } else{
            this.logoutUser();
        }
    }

    autoLogout(expirationDuration: number){
        console.log(expirationDuration)
        this.expirationTimer = setTimeout(() => {
            this.logoutUser();
        }, expirationDuration)
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage =  "An unknown error occured";
        if(!errorRes.error || !errorRes.error.message ){
            return throwError(errorMessage);
        }else{
            errorMessage = errorRes.error.message;
            return throwError(errorMessage);
        }
    }

    private handleAuth(id: string, token: string, iat: string, exp: string, success: boolean){
        const user = new User(
            id, token, iat, exp, success
        )
        this.user.next(user);
        this.autoLogout(+(user.exp)* 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}