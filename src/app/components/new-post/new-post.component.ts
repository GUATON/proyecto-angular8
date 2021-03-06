import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Post } from '../../models/posts';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  get band() { return this.registerPost.get('band')};
  get name() { return this.registerPost.get('name')}; 
  get year() { return this.registerPost.get('year')}; 
  get image() { return this.registerPost.get('image')}; 
  get estado() { return this.registerPost.get('estado')};

  private imagen:any;
  valor:any;
  constructor(
    private angularFirestore: FirestoreService,
    private router : Router
  ) { }

  registerPost = new FormGroup({
    band: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    year: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(4)]),
    estado: new FormControl('')
  })

  ngOnInit() {
  }


  newPost(data: Post){
    console.log(data);
    this.angularFirestore.preAddPost(data, this.imagen);
    Swal.fire({
      title: 'Bien!',
      text: 'Datos Registrados Correctamente',
      icon: 'success',
      confirmButtonText: 'Entendido'
    }).then((result) => {
      if (result) {
        this.router.navigate(['/post']);
      }
    })
  }

  handleImage(event:any): void{
    this.imagen = event.target.files[0];
    console.log(this.imagen);
  }

 

}
