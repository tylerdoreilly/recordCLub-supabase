import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component'
import { RegistrationComponent } from './pages/auth/registration/registration.component'
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { 
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(x => x.DashboardModule)
   },
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
