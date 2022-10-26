import { Component, OnInit, Input } from '@angular/core';
import { Observable, of, combineLatest, from,map, switchMap,tap } from 'rxjs';

// Services
import { AlbumsService } from '../../../../../../shared/services/albums.service';

@Component({
  selector: 'album-versions',
  templateUrl: './album-versions.component.html',
  styleUrls: ['./album-versions.component.scss']
})
export class AlbumVersionsComponent implements OnInit {

  @Input() discogsId;

  public discogsRelease$: Observable<any>
  public discogsVersions$: Observable<any>

  constructor(
    private _albumsService: AlbumsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    if(this.discogsId){
      this.discogsRelease$ = this._albumsService.getDiscogsRelease(this.discogsId);
      this.discogsVersions$ = this._albumsService.getDiscogsReleaseVersions(this.discogsId);
      this.discogsRelease$.subscribe(x=> console.log('dicogs release',x));
      this.discogsVersions$.subscribe(x=> console.log('dicogs versions',x));
    }
   

   
  }

}
