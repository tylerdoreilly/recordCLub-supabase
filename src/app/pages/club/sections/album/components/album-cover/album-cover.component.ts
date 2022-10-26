import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'album-cover',
  templateUrl: './album-cover.component.html',
  styleUrls: ['./album-cover.component.scss']
})
export class AlbumCoverComponent implements OnInit {

  @Input() lgCover
  @Input() defaultCover

  public albumCover;

  constructor() { }

  ngOnInit(): void {

    if(this.lgCover){
      this.albumCover = this.lgCover;
    }
    else{
      this.albumCover = this.defaultCover;
    }

  }

}
