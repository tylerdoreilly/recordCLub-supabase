import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss']
})
export class ClubsListComponent implements OnInit {

  @Input() clubs:any

  constructor() { }

  ngOnInit(): void {
    console.log('clubs',this.clubs)
  }

}
