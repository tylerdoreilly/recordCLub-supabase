import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat//storage';
import { Observable, forkJoin, combineLatest, of} from 'rxjs';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';

// Services
import { AuthService } from "../../shared/services/auth.service";
import { ClubsService } from '../../shared/services/clubs.service';
import { SessionsService } from '../../shared/services/sessions.service';
import { AlbumsService } from '../../shared/services/albums.service';
import { MembersService } from '../../shared/services/members.service';

// Models
import { Club } from '../../shared/models/clubs';
import { Session } from '../../shared/models/session';
import { Album } from '../../shared/models/album';
import { Member } from '../../shared/models/members';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {

  public clubId: any;
  public club$: Observable<Club>;
  public members$: Observable<Member[]>;

  constructor(
    private _clubsService : ClubsService,
    private _membersService : MembersService,
    private actRoute: ActivatedRoute,
    private route: Router,
    public authService: AuthService,
    public afStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
   this.getData();
  }

  getData(){
    this.club$ = this.actRoute.params
    .pipe(
      switchMap((params:any) =>{
        this.clubId = params['id']; 
        this._clubsService.setClubId(this.clubId);
        return this._clubsService.getClub(this.clubId)
      }),   
    )
  }
}
