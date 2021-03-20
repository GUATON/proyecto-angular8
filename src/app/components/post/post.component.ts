import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Post } from '../../models/posts';
import 'datatables.net-bs4';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";




declare var $:any;
declare var jquery: any;


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  items: Post[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  editingPost : Post;
  editing : boolean = false;
  
  constructor(
    private postS: FirestoreService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
     setTimeout(() => {
      this.spinner.hide();
    }, 2000);
   }

  pageActual: number = 1;
  ngOnInit() {
    this.postS.getPosts().subscribe(posts => {
    console.log(posts)
    this.items = posts;
    });
    
  }



  deleteItem(event, post){
    Swal.fire({
      title: 'Desea eliminar estos datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.postS.deletePost(post);
        Swal.fire('Disco Eliminado!', '', 'success')
        
      } 
    })
    

  }

  abrirModal(post?:Post): void{
    
  }

  editItem(event, post: Post){
    const config = {
      data:{
        content: post
      }
    };
    console.log('objeto ------->',post);
    //this.postS.selectedPost = Object.assign({}, post);
    //console.log('DATOS ---->', post);
  }


}
