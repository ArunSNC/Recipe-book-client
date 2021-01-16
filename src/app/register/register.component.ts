import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  isLoading: boolean = false;
  error = null;
  success = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    });
  }


  onSubmit(){
    this.isLoading = true;
    this.auth.registerUser(this.registerForm.value).subscribe(response => {
      this.isLoading = false;
      if(response.success){
        this.success = response.message;
        setTimeout(() => {
          this.success = '';
        },3000);
      }
      this.registerForm.reset();
    }, err => {
      this.isLoading = false;
      this.error = err;
      setTimeout(() => {
        this.error = null;
      },3000);
      this.registerForm.reset();
    });
  }


}
