import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule ,ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Observable, of, from } from 'rxjs';

// Services
import { AuthService } from "../../../shared/services/auth.service";
import { SupabaseService } from "../../../shared/services/supabase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  public test: Observable<any>

  constructor(
    public authService: AuthService,
    public supabaseService: SupabaseService,
    public router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this._fb.group({
      email: [''],
      password:[''],
    });
  }

  logIn() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const testObservable$ = from(this.supabaseService.signInWithEmail(email, password))
    .subscribe(
      result => {
        this.router.navigate(['dashboard']);  
        // Handle result
        console.log(result)
      },   
    )
   
  }

  // Temp sign up to create accounts for the group - locked group no signup needed
  // will build out proper sign up later
  signUp() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const testObservable$ = from(this.supabaseService.signUp(email, password))
    .subscribe(
      result => {
        this.router.navigate(['dashboard']);  
        // Handle result
        console.log(result)
      },   
    )
   
  }
}
