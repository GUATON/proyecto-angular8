import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isEmail : any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private authS : AuthService,
    private router : Router
    
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.isEmail)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit() {
    
  }

onGoogleLogin(){
  try {
    this.authS.loginGoogle();
  } catch (error) {
    console.log(error);
  }
  
}
  

  onLogin(form: User){
    console.log('Form', form);
    this.authS.login(form)
    .then(resp => {
      console.log('Login correcto --->', resp);
      this.router.navigate(['admin/home']);
    }).catch(err => {
      console.log('error --->', err);
      Swal.fire({
        title: 'Error!',
        text: 'Email o password incorrectos',
        icon: 'error',
        confirmButtonText: 'Entendido'
      })
    })

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get message() { return this.loginForm.get('message'); }

}
