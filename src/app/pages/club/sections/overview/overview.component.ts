import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, combineLatest, of, from} from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Services
import { AuthService } from "../../../../shared/services/auth.service";
import { ClubsService } from '../../../../shared/services/clubs.service';
import { SessionsService } from '../../../../shared/services/sessions.service';
import { AlbumsService } from '../../../../shared/services/albums.service';
import { SongsService } from '../../../../shared/services/songs.service';
import { SupabaseService } from '../../../../shared/services/supabase.service';

// Models
import { Club } from '../../../../shared/models/clubs';
import { Session, SessionNew } from '../../../../shared/models/session';
import { Album } from '../../../../shared/models/album';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public id: any;
  public clubDetails:any = {};

  public club$: Observable<Club>;
  public sessions$: Observable<Session[]>;
  public latestSession$: Observable<Session[]>;
  public albumsOfWeek$: Observable<Album[]>;
  public albumFeatured$: Observable<Album[]>;
  public clubData$: Observable<any>;

  //Counts
  public albumCount$: Observable<any>;
  public songsCount$: Observable<any>;
  public sessionsCount$: Observable<any>;
  public seasonsCount$: Observable<any>;

  //Supabase
  public sbLatestSession$:Observable<any>

  constructor(
    private _clubsService : ClubsService,
    private _sessionsService : SessionsService,
    private _albumService : AlbumsService,
    private _songsService : SongsService,
    private _supabaseService : SupabaseService,
    private _actRoute: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.id = this._actRoute.snapshot.paramMap.get('id');
    this.getData();
  }

  getData():void{
    this.sbLatestSession$ = from(this._supabaseService.getSBUpcomingSession())
    this.albumCount$ = from(this._albumService.getAlbumsCount())
    this.songsCount$ = from(this._songsService.getSongsCount())
    this.sessionsCount$ = from(this._sessionsService.getSessionsCount())
    this.seasonsCount$ = from(this._sessionsService.getSeasonsCount())
    // this.albumsOfWeek$ = this._albumService.getAlbumsOfWeek();
    // this.albumFeatured$ = this._albumService.getRandomAlbum();

    this.clubData$ = combineLatest([
      this.sbLatestSession$, 
      this.albumCount$,
      this.songsCount$, 
      this.sessionsCount$, 
      this.seasonsCount$])
    .pipe(
      map(([latestSession, albumsCount, songsCount, sessionsCount, seasonsCount]) => ({
        latestSession,
        counts: this._getCounts(albumsCount, songsCount, sessionsCount, seasonsCount)
      })),
      tap(x=>console.log('Club Overview Data',x)),
    )
  }

  private _getCounts(albumsCount, songsCount, sessionsCount, seasonsCount){
    const counts = [
      {count: albumsCount.count, title: 'Albums', icon:'album'},
      {count: songsCount.count, title: 'Songs', icon:'queue_music'},
      {count: sessionsCount.count, title: 'Sessions', icon:'today'},
      {count: seasonsCount.count, title: 'Seasons', icon:'sunny'}
    ]
  
    return counts;
  }

}
