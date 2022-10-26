import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { SupabaseService } from "../../../shared/services/supabase.service";
import { FormsModule ,ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Observable, of,from, } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 public loginForm: any
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
    });
  }

  // logIn() {
  //   const email = this.loginForm.get('email');
  //   const password = this.loginForm.get('password');
  //   this.authService.SignIn(email.value, password.value)
  //     .then((res) => {
  //       let ty = res
  //       if(this.authService.isEmailVerified()) {
  //                
  //       } else {
  //         window.alert('Email is not verified')
  //         return false;
  //       }
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  logIn() {
    const email = this.loginForm.get('email');
    const testObservable$ = from(this.supabaseService.signIn(email.value))
    .subscribe(
      result => {
        this.router.navigate(['dashboard']);  
        // Handle result
        console.log(result)
      },   
    )
   
  }
}
