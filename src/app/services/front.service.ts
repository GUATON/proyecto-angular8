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
    this.posts = this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    return this.posts;

  }
}


