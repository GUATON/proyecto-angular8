import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';
import { Banner } from '../models/banner';
import { Post } from '../models/posts';
import { Image } from '../models/image';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FrontService {
  banner: Observable<Banner[]>;
  posts: Observable<Post[]>;
  postsvotes: Observable<Post[]>;
  nextpost:Observable<Post[]>;
  private bannerCollection: AngularFirestoreCollection<Banner>;
  private postCollection: AngularFirestoreCollection<Post>;

  constructor(
    private angularFirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}



   getFrontBanners(){
    this.bannerCollection = this.angularFirestore.collection('banner');
    this.banner = this.bannerCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Banner;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    return this.banner;
  }


  getFrontPost(){
    this.postCollection = this.angularFirestore.collection('posts', ref => ref.where('estado','==', 'true'));
    console.log(this.postCollection);
    this.postsvotes = this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    return this.postsvotes;

  }

  getNextPost(){
    this.postCollection = this.angularFirestore.collection('posts', ref => ref.where('estado','==', 'false').limit(3));
    console.log(this.postCollection);
    this.nextpost = this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    return this.nextpost;
  }

  getPostDetails(id:string){
    return this.angularFirestore.collection('posts').doc(id).snapshotChanges();
  }

  getVotes(){
    return this.angularFirestore.collection('posts', ref => ref.where('votes','>', 0)).valueChanges();
  }

  VotarPorDisco(id : string , data: Post){
    const postVotesObj = {
      votes : data.votes + 1,
      band : data.band,
      image: data.image,
      name: data.name,
      year: data.year,
      estado: data.estado
    };
    //console.log(postVotesObj);
    //return this.angularFirestore.doc(id).update(post);
    this.angularFirestore.collection('posts').doc(id).set(postVotesObj);
  }
}


