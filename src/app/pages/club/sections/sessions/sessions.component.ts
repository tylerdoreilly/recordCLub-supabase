import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin, combineLatest, of} from 'rxjs';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  @Input() items:any;

  public clubId: any;
  public sessionsId:string = 'sessionsList'
  public sessions$: Observable<any>;
  public sessionsTemp:Session[]
  public fillDataForm: FormGroup;

  constructor(
    private _clubsService : ClubsService,
    private _sessionsService : SessionsService,
    private _albumService : AlbumsService,
    private actRoute: ActivatedRoute,
    private route: Router,
    private _fb: FormBuilder,
    public authService: AuthService,
    public afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this._clubsService.getClubid().subscribe(result => this.clubId = result)
    this.createFillDataForm();
    // this.sessions$ = this._sessionsService.getSessions(this.clubId);
    this.sessions$ = this._sessionsService.getSessionsNew(this.clubId, this.sessionsId);
    this.sessions$.subscribe(x => console.log('sessions', x))
    this._sessionsService.getSessions(this.clubId).subscribe(x=>{
      this.sessionsTemp = x;
    });
  }
  
  //Temp add/update scores
  createFillDataForm():void{
    this.fillDataForm = this._fb.group({
      title: ['Week 102'],
      week: [102],
      theme:[''],
      season:[{title:'Season 7', seasonId:'season7'}],
      event:[{startDate:'2022-08-30T14:40:32Z', endDate:'2022-08-30T14:40:32Z'}],
      meetup:[{date:'2022-08-30T14:40:32Z', time:'2022-08-30T14:40:32Z'}],
      bracketeer:[{
        displayName:'CreamTy', 
        avatar:'https://gravatar.com/avatar/0d4a313e2b2818467f204d3303812458?s=200&d=robohash&r=x',
        userId:'6ne6LZKnPDcpWElONWy2XINe6Ug2'}],
    });
  }

  
  addData():void{
    const value = this.fillDataForm.value;
    console.log('form value',value)
    this._sessionsService.addSession(this.clubId, value);
    // this._albumsService.getAlbum(this.clubId, this.sessionId, this.albumId).subscribe(x=>{
    //   this._albumsService.updateData(this.albumId, value);
    // })
    
  }
}
