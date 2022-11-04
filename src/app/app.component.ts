import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './shared/services/supabase.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'record-club';

  public session: any;

  constructor(
    private router: Router,
    private readonly _supabaseService: SupabaseService
  ) {
    this.session = this._supabaseService.getSession(); 
  }

  public ngOnInit(): void {
    this._supabaseService.authChanges((_, session) => this.session = session);  

  }

  public isAuthenticated(): boolean {
    if (this.session) {
      return true;
    }
    return false;
  }

  public signOut(): void {
    this._supabaseService.signOut()
    .then(() => {
      this.router.navigate(['/signIn']);
    });
  }

}
