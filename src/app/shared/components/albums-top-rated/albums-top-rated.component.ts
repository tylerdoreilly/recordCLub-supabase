import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'albums-top-rated',
  templateUrl: './albums-top-rated.component.html',
  styleUrls: ['./albums-top-rated.component.scss']
})
export class AlbumsTopRatedComponent implements OnInit {

  @Input() items;
  @Input() title;
  @Input() layout:string = "list";

  constructor() { }

  ngOnInit(): void {
  }

  switchView(view):void{
    this.layout = view;
  }

}
