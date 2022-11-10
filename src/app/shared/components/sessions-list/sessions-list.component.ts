import { Component, OnInit, Input } from '@angular/core';
import { ClubsService } from '../../../shared/services/clubs.service';

@Component({
  selector: 'sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})

export class SessionsListComponent implements OnInit {

  @Input() sessions:any;
  public clubId:string;

  constructor(
    private _clubsService: ClubsService
  ) { }

  ngOnInit(): void {
    this._clubsService.getClubid().subscribe((result:any) => this.clubId = result);
   console.log('sessions',this. sessions)  
  }

}
