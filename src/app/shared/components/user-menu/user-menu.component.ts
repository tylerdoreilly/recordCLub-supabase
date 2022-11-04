import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from "../../services/auth.service";
import { SupabaseService } from '../../services/supabase.service'


@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public displayName

  public user;
  public session: any;

  constructor(
    public authService: AuthService,
    private readonly _supabaseService: SupabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const session = this._supabaseService.getSession();

    if (session && session.user && session.user.email) {
      this.getProfile(session.user.id);
    }
  }

  public getProfile(userId){
    this._supabaseService.getProfile(userId)
    .then((success: any) => {
      if (success && success.data) {
        this.displayName = success.data.username
      }
    });
  }

  public logout(): void {
    this._supabaseService.signOut()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }

  // public logout(){
  //   this.authService.SignOut() 
  //   .then((res) => {
  //     if(this.authService.isEmailVerified) {
  //       this.router.navigate(['dashboard']);          
  //     } else {
  //       window.alert('Email is not verified')
  //       return false;
  //     }
  //   }).catch((error) => {
  //     window.alert(error.message)
  //   })
  // }
}
