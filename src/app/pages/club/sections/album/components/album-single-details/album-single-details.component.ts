import { Component, OnInit,Input } from '@angular/core';
import { Observable, of, combineLatest, from,map, switchMap,tap } from 'rxjs';

// Services
import { AlbumsService } from '../../../../../../shared/services/albums.service';
import { UtilityService } from '../../../../../../shared/services/utility.service';

@Component({
  selector: 'album-single-details',
  templateUrl: './album-single-details.component.html',
  styleUrls: ['./album-single-details.component.scss']
})
export class AlbumSingleDetailsComponent implements OnInit {

  @Input() links
  @Input() summary;

  public albumSummary

  public wikipediaCredits$: Observable<any>
  public wikiBackground$: Observable<any>
  public wikiRecording$: Observable<any>

  constructor(
    private _albumsService: AlbumsService,
    private _utilityService: UtilityService,
  ) { }

  ngOnInit(): void {

    if(this.summary.album?.wiki?.content){
      this.albumSummary = this._utilityService.splitText(this.summary.album.wiki.content);
    }
   
    this.getData();
  }

  getData(){

    this.wikipediaCredits$ = this._albumsService.getWikiSections(this.links.strWikipediaID)
    .pipe(
      switchMap((sections:any)=>{
        const sectionsList = sections.parse.sections;
        const selectedSections = sectionsList.filter(sectionsList => sectionsList.line == 'Personnel')
        const section = selectedSections[0].index;
        const personnel = this._albumsService.getWikiSection(this.links.strWikipediaID, section)
        return personnel
      }),
      map((credits:any)=>{
        return credits.parse.text
      })
    )

    this.wikiBackground$ = this._albumsService.getWikiSections(this.links.strWikipediaID)
    .pipe(
      tap(x =>console.log('sections',x)),
      switchMap((sections:any)=>{
        const sectionsList = sections.parse.sections;
        const selectedSections = sectionsList.filter(sectionsList => sectionsList.line == 'Background')
        const section = selectedSections[0].index;
        const personnel = this._albumsService.getWikiSection(this.links.strWikipediaID, section)
        return personnel
      }),
      map((background:any)=>{
        return background.parse.text
      })
    )

    this.wikiRecording$ = this._albumsService.getWikiSections(this.links.strWikipediaID)
    .pipe(
      tap(x =>console.log('sections',x)),
      switchMap((sections:any)=>{
        const sectionsList = sections.parse.sections;
        const selectedSections = sectionsList.filter(sectionsList => sectionsList.line == 'Recording')
        const section = selectedSections[0].index;
        const personnel = this._albumsService.getWikiSection(this.links.strWikipediaID, section)
        return personnel
      }),
      map((recording:any)=>{
        return recording.parse.text
      })
    )

  }

}
