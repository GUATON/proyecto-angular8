import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public user : any;
  constructor(
    public authS : AuthService,
    private router : Router
  ) { }

  async ngOnInit() {
    this.user = await this.authS.currentUser();
  }

  onLogout(): void{
    this.authS.logout();
    this.router.navigate(['/login']);

  }

}
