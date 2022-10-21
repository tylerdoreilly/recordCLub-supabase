import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ClubRoutingModule } from './club-routing.routes';
import { environment } from '../../../environments/environment';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Components
import { AlbumsComponent } from './sections/albums/albums.component';
import { OverviewComponent } from './sections/overview/overview.component';
import { SessionsComponent } from './sections/sessions/sessions.component';
import { AutoCompleteComponent } from '../../shared/components/filters/auto-complete/auto-complete.component';
import { FilterGroupComponent } from '../../shared/components/filters/filter-group/filter-group.component';
import { SidebarLayoutComponent } from '../../shared/layouts/sidebar-layout/sidebar-layout.component';
import { AlbumDetailsModalComponent } from './sections/albums/components/album-details-modal/album-details-modal.component';
import { SessionComponent } from './sections/session/session.component';
import { SessionDetailsComponent } from './sections/session/components/session-details/session-details.component';
import { SessionAlbumsComponent } from './sections/session/components/session-albums/session-albums.component';
import { SessionSongsComponent } from './sections/session/components/session-songs/session-songs.component';
import { SessionGroupComponent } from './sections/session/components/session-group/session-group.component';
import { SessionBracketeerComponent } from './sections/session/components/session-bracketeer/session-bracketeer.component';
import { SessionMeetupComponent } from './sections/session/components/session-meetup/session-meetup.component';


@NgModule({
  declarations: [
    OverviewComponent,
    SidebarLayoutComponent,
    SessionsComponent,
    AlbumsComponent,
    // AutoCompleteComponent,
    FilterGroupComponent,
    AlbumDetailsModalComponent,
    SessionComponent,
    SessionDetailsComponent,
    SessionAlbumsComponent,
    SessionSongsComponent,
    SessionGroupComponent,
    SessionBracketeerComponent,
    SessionMeetupComponent,

  ],
  exports:[
    CommonModule
  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    ClubRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ]
})
export class ClubModule {}

