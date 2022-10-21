import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../models/members';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  @Input() items: Member[];

  constructor() { }

  ngOnInit(): void {
  }

}
