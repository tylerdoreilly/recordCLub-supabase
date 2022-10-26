import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { SupabaseService } from '../../../shared/services/supabase.service'
import { Profile } from '../../../shared/models/profile'
import { Observable, of,from, } from 'rxjs';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  loading = false
  profile!: Profile
  public updateProfileForm

  // @Input()
  // session!: AuthSession
  public session

  constructor(
    private readonly supabaseService: SupabaseService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.supabaseService.authChanges((_, session) => (this.session = session))
    this.getProfile();
  }

  createProfileForm(){
    this.updateProfileForm = this. _fb.group({
      username: '',
      website: '',
      avatar_url: '',
    })
  }

  getProfile(){
    const {user} = this.session;
    const userProfile$ = from(this.supabaseService.profile(user));
    userProfile$.subscribe(x=>{console.log('profile', x)})
  }

  updateProfile(){}

  async signOut(){
   await this.supabaseService.signOut()
  }
}
