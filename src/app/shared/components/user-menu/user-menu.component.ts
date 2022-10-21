import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router'

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public user;
  public displayName

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public logout(){
    this.authService.SignOut() 
    .then((res) => {
      if(this.authService.isEmailVerified) {
        this.router.navigate(['dashboard']);          
      } else {
        window.alert('Email is not verified')
        return false;
      }
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
