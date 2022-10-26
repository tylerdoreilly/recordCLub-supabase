import { Component, OnInit, Input } from '@angular/core';

//Services
import { UtilityService } from '../../../../../../shared/services/utility.service';

@Component({
  selector: 'album-header',
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.scss']
})
export class AlbumHeaderComponent implements OnInit {

  @Input() album
  @Input() albumImgs;
  @Input() albumTags;
  @Input() albumLength;

  public albumCover:any;

  constructor(
    private _utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    if(this.albumImgs){
      this.albumCover = this._utilityService.getAlbumCover(this.albumImgs, 'large');
    }
    
  }

}
