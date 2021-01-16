import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Token } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  setHeader!: Token;

  titleChange!: string;

  setToken(token: Token){
    this.setHeader = token;
  }

  getToken(){
    return this.setHeader;
  }
}
