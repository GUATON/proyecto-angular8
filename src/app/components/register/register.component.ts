import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private isEmail : any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private authS : AuthService,
    private router : Router
  ) { }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.isEmail)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit() {
  }

  onRegister(form: User){
    console.log('Form', form);
    this.authS.UserRegister(form)
    .then(resp => {
      console.log('Registro correcto --->', resp);
      Swal.fire({
        title: 'Bien!',
        text: 'Usuario Registrado Correctamente',
        icon: 'success',
        confirmButtonText: 'Entendido'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result) {
          this.router.navigate(['login']);
        }
      })
      
    }).catch(err => {
      console.log('error --->', err);
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo registrar el usuario',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    });

  }


  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get message() { return this.registerForm.get('message'); }

}
