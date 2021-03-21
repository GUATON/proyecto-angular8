import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/banner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-banner',
  templateUrl: './new-banner.component.html',
  styleUrls: ['./new-banner.component.css']
})
export class NewBannerComponent implements OnInit {
  private image:any;

  constructor(
    private bannerFirestore: BannerService,
    private router : Router
  ) { }


  registerBanner = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    text: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', Validators.required),
  })

  ngOnInit() {
  }

  newBanner(data: Banner){
    console.log(data);
    this.bannerFirestore.preAddBanner(data, this.image);
    Swal.fire({
      title: 'Bien!',
      text: 'Banner Registrado Correctamente',
      icon: 'success',
      confirmButtonText: 'Entendido'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result) {
        this.router.navigate(['/banner']);
      }
    })
  }


  handleImage(event:any): void{
    this.image = event.target.files[0];
    console.log(this.image);
  }
  
  get title() { return this.registerBanner.get('title'); }
  get text() { return this.registerBanner.get('text'); }
  get imagen() { return this.registerBanner.get('image'); }

}
