import { Injectable } from '@angular/core';
import { User, Roles } from "../models/user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;

  public user$: Observable<User | null | undefined>;
  public roles:any;

  constructor(
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
  ) { 

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user:any) =>{
        if (user){
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else{
          return of(null)
        }
      })
    )

    this.user$.subscribe(user =>{
      if(user){
        this.roles = user.roles;
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });

  }

   // Login in with email/password
   SignIn(email:any, password:any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    // .then((credential) => {
    //   this.updateUserData(credential.user)
    // })
  }

  // Sign-out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  // Register user with email/password
  RegisterUser(email:any, password:any) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user) => {
      return user?.sendEmailVerification();
    }).then(() => {
      this.router.navigate(['verify-email']);
    })
  }   

  // Recover password
  PasswordRecover(passwordResetEmail:any) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user.emailVerified !== false) ? true : false;
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles:any[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role as keyof Roles] ) {
        return true
      }
    }
    return false
  }
}
