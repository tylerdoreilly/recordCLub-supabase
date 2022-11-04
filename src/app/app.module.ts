import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AuthguardService } from "./shared/services/authguard.service";


import { DashboardMenuComponent } from './pages/dashboard/components/dashboard-menu/dashboard-menu.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';

import { ClubComponent } from './pages/club/club.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClubsListComponent } from './shared/components/clubs-list/clubs-list.component';

import { SessionComponent } from './pages/session/session.component';
import { ClubsNavComponent } from './shared/components/clubs-nav/clubs-nav.component';
import { AccountComponent } from './pages/auth/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    VerifyEmailComponent,
    ClubComponent,
    DashboardComponent,
    SessionComponent,
    // ClubsListComponent,
   ClubsNavComponent,
   AccountComponent,
   DashboardMenuComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    AppRoutingModule,  
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
