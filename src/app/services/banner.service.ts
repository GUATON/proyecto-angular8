import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';
import { Banner } from '../models/banner';
import { Image } from '../models/image';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  banner: Observable<Banner[]>;
  private bannerCollection: AngularFirestoreCollection<Banner>;
  private filePath: any;
  private image:any;
  private downloadURL: Observable<string>;
  itemDoc: AngularFirestoreDocument<Banner>;
  constructor(
    private angularFirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { 
    this.bannerCollection = this.angularFirestore.collection('banner');
    this.banner = this.bannerCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Banner;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }


  getBanners(){
    return this.banner;
  }

  preAddBanner(banner: Banner, image: Image): void{
    this.uploadImage(banner, image);

  }

  

  private saveBanner(banner: Banner){
    const postObj = {
      title: banner.title,
      text : banner.text,
      image: this.downloadURL,
      fileRef: this.filePath
    };
  this.angularFirestore.collection('banner').add(postObj);
  }

  uploadImage(banner: Banner, image: Image){
    this.filePath = `images/banner/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage =>{
          this.downloadURL = urlImage;
          this.saveBanner(banner);
          console.log('URL_IMAGE', urlImage);
          console.log('POST', banner);
        })
      })
    ).subscribe();
    }

    
    preEditbanner(id : string, banner: Banner, image: Image, state: string): void{
      if(state == '0'){
        this.NotuploadImage(id,banner);
        }else{
      this.edituploadImage(id, banner, image);
        }

  
    }

    private updateBanner(id : string , data: Banner){

      const bannerEditObj = {
        title : data.title,
        text: data.text,
        image: this.downloadURL,
        fileRef: this.filePath
        
      };
      //console.log(bannerEditObj);
      //return this.angularFirestore.doc(id).update(post);
      this.angularFirestore.collection('banner').doc(id).set(bannerEditObj);
    }



    edituploadImage(id : string, banner: Banner, image: Image){
      this.filePath = `images/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( urlImage =>{
            this.downloadURL = urlImage;
            this.updateBanner(id,banner);
            console.log('URL_IMAGE', urlImage);
            console.log('ID', id);
            console.log('POST', banner);
          })
        })
      ).subscribe();
      }
    

      NotuploadImage(id : string , data: Banner){
        const postVotesObj = {
          title : data.title,
          text: data.text,
          image: data.image
        };
        //console.log(postVotesObj);
        //return this.angularFirestore.doc(id).update(post);
        this.angularFirestore.collection('banner').doc(id).set(postVotesObj);
      }


    deletebanner(banner: Banner){
      this.itemDoc = this.angularFirestore.doc(`banner/${banner.id}`);
      this.itemDoc.delete();
      }


    mostrarBanner(id: string){
        return this.angularFirestore.collection('banner').doc(id).snapshotChanges();
    
    
      }
    
}
