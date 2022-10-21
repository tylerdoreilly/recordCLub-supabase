import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'album-tracklist',
  templateUrl: './album-tracklist.component.html',
  styleUrls: ['./album-tracklist.component.scss']
})
export class AlbumTracklistComponent implements OnInit {

  @Input() tracklist;
  
  constructor() { }

  ngOnInit(): void {
    console.log('tracklist', this.tracklist)
  }

}
