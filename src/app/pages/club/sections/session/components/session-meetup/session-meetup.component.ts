import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'session-meetup',
  templateUrl: './session-meetup.component.html',
  styleUrls: ['./session-meetup.component.scss']
})
export class SessionMeetupComponent implements OnInit {

  @Input() meetingInfo:any;
  public meetupTime;

  constructor() { }

  ngOnInit(): void {
    console.log('meeting',this.meetingInfo)
    this.meetupTime = this.convertTime(this.meetingInfo.meetupTime)
  }

  convertTime(meetupTime){
    const [sHours, minutes] = meetupTime.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;
  
    return `${hours}:${minutes} ${period}`;
  }
 

}
