import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin, combineLatest, of} from 'rxjs';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';

// Services
import { AuthService } from "../../../../shared/services/auth.service";
import { ClubsService } from '../../../../shared/services/clubs.service';
import { SessionsService } from '../../../../shared/services/sessions.service';
import { AlbumsService } from '../../../../shared/services/albums.service';

// Models
import { Club } from '../../../../shared/models/clubs';
import { Session } from '../../../../shared/models/session';
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
  public clubData$: Observable<any>

  constructor(
    private _clubsService : ClubsService,
    private _sessionsService : SessionsService,
    private _albumService : AlbumsService,
    private actRoute: ActivatedRoute,
    public authService: AuthService,
    public afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this. getData();
  }

  getData():void{
    this.club$ = this._clubsService.getClub(this.id);
    this.sessions$ = this._sessionsService.getLatestSession(this.id);
    this.albumsOfWeek$ = this._albumService.getAlbumsOfWeek();
    this.albumFeatured$ = this._albumService.getRandomAlbum();

    this.clubData$ = combineLatest([this.club$, this.sessions$, this.albumsOfWeek$, this.albumFeatured$])
    .pipe(
      map(([club, sessions, albumsOfWeek, randomAlbum]) => ({
        club,
        sessions,
        albumsOfWeek,
        randomAlbum
      }))
    )
    this.clubData$.subscribe(x=>console.log('sessionData',x))
  }

}
