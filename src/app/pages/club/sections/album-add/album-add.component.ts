import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of, combineLatest, BehaviorSubject, switchMap } from 'rxjs';
import { AlbumsService } from '../../../../shared/services/albums.service';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.scss']
})
export class AlbumAddComponent implements OnInit {
  public albumForm: FormGroup;
  autocompleteInput: string;
  queryWait: boolean;

  public results = [];
  public loading: boolean;
  public message = '';
  public formatAlbumTitle;
  public albumSelection;
  public albumSelectionTracklist;
  public albumSelected:boolean = false;
  public albumSelectedLength: any;

  public itunesData:Observable<any>
  public lastFmData:Observable<any>
  public audioDBData:Observable<any> 
  public wiki: Observable<any>;
  public musicBrainz: Observable<any>;
  public allAlbumData :Observable<any>

  public metaDataSources = {itunes:false, lastFm:false, audioDb:false}

  constructor(
    private _fb: FormBuilder,
    private _albumsService: AlbumsService,
    private _utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,  
  ) { }

  ngOnInit(): void {
    this.createAlbumForm();
  }

  createAlbumForm():void{
    this.albumForm = this._fb.group({
      album:[null],
      title: [null],
      artist: [null],
      albumThumbnail: [null],
      releaseDate: [null],
      trackCount: [null],
      country: [null],
      copyright: [null],
    });
  }

  addAlbum(emittedAlbum){
    this.albumSelection = emittedAlbum;
    this.albumSelected = true;
    console.log('selected album', emittedAlbum);

    this.formatAlbumTitle = emittedAlbum.collectionName.replace(/ \([\s\S]*?\)/g, '');
    const artist = emittedAlbum.artistName

    this.itunesData = this._albumsService.lookupAlbum(this.albumSelection.collectionId)
    this.lastFmData = this._albumsService.getLastFmData(artist, this.formatAlbumTitle)
    this.audioDBData = this._albumsService.getAudioDbAlbum(artist, this.formatAlbumTitle)

    const itunes = this.itunesData ? this.itunesData : of(null)
    const lastFm = this.lastFmData ? this.lastFmData : of(null)
    const audioDb = this.audioDBData ? this.audioDBData : of(null)

    if(lastFm){
      this.musicBrainz = lastFm.pipe(
        switchMap((lastFmData:any)=>{
          const mbid = lastFmData.album.mbid;
          let musicBrainz;

          if(mbid){
           musicBrainz = this._albumsService.getMBRelease(mbid)
          }
          else{
            musicBrainz = of(null)
          }
         
          return musicBrainz
        })
      )
    }
   

    this.allAlbumData = combineLatest([itunes, lastFm, audioDb, this.musicBrainz])

    this.allAlbumData.subscribe(x=> {
      console.log('album data',x);
      if(x[0]){
        this.albumSelectionTracklist = x[0].results.slice(1);
        this.albumSelectedLength = this._utilityService.getAlbumLength(this.albumSelectionTracklist);
        this.metaDataSources.itunes = true;
      }
      if(x[1]){
        this.metaDataSources.lastFm = true;
      }
      if(x[2]){
        this.metaDataSources.audioDb = true;
        const wikiId = x[2].album[0].strWikidataID
        this.wiki = this._albumsService.getWikiData(wikiId)
        this.wiki.subscribe(x=>console.log('wiki',x))
      }
     

    })
    this.populateForm(emittedAlbum)
  }

  removeAlbum(result, $event){}

  populateForm(album){
    this.albumForm.get('title').patchValue(album.collectionName)
    this.albumForm.get('artist').patchValue(album.artistName)
    this.albumForm.get('albumThumbnail').patchValue(album.artworkUrl100)
    this.albumForm.get('releaseDate').patchValue(album.releaseDate)
    this.albumForm.get('trackCount').patchValue(album.trackCount)
    this.albumForm.get('country').patchValue(album.country)
    this.albumForm.get('copyright').patchValue(album.copyright)
    console.log('album form', this.albumForm.value);
  }

  updateResults(results): void {
    if(results){
      if(results.results.length){
        this.results = results.results;
      }
      else{
        this.results = [];
      }
    }
    else{
      this.results = [];
    }
   
    
    console.log('updated results',this.results );

    // if (this.results.length === 0) {
    //   this.message = 'Not found...';
    // } else {
    //   this.message = 'Top 10 results:';
    // }
  }

}
