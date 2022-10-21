import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../../../../../shared/models/groups';

@Component({
  selector: 'session-group',
  templateUrl: './session-group.component.html',
  styleUrls: ['./session-group.component.scss']
})
export class SessionGroupComponent implements OnInit {

  @Input() group: Group;
  
  constructor() { }

  ngOnInit(): void {
  }

}
