import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { SupabaseService } from '../../../../shared/services/supabase.service'
import { Profile } from '../../../../shared/models/profile'
import { Observable, of,from, } from 'rxjs';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading = false
  profile!: Profile
  public updateProfileForm: FormGroup;
  public session
  public user

  constructor(
    private readonly _supabaseService: SupabaseService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createProfileForm();
    this.onValueChanges();

    const session = this._supabaseService.getSession();

    if (session && session.user && session.user.email) {
      this.updateProfileForm.get('email').patchValue(session.user.email)
      this.getProfile(session.user.id);
    }

  }

  createProfileForm(){
    this.updateProfileForm = this. _fb.group({
      email: '',
      username: '',
      avatar_url: '',
    })
   
  }

  getProfile(userId){
    this._supabaseService.getProfile(userId)
    .then((success: any) => {
      if (success && success.data) {
        this.updateProfileForm.get('username').patchValue(success.data.username)
        this.updateProfileForm.get('avatar_url').patchValue(success.data.avatar_url)
      }
    });

  }

  onValueChanges(){
    this.updateProfileForm.valueChanges.subscribe(x =>{
       console.log('form',x)
    })
  }

  public update(): void {
    this.loading = true;
    const value = this.updateProfileForm.value;
    this._supabaseService.updateProfile(value)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

}
