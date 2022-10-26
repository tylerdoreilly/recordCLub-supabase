import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClubComponent } from './club.component';
import { OverviewComponent } from '../../pages/club/sections/overview/overview.component';
import { SessionsComponent } from '../../pages/club/sections/sessions/sessions.component';
import { SessionComponent } from '../../pages/club/sections/session/session.component';
import { AlbumsComponent } from '../../pages/club/sections/albums/albums.component';
import { AlbumComponent } from '../../pages/club/sections/album/album.component';

 export const routes: Routes = [
  {
    path: '',
    component: ClubComponent,
    children: [
      { path: '', component:  OverviewComponent },
      { path: 'sessions', component: SessionsComponent },
      { path: 'session/:sessionid', component: SessionComponent },
      { path: 'albums', component: AlbumsComponent },
      { path: 'session/:sessionid/album/:albumId', component: AlbumComponent },
      { path: 'songs', component:  SessionsComponent },
    ],
  },

 ]
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
