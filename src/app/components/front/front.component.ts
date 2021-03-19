import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FrontService } from '../../services/front.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Post } from '../../models/posts';
import { Banner } from '../../models/banner';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
  items: Post[];
  banners:Banner[];
  posts: Observable<Post[]>;
  private postCollection: AngularFirestoreCollection<Post>;
  constructor(
    private postS: FirestoreService,
    private bannerS: BannerService,
    private frontS: FrontService,
    private angularFirestore: AngularFirestore
  ) { 
    
  }

  ngOnInit() {
    this.frontS.getFrontPost().subscribe(posts => {
      //console.log(posts)
      this.items = posts;
      });

    this.getBanner();

  }

  getBanner(){
    this.frontS.getFrontBanners().subscribe(banner =>{
      this.banners = banner;
    });
  }

}
