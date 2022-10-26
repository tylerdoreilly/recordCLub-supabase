import { Component, OnInit,Input } from '@angular/core';
import { Observable, of, combineLatest, from, map } from 'rxjs';

// Services
import { AlbumsService } from '../../../../../../shared/services/albums.service';
import { UtilityService } from '../../../../../../shared/services/utility.service';

@Component({
  selector: 'album-media',
  templateUrl: './album-media.component.html',
  styleUrls: ['./album-media.component.scss']
})
export class AlbumMediaComponent implements OnInit {

  @Input() links

  public discogsLink
  public albumVideos$: Observable<any>

  constructor(
    private _albumsService: AlbumsService,
    private _utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this.discogsLink = this.links.strDiscogsID;
    this.getData();
  }

  getData(){
    if(this.discogsLink){
      this.albumVideos$ = this._albumsService.getDiscogsRelease(this.discogsLink).pipe(
        map((album:any) =>{
          const videos = this.getVideoUris(album.videos);    
          return videos
        })
      )
  
      this.albumVideos$.subscribe(x =>console.log('videos',x))
    }
   
  }

  getVideoUris(array){  
   return array.map(x => ({
      ...x,
      videoId: this.getVideoId(x.uri),
    }));    
  }

  getVideoId(uri){
    const videoId = uri.split('=')[1]
    const url = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    return url
  }


}
