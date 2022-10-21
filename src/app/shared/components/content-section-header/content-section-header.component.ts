import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'content-section-header',
  templateUrl: './content-section-header.component.html',
  styleUrls: ['./content-section-header.component.scss']
})
export class ContentSectionHeaderComponent implements OnInit {

  @Input() title:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
