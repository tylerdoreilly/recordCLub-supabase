import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat//storage';
import { Observable, forkJoin, combineLatest, of} from 'rxjs';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';

// Services
import { AuthService } from "../../shared/services/auth.service";
import { ClubsService } from '../../shared/services/clubs.service';

// Models
import { Club } from '../../shared/models/clubs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public clubs$: Observable<Club[]>;
  public Clubs = [];

  constructor(
    private _clubsService : ClubsService,
    private actRoute: ActivatedRoute,
    private route: Router,
    public authService: AuthService,
    public afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.clubs$ = this._clubsService.getClubs();
    this.clubs$.subscribe(res => console.log(res));
  }

}
