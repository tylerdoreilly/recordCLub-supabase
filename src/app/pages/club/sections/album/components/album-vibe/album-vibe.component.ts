import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'album-vibe',
  templateUrl: './album-vibe.component.html',
  styleUrls: ['./album-vibe.component.scss']
})
export class AlbumVibeComponent implements OnInit {
 
  @Input() vibe
  
  constructor() { }

  ngOnInit(): void {
  }

}
