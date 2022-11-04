import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.routes';
import { environment } from '../../../environments/environment';


// Components
import { LandingComponent } from './sections/landing/landing.component';
import { ProfileComponent } from './sections/profile/profile.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';

@NgModule({
  declarations: [
    LandingComponent,
    ProfileComponent,
   

  ],
  exports:[
    CommonModule,

  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
  ],
  // providers:[AuthguardService]
})
export class DashboardModule {}

