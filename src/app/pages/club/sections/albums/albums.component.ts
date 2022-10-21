import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin, combineLatest, of} from 'rxjs';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

// Services
import { ClubsService } from '../../../../shared/services/clubs.service';
import { AlbumsService } from '../../../../shared/services/albums.service';
import { SessionsService } from '../../../../shared/services/sessions.service';

// Models
import { Album } from '../../../../shared/models/album';
import { Session } from '../../../../shared/models/session';
import { filterItem } from '../../../../shared/models/filters';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  
  public id: any;
  public allAlbums: Album[];

  constructor(
    private _clubsService: ClubsService,
    private _albumService: AlbumsService,
    private _sessionsService: SessionsService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._clubsService.getClubid().subscribe((result:any) => this.id = result);
    this.getRecords();
  }


  public getRecords(){
    // this.progress.loading = true;

    this._albumService.getAllAlbums()
      .pipe(
        // finalize(() => this.progress.loading = false)
      )
      .subscribe((results:any) =>{
        this.allAlbums = results;
        this._albumService.setAllAlbumsStore(this.allAlbums);
        console.log('all albums',this.allAlbums)
      })
  }

}
