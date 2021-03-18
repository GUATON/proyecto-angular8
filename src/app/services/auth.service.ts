import { Injectable } from '@angular/core';
import { User} from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first} from 'rxjs/operators';
import { auth} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<firebase.User>;
  constructor(
    private angularFire : AngularFireAuth
  ) { 
    this.userData = angularFire.authState;
  }



  async loginGoogle(){
    try {
      return this.angularFire.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email: string):Promise<void>{
    try {
      
      return this.angularFire.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
      
    }

  }


  async login(user : User){
    const { email, password } = user;
    return this.angularFire.auth.signInWithEmailAndPassword(email, password);
  }

  async logout(){
    this.angularFire.auth.signOut();
  }

  async UserRegister(user : User){
    const { email, password } = user;
    return this.angularFire.auth.createUserWithEmailAndPassword(email, password);

  }

  currentUser(){
  return this.angularFire.authState.pipe(first()).toPromise();
  }
}
