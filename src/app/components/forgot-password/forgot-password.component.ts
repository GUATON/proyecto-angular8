import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  async onReset(){
    try {
      const email = this.userEmail.value;
      await this.authService.resetPassword(email);
      Swal.fire({
        title: 'OK!',
        text: 'Email enviado, checkea tu imbox',
        icon: 'success',
        confirmButtonText: 'Entendido'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result) {
          this.router.navigate(['admin/login']);
        }
      })
      

      
    } catch (error) {
      console.log(error);
    }
    
  }

  

  get email() { return this.userEmail.get('email'); }

}
