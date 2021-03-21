import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FrontService } from '../../services/front.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Post } from '../../models/posts';
import { finalize, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-front-detail',
  templateUrl: './front-detail.component.html',
  styleUrls: ['./front-detail.component.css']
})
export class FrontDetailComponent implements OnInit {
  id:any;
  uid;
  bandname;
  namedisc;
  imagedisc;
  yeardisc;
  votesdisc;
  items: Post[] = [];

  constructor(
    private angularFirestore: FirestoreService,
    private frontFirestore: FrontService,
    private route : ActivatedRoute,
    private router : Router
  ) { 
  }

  public editVote = new FormGroup({
    id: new FormControl(''),
    votes: new FormControl(''),
    band: new FormControl(''),
    image: new FormControl(''),
    name: new FormControl(''),
    year: new FormControl(''),
    estado: new FormControl('')
  })

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.frontFirestore.getPostDetails(this.id).subscribe(detail => {
      this.bandname = detail.payload.data()['band'];
      this.namedisc = detail.payload.data()['name'];
      this.imagedisc = detail.payload.data()['image'];
      this.yeardisc = detail.payload.data()['year'];
      this.votesdisc = detail.payload.data()['votes'];
      this.editVote.patchValue({
        id: this.id,
        votes: detail.payload.data()['votes'],
        band:  detail.payload.data()['band'],
        name:  detail.payload.data()['name'],
        image:  detail.payload.data()['image'],
        year:  detail.payload.data()['year'],
        estado:  detail.payload.data()['estado'],
      });
    });
  }

  saveVotesEdit(data: Post){
    console.log(data);
    const idPost = this.route.snapshot.params['id'];
    this.frontFirestore.VotarPorDisco(idPost ,data);
    Swal.fire({
      title: 'Bien!',
      text: 'Gracias por tu voto para : ' +data.band,
      icon: 'success',
      confirmButtonText: 'Entendido'
    }).then((result) => {
      if (result) {
        this.router.navigate(['/details/'+idPost]);
      }
    })
    console.log(data);
  }

}
