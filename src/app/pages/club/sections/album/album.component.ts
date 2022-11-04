import { Component, OnInit } from '@angular/core';
import { Observable, of, combineLatest, from } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScoresAddComponent } from './components/scores-add/scores-add.component';

// Services
import { AlbumsService } from '../../../../shared/services/albums.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { MembersService } from '../../../../shared/services/members.service';
// Models
import { Album, Vibe } from '../../../../shared/models/album';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public members;
  public primaryAlbumData$: Observable<any>
  public allAlbumData$: Observable<any>
  public albumTracklist: Observable<any>
  public albumScores;
  public itunesData$:Observable<any>
  public albumTracklist$:Observable<any>
  public lastFmData$:Observable<any>
  public audioDBData$:Observable<any> 
  public albumId;
  public sessionId;

  constructor(
    private _supabaseService: SupabaseService,
    private _albumsService: AlbumsService,
    private _utilityService: UtilityService,
    private _membersService : MembersService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData();
  }

   getData(){
    this.allAlbumData$ = this.actRoute.params
     .pipe(
       switchMap((params:any) =>{
          const albumId = params['albumId']; 
          this.albumId = albumId;
          this.primaryAlbumData$ = from(this._supabaseService.getAlbum(albumId))

          return this.primaryAlbumData$.pipe(
            switchMap((album:any)=>{
              this.sessionId = album.sessionId;
              // Get Identifying Info from primary album db source
              const artist = album.artist
              const albumTitle = this._utilityService.formatAlbumTitle(album.title)
              const albumMbid = album.mbid ? album.mbid : null
              const albumItunesId = album.itunes_id ? album.itunes_id : null
              
              //Get Itunes Data
              if(albumItunesId){
                this.albumTracklist$ = this._albumsService.lookupAlbum(albumItunesId)
                .pipe(
                  map((itunesData:any) =>{
                    const tracklist = this._utilityService.getTracklist(itunesData)
                    return tracklist
                  })
                )
              }
              else{
                this.albumTracklist$ = of(null)
              }

              if(albumMbid){
                this.lastFmData$ = this.getLastFmData(albumMbid, artist, albumTitle)
              }
              else{
                this.lastFmData$ = this.getLastFmData(albumMbid, artist, albumTitle)
              }

              this.audioDBData$ = this.getAudioDbData(artist, albumTitle)

              const data = combineLatest([of(album), this.albumTracklist$, this.lastFmData$, this.audioDBData$ ])
              .pipe(
                map(([album, albumTracklist, lastFmData, audioDbData  ]) => ({
                  album, 
                  albumTracklist,
                  lastFmData,
                  audioDbData,
                  albumLinks: this.getAlbumLinks(lastFmData, audioDbData),
                  vibe: this.getVibe(audioDbData)
                }))
              )
              return data
            })
          )
       }),   
     )

    this.allAlbumData$.subscribe(x=>console.log('album data',x))
   }


   getAlbumLinks(lastFm, audioDb){
    let link = {}
    if(lastFm || audioDb){
      link['lastFmUrl'] =  lastFm.album ? lastFm.album.url : ''
      link['strAllMusicID'] = audioDb.album ? audioDb.album[0].strAllMusicID : ''
      link['strBBCReviewID'] = audioDb.album ? audioDb.album[0].strBBCReviewID : ''
      link['strDiscogsID'] = audioDb.album ? audioDb.album[0].strDiscogsID : ''
      link['strMusicBrainzArtistID'] = audioDb.album ? audioDb.album[0].strMusicBrainzArtistID : ''
      link['strMusicBrainzID'] = audioDb.album ? audioDb.album[0].strMusicBrainzID : ''
      link['strMusicMozID'] = audioDb.album ? audioDb.album[0].strMusicMozID : ''
      link['strRateYourMusicID'] = audioDb.album ? audioDb.album[0].strRateYourMusicID : ''
      link['strWikidataID'] = audioDb.album ? audioDb.album[0].strWikidataID : ''
      link['strWikipediaID'] = audioDb.album ? audioDb.album[0].strWikipediaID : ''
    }
    
    return link
   }

   getVibe(audioDb:any): Vibe {
    let vibe = {}
    if(audioDb){
      vibe['mood'] = audioDb.album ? audioDb.album[0].strMood : ''
      vibe['speed'] = audioDb.album ? audioDb.album[0].strSpeed : ''
      vibe['style'] = audioDb.album ? audioDb.album[0].strStyle : ''
    }
    
    return vibe
   }

   getLastFmData(mbid?:string, artist?:string, albumTitle?:string){
    let lastFm

    if(mbid){
      lastFm = this._albumsService.getLastFmAlbumById(mbid)
    }
    if(artist && albumTitle){
      lastFm = this._albumsService.getLastFmData(artist, albumTitle)
    }

    return lastFm ? lastFm : of(null)
   }
   
   getAudioDbData(artist?:string, albumTitle?:string){
    const audioDbData = this._albumsService.getAudioDbAlbum(artist, albumTitle)
    return audioDbData ? audioDbData : of(null)
   }

   addScores(){
    this.dialog.open(ScoresAddComponent, {
      width: '40vw', 
      // height:'70vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      disableClose: true,
      data: {
        albumId: this.albumId,
        sessionId: this.sessionId,
      },
    });
   }
}

