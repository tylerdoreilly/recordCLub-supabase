import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'albums-of-week-list',
  templateUrl: './albums-of-week-list.component.html',
  styleUrls: ['./albums-of-week-list.component.scss']
})
export class AlbumsOfWeekListComponent implements OnInit {

  @Input()items:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
