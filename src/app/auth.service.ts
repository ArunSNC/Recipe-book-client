import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Token } from "./login/login.component";

interface registerResponseData{
    message: string;
    success: boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService{

    user = new Subject<User>();

    constructor(private http:HttpClient){}

    registerUser(registerData: any){
        return this.http.post<registerResponseData>('http://localhost:1337/api/user/register', registerData)
        .pipe(catchError(this.handleError));
    }

    loginUser(loginData: any){
        return this.http.post<Token>('http://localhost:1337/api/user/login', loginData)
        .pipe(catchError(this.handleError), tap(resData => this.handleAuth(resData.id, resData.token, resData.iat, resData.exp, resData.success)));;
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
        sessionStorage.setItem('Auth_token',token);
        this.user.next(user);
    }
}