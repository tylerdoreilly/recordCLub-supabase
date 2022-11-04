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
  public wikiData$: Observable<any>

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

    this.wikiData$ = this._albumsService.getWikiSections(this.links.strWikipediaID)
    .pipe(
      switchMap((sections:any)=>{
        const sectionsList = sections.parse.sections;
        this.wikipediaCredits$ = this.parseWikiSection(sectionsList, 'Personnel', this.links.strWikipediaID );
        this.wikiBackground$ = this.parseWikiSection(sectionsList, 'Background', this.links.strWikipediaID );
        this.wikiRecording$ = this.parseWikiSection(sectionsList, 'Recording', this.links.strWikipediaID );

        const data = combineLatest([ this.wikipediaCredits$, this.wikiBackground$, this.wikiRecording$])
        .pipe(
          map(([credits, background, recording]) => ({
            credits: credits ? credits.parse.text : '', 
            background: background ? background.parse.text : '',
            recording: recording ? recording.parse.text : '',
          }))
        )
        return data
      }),
    )

    this.wikiData$.subscribe(x=>console.log('test sections',x))

    this.wikipediaCredits$ = this._albumsService.getWikiSections(this.links.strWikipediaID)
    .pipe(
      switchMap((sections:any)=>{
        const sectionsList = sections.parse.sections;
        return this.parseWikiSection(sectionsList, 'Personnel', this.links.strWikipediaID );
      }),
      map((credits:any)=>{
        return credits ? credits.parse.text : of(null)
      })
    )

    this.wikiBackground$ = this._albumsService.getWikiSections(this.links.strWikipediaID)
    .pipe(
      tap(x =>console.log('sections',x)),
      switchMap((sections:any)=>{
        const sectionsList = sections.parse.sections;
        return this.parseWikiSection(sectionsList, 'Background', this.links.strWikipediaID );
      }),
      map((background:any)=>{
        return background ? background.parse.text : of(null)
      })
    )

    this.wikiRecording$ = this._albumsService.getWikiSections(this.links.strWikipediaID)
    .pipe(
      tap(x =>console.log('sections',x)),
      switchMap((sections:any)=>{
        const sectionsList = sections.parse.sections;     
        return  this.parseWikiSection(sectionsList, 'Recording', this.links.strWikipediaID );
      }),
      map((recording:any)=>{
        return recording ? recording.parse.text : of(null)
      })
    )

  }

  parseWikiSection(sectionsList, sectionType, wikiId){
    const selectedSections = sectionsList.filter(sectionsList => sectionsList.line == sectionType);
    const section = selectedSections.length ? selectedSections[0].index : null;
    return section ? this._albumsService.getWikiSection(wikiId, section) : of(null)
  }
}
