import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ClubRoutingModule } from '../pages/club/club-routing.routes';
import { DashboardRoutingModule } from '../pages/dashboard/dashboard-routing.routes';

// HTTP
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { AuthguardService } from "./services/authguard.service";

// Angular Firestore
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteComponent } from './components/filters/auto-complete/auto-complete.component';
import { ClubsListComponent } from './components/clubs-list/clubs-list.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { SessionsListComponent } from './components/sessions-list/sessions-list.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemsGridComponent } from './components/items-grid/items-grid.component';
import { AlbumsOfWeekListComponent } from './components/albums-of-week-list/albums-of-week-list.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AlbumScoresComponent } from './components/album-scores/album-scores.component';
import { AlbumTracklistComponent } from './components/album-tracklist/album-tracklist.component';
import { TimePipe } from './pipes/time.pipe';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { AlbumTagsComponent } from './components/album-tags/album-tags.component';
import { BadgeComponent } from './components/badge/badge.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { ContentTwoColComponent } from './layouts/content-two-col/content-two-col.component';
import { ContentSectionComponent } from './components/content-section/content-section.component';
import { ContentSectionHeaderComponent } from './components/content-section-header/content-section-header.component';
import { AlbumsTopRatedComponent } from './components/albums-top-rated/albums-top-rated.component';
import { MembersComponent } from './components/members/members.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AsideBlockComponent } from './components/aside-block/aside-block.component';
import { ColSpacerComponent } from './layouts/col-spacer/col-spacer.component';
import { MembersSelectComponent } from './components/forms/members-select/members-select.component';
import { SeasonsSelectComponent } from './components/forms/seasons-select/seasons-select.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    AutoCompleteComponent,
    TruncatePipe,
    ItemsListComponent,
    ItemsGridComponent,
    AlbumsOfWeekListComponent,
    SectionHeaderComponent,
    SessionsListComponent,
    AlbumsListComponent,
    AlbumScoresComponent,
    AlbumTracklistComponent,
    TimePipe,
    AlbumDetailsComponent,
    AlbumTagsComponent,
    BadgeComponent,
    NoContentComponent,
    ContentTwoColComponent,
    ContentSectionComponent,
    ContentSectionHeaderComponent,
    AlbumsTopRatedComponent,
    MembersComponent,
    NavHeaderComponent,
    UserMenuComponent,
    AsideBlockComponent,
    ColSpacerComponent,
    MembersSelectComponent,
    ClubsListComponent,
    SeasonsSelectComponent,
    StatsComponent
    //  ClubsNavComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ClubRoutingModule,
    DashboardRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [ 
    TruncatePipe,
    TimePipe,
    CommonModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,   
    HttpClientJsonpModule,
    HttpClientModule,
    ItemsListComponent,
    ItemsGridComponent,
    AlbumsOfWeekListComponent,
    SectionHeaderComponent,
    SessionsListComponent,
    AlbumsListComponent,
    AlbumScoresComponent,
    AlbumTracklistComponent,
    AutoCompleteComponent,
    AlbumDetailsComponent,
    AlbumTagsComponent,
    BadgeComponent,
    NoContentComponent,
    ContentTwoColComponent,
    ContentSectionComponent,
    ContentSectionHeaderComponent,
    AlbumsTopRatedComponent,
    MembersComponent,
    NavHeaderComponent,
    UserMenuComponent,
    AsideBlockComponent,
    ColSpacerComponent,
    MembersSelectComponent,
    ClubsListComponent,
    SeasonsSelectComponent,
    StatsComponent
    // ClubsNavComponent
  ],
  providers:[ AuthguardService]
})
export class SharedModule { }
