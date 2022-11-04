import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of, combineLatest, BehaviorSubject, switchMap, map,mergeMap } from 'rxjs';

//Services
import { AlbumsService } from '../../../../shared/services/albums.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { MembersService } from '../../../../shared/services/members.service';

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
  public allAlbumData :Observable<any>

  public members;

  public metaDataSources = {itunes:false, lastFm:false, audioDb:false}

  constructor(
    private _fb: FormBuilder,
    private _albumsService: AlbumsService,
    private _utilityService: UtilityService,
    private _supabaseService: SupabaseService,
    private _membersService: MembersService,
    @Inject(MAT_DIALOG_DATA) public data: any,  
  ) { }

  ngOnInit(): void {
    this.getMembers();
    this.createAlbumForm();
  }

  createAlbumForm():void{
    this.albumForm = this._fb.group({
      title: [null],
      artist: [null],
      albumThumb: [null],
      albumThumb_lg: [null],
      albumThumb_xl: [null],
      releaseDate: [null],
      trackCount: [null],
      country: [null],
      copyright: [null],
      submittedBy: [null],
      collaborator: [null],
      season: [null],
      session: [null],
      sessionId: [null],
      itunes_id: [null],
      discogsId: [null],
      mbid: [null],
      wikiDataId: [null],
      wikipediaId: [null],
      primaryGenre: [null],
      albumLength: [null],
    });
  }

  addAlbum(emittedAlbum){
    this.albumSelection = emittedAlbum;
    this.albumSelected = true;
    console.log('selected album', emittedAlbum);

    this.formatAlbumTitle = emittedAlbum.collectionName.replace(/ \([\s\S]*?\)/g, '');
    const artist = emittedAlbum.artistName

    this.itunesData = this._albumsService.lookupAlbum(this.albumSelection.collectionId).pipe(
      map((result:any) =>{
        const itunesData = result.results
        this.albumSelectionTracklist = itunesData.slice(1);
        this.albumSelectedLength = this._utilityService.getAlbumLength(this.albumSelectionTracklist);
        return itunesData
      })
    )

    this.lastFmData = this._albumsService.getLastFmData(artist, this.formatAlbumTitle).pipe(
      map((result:any) =>{
        const lastFmData = result ? result.album : of(null)
        return lastFmData
      })
    )

    this.audioDBData = this._albumsService.getAudioDbAlbum(artist, this.formatAlbumTitle).pipe(
      map((result:any)=>{
        const audioDbData = result ? result.album[0] : of(null)
        return audioDbData
      })
    )

    this.allAlbumData = combineLatest([this.itunesData, this.lastFmData, this.audioDBData])

    this.allAlbumData.subscribe((album:any) => {
      console.log('test',album)
      const itunes = album[0]
      const lastFm = album[1]
      const audioDb = album[2]

      this.populateForm(this.albumSelection,itunes,lastFm,audioDb )
    })

  } 

  populateForm(album, itunes, lastFm, audioDb){
    this.albumForm.get('season').patchValue(this.data.session.season)
    this.albumForm.get('sessionId').patchValue(this.data.session.week)
    this.albumForm.get('session').patchValue(this.data.session.id)

    if(album){
      this.albumForm.get('itunes_id').patchValue(album.collectionId)
      this.albumForm.get('title').patchValue(album.collectionName)
      this.albumForm.get('artist').patchValue(album.artistName)
      this.albumForm.get('albumThumb').patchValue(album.artworkUrl100)
      this.albumForm.get('releaseDate').patchValue(album.releaseDate)
      this.albumForm.get('trackCount').patchValue(album.trackCount)
      this.albumForm.get('country').patchValue(album.country)
      this.albumForm.get('copyright').patchValue(album.copyright)
      this.albumForm.get('primaryGenre').patchValue(album.primaryGenreName)
    }
    if(itunes){
      this.metaDataSources.itunes = true;
      this.albumForm.get('albumLength').patchValue(this.albumSelectedLength)
    }
    if(lastFm){
      if(lastFm.image){
        const albumThumblg = this._utilityService.getAlbumCoverNew(lastFm, 'large');
        const albumThumbxl = this._utilityService.getAlbumCoverNew(lastFm, 'extralarge');
        this.albumForm.get('albumThumb_lg').patchValue(albumThumblg)
        this.albumForm.get('albumThumb_xl').patchValue(albumThumbxl)
      }    
      this.metaDataSources.lastFm = true;
    }
    if(audioDb){
      this.metaDataSources.audioDb = true;
      this.albumForm.get('discogsId').patchValue(audioDb.strDiscogsID)
      this.albumForm.get('mbid').patchValue(audioDb.strMusicBrainzID)
      this.albumForm.get('wikiDataId').patchValue(audioDb.strWikidataID)
      this.albumForm.get('wikipediaId').patchValue(audioDb.strWikipediaID)
    }
   
    console.log('album form', this.albumForm.value);
  }

  resetForm(){
    this.albumForm.get('itunes_id').patchValue('')
    this.albumForm.get('title').patchValue('')
    this.albumForm.get('albumThumb').patchValue('')
    this.albumForm.get('releaseDate').patchValue('')
    this.albumForm.get('trackCount').patchValue('')
    this.albumForm.get('country').patchValue('')
    this.albumForm.get('copyright').patchValue('')
    this.albumForm.get('primaryGenre').patchValue('')
    this.albumForm.get('albumLength').patchValue('')
    this.albumForm.get('albumThumb_lg').patchValue('')
    this.albumForm.get('albumThumb_xl').patchValue('')
    this.albumForm.get('discogsId').patchValue('')
    this.albumForm.get('mbid').patchValue('')
    this.albumForm.get('wikiDataId').patchValue('')
    this.albumForm.get('wikipediaId').patchValue('')
  }

  updateResults(results): void {
    if(results){
      if(results.results.length){
        this.results = results.results;
      }
      else{
        this.results = [];
        this.removeAlbum();
      }
    }
    else{
      this.results = [];
      this.removeAlbum();
    }   
    console.log('updated results',this.results );
  }

  saveAlbum() {
    const value = this.albumForm.value;
    this._supabaseService.createAlbum(value)
  }

  removeAlbum(){
    this.albumSelected = false;
    this.resetForm();
  }


  //////////////////////////////////
  /// Members

  getMembers(){
    this._membersService.getMembers()
    .pipe(
      map((members:any)=>{
        const membersList = members.data;
        return membersList.map(x => ({
          id: x.id,
          displayName: x.displayName,
        }));            
      })    
    )
    .subscribe(members =>{
      this.members = members;
      console.log('members',this.members)
    });
  }

}
