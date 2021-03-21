import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirestoreService } from '../../services/firestore.service';
import { FrontService } from '../../services/front.service';
import { Post } from '../../models/posts';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  
  //@Input() results: any[] = [];
  results: any[] = [];

  view: any[] = [1100, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Discos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  discos: any [] = [];

  constructor(
    private frontS: FrontService,
  ) {
    
  }

  ngOnInit() {
    this.getVotesPost();
  }
  onSelect(event) {
    console.log(event);
  }

  getVotesPost(){
    this.frontS.getVotes().pipe(
      map( (resp: Post[]) => resp.map( ({band, votes}) => ({name: band, value: votes}) ))
      ).subscribe(discs => {
        console.log(JSON.stringify(discs));
        this.results = discs;
      });

      
  }

}
