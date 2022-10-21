import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'session-bracketeer',
  templateUrl: './session-bracketeer.component.html',
  styleUrls: ['./session-bracketeer.component.scss']
})
export class SessionBracketeerComponent implements OnInit {

  @Input() bracketeer;

  constructor() { }

  ngOnInit(): void {
  }

}
