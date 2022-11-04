import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { LandingComponent } from './sections/landing/landing.component';
import { ProfileComponent } from './sections/profile/profile.component';
import { AuthguardService } from "../../shared/services/authguard.service";

 export const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

 ]
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
