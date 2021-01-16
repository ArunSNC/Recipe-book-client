import { Router } from '@angular/router';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


export interface Token {
  token: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  isLoading: boolean = false;
  error = null;
  success = '';

  constructor(private auth:AuthService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void{
    this.isLoading = true;
    this.auth.loginUser(this.loginForm.value).subscribe(response => {
      this.isLoading = false;
      if(response.success){
        this.success = response.message;
        this.appService.setToken(response.token as unknown as Token);
        setTimeout(() => {

        this.loginForm.reset();
        this.success = '';
        this.router.navigateByUrl('/recipes');
        },3000);
      }
    }, err => {
      this.isLoading = false;
      this.error = err;
      setTimeout(() => {
        this.error = null;
      },3000);
      this.loginForm.reset();
    });
  }

}
