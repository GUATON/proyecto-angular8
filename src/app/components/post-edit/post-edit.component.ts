import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  private image:any;
  private imageOriginal:any;
  public posts: Observable<Post[]>;
  public postCollection : AngularFirestoreCollection<Post>;
  constructor(
    private angularFirestore: FirestoreService,
    private route : ActivatedRoute,
    private router : Router
  ) {}


  get id() { return this.editPost.get('id'); }
  get band() { return this.editPost.get('band'); }
  get name() { return this.editPost.get('name'); }
  get year() { return this.editPost.get('year'); }
  get imagen() { return this.editPost.get('image'); }
  get estado() { return this.editPost.get('estado'); }

   public editPost = new FormGroup({
    id: new FormControl(''),
    band: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(4)]),
    estado: new FormControl('false')
  })

  ngOnInit() {
    const idPost = this.route.snapshot.params['id'];
   this.angularFirestore.mostrarPost(idPost).subscribe(data =>{
     console.log(data.payload.data()['estado']);
    this.image = data.payload.data()['image'];
    this.editPost.patchValue({
      id: idPost,
      band: data.payload.data()['band'],
      name: data.payload.data()['name'],
      year: data.payload.data()["year"],
      image: data.payload.data()['image'],
      estado: data.payload.data()['estado'],
      
      
    });
   });
    
    
    
  }

  saveEdit(data: Post){
    const idPost = this.route.snapshot.params['id'];
    this.angularFirestore.preEditPost(idPost ,data, this.image);
    Swal.fire({
      title: 'Bien!',
      text: 'Datos Editados Correctamente',
      icon: 'success',
      confirmButtonText: 'Entendido'
    }).then((result) => {
      if (result) {
        this.router.navigate(['/admin/post']);
      }
    })
    console.log(data);
  }


  handleImage(event:any): void{
    this.image = event.target.files[0];
    console.log(this.image);
  }




  



}
