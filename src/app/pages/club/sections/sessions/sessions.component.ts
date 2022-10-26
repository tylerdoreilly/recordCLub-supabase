import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin, combineLatest, of, from} from 'rxjs';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionAddComponent } from '../session-add/session-add.component';

// Services
import { AuthService } from "../../../../shared/services/auth.service";
import { ClubsService } from '../../../../shared/services/clubs.service';
import { SessionsService } from '../../../../shared/services/sessions.service';
import { AlbumsService } from '../../../../shared/services/albums.service';
import { SupabaseService } from '../../../../shared/services/supabase.service';

// Models
import { Club } from '../../../../shared/models/clubs';
import { Session } from '../../../../shared/models/session';
import { Album } from '../../../../shared/models/album';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  @Input() items:any;

  public clubId: any;
  public sessions$: Observable<any>;

  // filters
  public session$:Observable<any>;
  public season$:Observable<any>;

  public sessionsFilterForm: FormGroup;
  public filterItems$:Observable<any>
  public filteredSessions$;

  constructor(
    private _clubsService : ClubsService,
    private _sessionsService : SessionsService,
    private _supabaseService : SupabaseService,
    private actRoute: ActivatedRoute,
    private route: Router,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    public authService: AuthService,
    public afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this._clubsService.getClubid().subscribe(result => this.clubId = result)
    this.getData();
    this.setupFilters();  
    this.createSessionsFilterForm();
    this.onValueChanges();
  }

  getData(): void {
    this.sessions$ = from(this._supabaseService.getSBAllSessions());
    this.sessions$.subscribe(x => console.log('sessions', x))
    this.filteredSessions$ = this.sessions$.pipe(
      map((sessions:any)=>{
        return sessions.data
      })
    );
   
  }

  ////////////////////////////////////// 
  // Set Filters

  setupFilters():void{
    this.session$ = this.sessions$.pipe(
      map((sessions:any) =>{
        return this._setFilterItems(sessions.data, 'title');
      })
    )

    this.season$ = this.sessions$.pipe(
      map((sessions:any) =>{
        return this._setFilterItems(sessions.data.seasons, 'title');
      })
    )

    this.filterItems$ = combineLatest([this.session$, this.season$])
    .pipe(
      map(([sessions, seasons]) => ({
        sessions, 
        seasons
      }))
    )
    this.filterItems$.subscribe(x=>console.log('Filters',x))

  }
  
  private _setFilterItems(array:any, item:any){
    let newSet

    if(array){
      newSet = new Set(array.map((x:any) => x[item]));
      return Array.from(newSet).map(x => ({
        displayName: x,
      }));    
    }
    
   
  }


  ////////////////////////////////////// 
  // Filter Form

  createSessionsFilterForm(){
    this.sessionsFilterForm = this._fb.group({
      session: [null],
      season: [null],
    });
  }

  onValueChanges(){
    this.sessionsFilterForm.get('session').valueChanges.subscribe(x =>{
      if(x == ''){
        this.filteredSessions$ = this.sessions$.pipe(
          map((sessions:any)=>{
            return sessions.data
          })
        );
      }
      else{
        const filterTerm: string = x.displayName;
        console.log('filter', filterTerm)
        this.filteredSessions$ = from(this._supabaseService. getSBSessionsByTitle(filterTerm)).pipe(
          map((sessions:any)=>{
            return sessions.data
          })
        );
      }
     
    })

   
  }

   ////////////////////////////////////// 
  // Actions

  openDialog() {
    this.dialog.open(SessionAddComponent, {
      width: '40vw', 
      // height:'70vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      disableClose: true,
    });
  }
}
