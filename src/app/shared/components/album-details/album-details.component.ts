import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  @Input() summary;

  constructor() { }

  ngOnInit(): void {

  }

}
