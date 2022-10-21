import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'col-spacer',
  templateUrl: './col-spacer.component.html',
  styleUrls: ['./col-spacer.component.scss']
})
export class ColSpacerComponent implements OnInit {

  @Input() gap:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
