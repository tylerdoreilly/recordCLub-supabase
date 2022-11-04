import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { SupabaseService } from './supabase.service'

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth, 
    private readonly _supabaseService: SupabaseService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.afAuth.authState
      .pipe(
        take(1),
        map(user => {
          return !!user
        }),
        tap(loggedIn => {
          if (!loggedIn) {
            console.log("access denied")
            this.router.navigate(['/login']);
          }
        })
      )
  }
}