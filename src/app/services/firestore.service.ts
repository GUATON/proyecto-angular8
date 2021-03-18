import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';
import { Post } from '../models/posts';
import { Image } from '../models/image';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  posts: Observable<Post[]>;
  private postCollection: AngularFirestoreCollection<Post>;
  private filePath: any;
  private image:any;
  private downloadURL: Observable<string>;
   itemDoc: AngularFirestoreDocument<Post>;
  public selectedPost : Post ={};
  constructor(
    private angularFirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { 
    this.postCollection = this.angularFirestore.collection('posts');
    this.posts = this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }


  getPosts(){
    
    return this.posts;
  }

  preAddPost(post: Post, image: Image): void{
    this.uploadImage(post, image);

  }

  preEditPost(id : string, post: Post, image: Image): void{
    this.edituploadImage(id, post, image);

  }

  private savePost(post: Post){
    const postObj = {
      band : post.band,
      image: this.downloadURL,
      fileRef: this.filePath,
      name: post.name,
      year: post.year,
      vote: post.votes
    };
  this.angularFirestore.collection('posts').add(postObj);
  }

  uploadImage(post: Post, image: Image){
  this.filePath = `images/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, image);
  task.snapshotChanges()
  .pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe( urlImage =>{
        this.downloadURL = urlImage;
        this.savePost(post);
        console.log('URL_IMAGE', urlImage);
        console.log('POST', post);
      })
    })
  ).subscribe();
  }
  
  private updatePost(id : string , data: Post){
    const postEditObj = {
      band : data.band,
      image: this.downloadURL,
      fileRef: this.filePath,
      name: data.name,
      year: data.year
    };
    //return this.angularFirestore.doc(id).update(post);
    this.angularFirestore.collection('posts').doc(id).set(postEditObj);
  }

  edituploadImage(id : string,post: Post, image: Image){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage =>{
          this.downloadURL = urlImage;
          this.updatePost(id,post);
          console.log('URL_IMAGE', urlImage);
          console.log('ID', id);
          console.log('POST', post);
        })
      })
    ).subscribe();
    }

  deletePost(post: Post){
  this.itemDoc = this.angularFirestore.doc(`posts/${post.id}`);
  this.itemDoc.delete();
  }

  preUpdate(){
    this.angularFirestore
  }


  mostrarPost(id: string){
    return this.angularFirestore.collection('posts').doc(id).snapshotChanges();


  }

  
}
