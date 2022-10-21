import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject,combineLatest,forkJoin } from 'rxjs';
import { map, take,combineLatestWith} from 'rxjs/operators';
import { SessionsService } from '../../../../shared/services/sessions.service';
import { AlbumsService } from '../../../../shared/services/albums.service';
import { ClubsService } from '../../../../shared/services/clubs.service';
import { SongsService } from '../../../../shared/services/songs.service';
import { MembersService } from '../../../../shared/services/members.service';

import { Album } from '../../../../shared/models/album';
import { Member } from '../../../../shared/models/members';
import { Song } from '../../../../shared/models/song';
import { Group } from '../../../../shared/models/groups';
import { Session } from '../../../../shared/models/session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  public sessionMetaData$:Session;
  public clubId;
  public albums$: Observable<Album[]>;
  public songs$: Observable<Song[]>;
  public members$: Observable<Member[]>;
  public group$: Observable<Group[]>;
  public bracketeer$:Observable<any>
  public sessionData$: Observable<any>;
  public isDraggable:boolean = false;

  constructor(
    private _sessionsService: SessionsService,
    private _membersService: MembersService,
    private _clubsService: ClubsService,
    private _albumsService: AlbumsService,
    private _songsService: SongsService,
  ) { }

  ngOnInit(): void {
    this._clubsService.getClubid().subscribe((result:any) => this.clubId = result);
    this.getSessionData();
    this.getSessionAlbums();
  }

  getSessionData():void{
    if(history.state.data){
      localStorage.setItem("session", JSON.stringify(history.state.data));
      this.sessionMetaData$ = JSON.parse(localStorage.getItem("session"));
    }
    this.sessionMetaData$ = JSON.parse(localStorage.getItem("session"));
  }

  getSessionAlbums():void{
   this.albums$ = this._albumsService.getAlbums(this.clubId, this.sessionMetaData$.id);
   this.songs$ = this._songsService.getSongs(this.clubId, this.sessionMetaData$.id);
   this.members$ = this._membersService.getMembers(this.clubId);
   this.bracketeer$ = of(this.sessionMetaData$.bracketeer);

   this.sessionData$ = combineLatest([this.albums$, this.songs$, this.members$, this.bracketeer$]).pipe(
    map(([albums, songs, members, bracketeer]) => ({
      albums,
      songs,
      members,
      bracketeer,
      groups: this.getGroups(albums, members)
    }))
   )
   this.sessionData$.subscribe(x=>console.log('sessionData',x))
  }

  getGroups(albums, members){
    let result = members.filter(member => albums.some(album => album.submittedBy['id'] === member.id));
    return result
  }

  setOrder(){
    this.isDraggable = true;
  }

  someFunction(event){
    this.isDraggable = event;
  }
}
