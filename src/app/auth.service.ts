import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface registerResponseData{
    message: string;
    success: boolean;
}

interface loginResponseData{
    message: string;
    token:   string;
    success: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http:HttpClient){}

    registerUser(registerData: any){
        return this.http.post<registerResponseData>('http://localhost:1337/api/user/register', registerData)
        .pipe(catchError(this.handleError));
    }

    loginUser(loginData: any){
        return this.http.post<loginResponseData>('http://localhost:1337/api/user/login', loginData)
        .pipe(catchError(this.handleError));;
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
}