import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.User | null = null;
  isLoggedIn: boolean = false;

  constructor(protected auth: AngularFireAuth, protected router: Router, protected db: AngularFirestore) {
    this.authListener();
  }

  authListener(){
    this.auth.onAuthStateChanged((credential)=>{
      if(credential){
        this.currentUser = credential
        this.isLoggedIn = true;
      }
      else{
        this.currentUser = null
        this.isLoggedIn = false;
      }
    })
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  async logIn(email: string, password: string) {
    let error = false;
    await this.auth.signInWithEmailAndPassword(email, password).catch(() => {
      error = true;
      alert("Wrong Email or Password!");
      return;
    });
    if(!error){
      alert("Successfully logged in!");
      this.router.navigateByUrl('/main');
    }
  }

  register(email: string, password: string, username: string) {
      return this.auth.createUserWithEmailAndPassword(email, password)
  }

  async logOut(){
    await this.auth.signOut();
  }
}
