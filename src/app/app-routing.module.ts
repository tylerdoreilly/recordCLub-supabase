import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component'
import { RegistrationComponent } from './pages/auth/registration/registration.component'
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component'
import { ClubComponent } from './pages/club/club.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SessionComponent } from './pages/session/session.component';
import { SidebarLayoutComponent } from './shared/layouts/sidebar-layout/sidebar-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'dashboard', component:  DashboardComponent },
  { 
    path: 'club/:id', 
    loadChildren: () => import('./pages/club/club.module').then(x => x.ClubModule)
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
