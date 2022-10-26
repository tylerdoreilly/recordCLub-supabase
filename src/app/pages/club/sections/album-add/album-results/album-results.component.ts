import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'album-results',
  templateUrl: './album-results.component.html',
  styleUrls: ['./album-results.component.scss']
})
export class AlbumResultsComponent implements OnInit {

  @Input() results;

  @Output() albumDetails = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  addAlbum(details, event){
    this.albumDetails.emit(details);
  }

}
