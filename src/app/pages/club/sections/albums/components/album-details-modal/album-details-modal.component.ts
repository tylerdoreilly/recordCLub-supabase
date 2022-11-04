import { Component, OnInit, Inject,ViewChild, } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTabsModule,  MatTabGroup} from '@angular/material/tabs';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, take } from 'rxjs/operators';
//services
import { ClubsService } from '../../../../../../shared/services/clubs.service';
import { AlbumsService } from '../../../../../../shared/services/albums.service';
import { UtilityService } from '../../../../../../shared/services/utility.service';

//Models
import { Score } from '../../../../../../shared/models/scores';


@Component({
  selector: 'album-details-modal',
  templateUrl: './album-details-modal.component.html',
  styleUrls: ['./album-details-modal.component.scss']
})
export class AlbumDetailsModalComponent implements OnInit {

  public clubId; 
  public sessionId;
  public albumId;

  public albumDetails;
  public Album;
  public artist;
  public scores$:Observable<Score[]>;
  public album$;
  public trackTime = [];
  public albumLength: any;
  public averageScore;
  public submittedBy;
  public tracklist;
  public formatAlbumTitle
  public albumCover;
  public albumSummary;
  public albumTags;
  public albumScores: Score[];
  public tempScores;
  public fillDataForm: FormGroup;
  public tracks;
  public genreTags = [];
  public tabIndex:number;
  public matTabGroup;

  constructor(
    private _clubsService: ClubsService,
    private _albumsService: AlbumsService,
    private _utilityService: UtilityService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,  
  ) { 
    
  }
 

  ngOnInit(): void {
    this._clubsService.getClubid().subscribe((result:any) => this.clubId = result);
   
    this.createFillDataForm();

    if(this.data){
      this.artist = this.data.album.name;
      this.albumId = this.data.album.id;
      this.albumScores = this.data.album.scores;
      this.averageScore = this.data.album.scoreAverage;
      this.sessionId = this.data.album.sessionId;
      this.submittedBy = this.data.album.submittedBy;
      this.formatAlbumTitle = this.data.album.album.replace(/ \([\s\S]*?\)/g, '');
      this.albumLength = this._utilityService.getAlbumLength(this.data.album.trackList);
      console.log('modal data',this.data)
      this.getAlbumData();
      if(this.data.activeTab){
       
        this.setActiveTab(this.data.activeTab);
      }
     
    }

  }




  getAlbumData():void{
    this._albumsService.lookupAlbum(this.data.album.collectionId).subscribe(results =>{
      this.albumDetails = results.results[0];    
      console.log('Album Details (Itunes)',this.albumDetails);
      console.log('genre tags', this.genreTags)
    })
    
    this._albumsService.getLastFmData(this.artist, this.formatAlbumTitle).subscribe(res =>{
      if(res){
        this.albumCover = this._utilityService.getAlbumCover(res, 'large');
        this.albumTags = res.album.tags.tag;  
        
        if(res.album.wiki){
          this.albumSummary = this._utilityService.splitText(res.album.wiki.content);
        }
        
        if(res.album.mbid){
          this._albumsService.getMBRelease(res.album.mbid).subscribe(res =>{
            console.log('music brainz',res)
          })
        }
      }
     
      console.log('LastFm info', res);
    });  

    this._albumsService.getAudioDbAlbum(this.artist, this.formatAlbumTitle).subscribe(res =>{
      if(res){
        console.log('audio bd album info',res)
      }
     
      console.log('LastFm info', res);
    });  
  }

  setActiveTab(tabNumber):void{
    this.tabIndex = tabNumber;
  }
  

  //Temp add/update scores
  createFillDataForm():void{
    this.fillDataForm = this._fb.group({
      randomizedId: [null],
    });
  }

  addData():void{
    var random = Math.floor((Math.random() * 5000));
    this.fillDataForm.get('randomizedId').patchValue(random);
    // this.fillDataForm.get('trackCount').patchValue(this.albumDetails.trackCount);
    // this.fillDataForm.get('country').patchValue(this.albumDetails.country);
    // this.fillDataForm.get('copyright').patchValue(this.albumDetails.copyright);
    // this.fillDataForm.get('trackList').patchValue(this.tracks);
    const value = this.fillDataForm.value;
    // this._albumsService.getAlbum(this.clubId, this.sessionId, this.albumId).subscribe(x=>{
    //   this._albumsService.updateData(this.albumId, value);
    // })
    
  }
 
}
