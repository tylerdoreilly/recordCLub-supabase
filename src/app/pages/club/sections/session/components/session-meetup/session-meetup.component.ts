import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'session-meetup',
  templateUrl: './session-meetup.component.html',
  styleUrls: ['./session-meetup.component.scss']
})
export class SessionMeetupComponent implements OnInit {

  @Input() meetingInfo:any;

  constructor() { }

  ngOnInit(): void {
    console.log('meeting',this.meetingInfo)
  }

}
