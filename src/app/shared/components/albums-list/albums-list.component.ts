import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumDetailsModalComponent } from '../../../pages/club/sections/albums/components/album-details-modal/album-details-modal.component';

//Services
import { ClubsService } from '../../../shared/services/clubs.service';
import { AlbumsService } from '../../../shared/services/albums.service';
import { SessionsService } from '../../../shared/services/sessions.service';

// Models
import { Album } from '../../../shared/models/album';
import { Session } from '../../../shared/models/session';

@Component({
  selector: 'albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss'],
})

export class AlbumsListComponent implements OnInit {

  public clubId:any;
  public albums$: Observable<Album[]>;
  public sessions$: Observable<Session[]>;
  public users$:any;
  public albumTitles$:any;
  public albumArtists$:any;
  public sessionsFilterList$:any;
  public listView: boolean = false;

  public albumsFilterForm: FormGroup;
  public filterItems$:any;
  public filteredAlbums$;

  constructor(
    private _clubsService : ClubsService,
    private _albumService : AlbumsService,
    private _sessionsService: SessionsService,
    private _fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._clubsService.getClubid().subscribe((result:any) => this.clubId = result);
    this.getData();
    this.createAlbumsFilterForm();
    this.onValueChanges();
  }

  getData(): void {
    // this.albums$ = this._albumService.getAllAlbumsStore();
    // this.sessions$ = this._sessionsService.getSessions(this.clubId);
    this.filteredAlbums$ = this.albums$;
    this.setupFilters();  
    this.sessions$.subscribe(x=>console.log('sessions',x))
  }


  ////////////////////////////////////// 
  //Filtering

  setupFilters():void{
    this.users$ = this.albums$.pipe(
      map((albums:any) =>{
        return this._setFilterItems(albums, 'displayName');
      })
    )

    this.albumTitles$ = this.albums$.pipe(
      map((albums:any) =>{
        return this._setFilterItems(albums, 'album');
      })
    )

    this.albumArtists$ = this.albums$.pipe(
      map((albums:any) =>{
        return this._setFilterItems(albums, 'name');
      })
    )

    this.sessionsFilterList$ = this.sessions$.pipe(
      map((sessions:any) =>{
       const sessionsList = new Set(sessions.map((x:any) => x));
        return Array.from(sessionsList).map((x:any) => ({
          displayName: x.title,
          id:x.id
        }));    
      })
    )

    this.filterItems$ = combineLatest([this.users$,this.albumTitles$, this.albumArtists$, this.sessionsFilterList$])
  }

  private _setFilterItems(array:any, item:any){
    let newSet

    if(item == 'displayName'){
      newSet = new Set(array.map((x:any) => x.submittedBy[item]));
    }else{
     newSet = new Set(array.map((x:any) => x[item]));
    }
    
    return Array.from(newSet).map(x => ({
      displayName: x,
    }));    
  }

  createAlbumsFilterForm(){
    this.albumsFilterForm = this._fb.group({
      artist: [null],
      album: [null],
      submittedBy: [null],
      sessions:[null]
    });
  }

  onValueChanges(){
    this.albumsFilterForm.get('artist').valueChanges.subscribe(x =>{
      if(x == ''){
        this.filteredAlbums$ = this.albums$
      }
      else{
        const filterTerm: string = x.displayName;
        console.log('artist filter', filterTerm)
        // this.filteredAlbums$ = this._albumService.getAlbumsArtist(filterTerm)
      }
     
    })

    this.albumsFilterForm.get('album').valueChanges.subscribe(x =>{
      if(x == ''){
        this.filteredAlbums$ = this.albums$
      }
      else{
        const filterTerm: string = x.displayName;
        console.log('artist filter', filterTerm)
        // this.filteredAlbums$ = this._albumService.getAlbumsArtist(filterTerm)
      }
     
    })
  }

  filterTest(value):void{
   
    let artist:string = value[0].displayName;
    console.log(artist)
    // this._albumService.getAlbumsArtist(artist).subscribe(x=>console.log('filter test',x))
  }


  ////////////////////////////////////// 
  // Actions

  toggleView():void{
    this.listView = !this.listView
  }


  openDialog(value) {
    this.dialog.open(AlbumDetailsModalComponent, {
      width: '40vw', 
      // height:'70vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      disableClose: true,
      data: {
        album: value,
      },
    });
  }

}
