import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input() size:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
