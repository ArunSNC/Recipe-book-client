import { Subscription } from 'rxjs';
import { PlaceholderDirective } from './../shared/placeholder.directive';
import { Router } from '@angular/router';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertComponent } from '../shared/alert/alert.component';


export interface Token {
  message: string;
  token: string;
  id: string;
  iat: string;
  exp: string;
  success: boolean;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: any;
  isLoading: boolean = false;
  error = null;
  success = '';
  alertSub!: Subscription;
  @ViewChild(PlaceholderDirective, {static: true}) alertHost!: PlaceholderDirective;

  constructor(private auth:AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
        this.loginForm.reset();
        this.success = '';
        this.router.navigateByUrl('/recipes');
      }
    }, err => {
      this.isLoading = false;
      this.error = err;
      this.showError(err);
      // setTimeout(() => {
      //   this.error = null;
      // },3000);
      this.loginForm.reset();
    });
  }
  
  errorHandler(){
    this.error = null;
  }

  showError(message: string){

    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const containerRef = hostViewContainerRef.createComponent(alertCmpFactory);

    containerRef.instance.message = message;
    this.alertSub = containerRef.instance.close.subscribe(() => {
      this.alertSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(){
    if(this.alertSub){
      this.alertSub.unsubscribe();
    }
  }
}
