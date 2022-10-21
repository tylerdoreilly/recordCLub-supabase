import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit {

  @Input() sessionData;

  constructor() { }

  ngOnInit(): void {
  }

}
