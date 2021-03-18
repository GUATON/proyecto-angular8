import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BannerService } from '../../services/banner.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Banner } from 'src/app/models/banner';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {
public image:any;

get title() { return this.editBanner.get('title'); }
get text() { return this.editBanner.get('text'); }
get imagen() { return this.editBanner.get('image'); }
  constructor(
    private bannerFirestore: BannerService,
    private route : ActivatedRoute,
    private router : Router
  ) { }


  editBanner = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    text: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', Validators.required),
  })

  ngOnInit() {
    const idPost = this.route.snapshot.params['id'];
    this.bannerFirestore.mostrarBanner(idPost).subscribe(data =>{
      console.log(data.payload.data()['image']);
      this.image = data.payload.data()['image'];
      this.editBanner.patchValue({
        id: idPost,
        title: data.payload.data()['title'],
        text: data.payload.data()['text'],
        image: data.payload.data()['image'],
        
        
      });
    });
  }



 EditBanner(data: Banner){
  const idPost = this.route.snapshot.params['id'];
    console.log(data);
    this.bannerFirestore.preEditbanner(idPost, data, this.image);
    Swal.fire({
      title: 'Bien!',
      text: 'Banner Editado Correctamente',
      icon: 'success',
      confirmButtonText: 'Entendido'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result) {
        this.router.navigate(['admin/banner']);
      }
    })
  }




  
  handleImage(event:any): void{
    this.image = event.target.files[0];
    console.log(this.image);
  }

}
