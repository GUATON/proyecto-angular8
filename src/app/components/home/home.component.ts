import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user : any;

  constructor(public authS : AuthService) { }

  async ngOnInit() {
    this.user = await this.authS.currentUser();
  }

}
