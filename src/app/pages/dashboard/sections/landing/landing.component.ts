import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, forkJoin, combineLatest, of, from} from 'rxjs';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';

import { SupabaseService } from "../../../../shared/services/supabase.service";

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public myClubs$: Observable<any>

  constructor(
    private _supabaseService : SupabaseService,
  ) { }

  ngOnInit(): void {
    this.myClubs$ = from(this._supabaseService.clubs()).pipe(
      map((clubs:any)=>{
        return clubs.data
      })
    )
  }

}
