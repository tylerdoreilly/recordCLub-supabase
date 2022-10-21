import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SectionHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
