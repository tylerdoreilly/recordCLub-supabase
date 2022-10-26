import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'album-submitted-by',
  templateUrl: './album-submitted-by.component.html',
  styleUrls: ['./album-submitted-by.component.scss']
})
export class AlbumSubmittedBYComponent implements OnInit {

  @Input() submittedBy

  constructor() { }

  ngOnInit(): void {
  }

}
