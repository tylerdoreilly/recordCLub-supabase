import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin, combineLatest, of, from, merge, throwError} from 'rxjs';
import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';
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
  public testTy:Observable<any>;

  // filters
  public session$:Observable<any>;
  public season$:Observable<any>;

  public sessionsFilterForm: FormGroup;
  public filterItems$:Observable<any>
  public filteredSessions$;
  public errorObject;

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

  ngOnInit() {
    this._clubsService.getClubid().subscribe(result => this.clubId = result)
    this.getData();  
    this.createSessionsFilterForm();
    this.onValueChanges();
    this.handleRealtimeUpdates();
  }

  async getData() {
    await this._supabaseService.getSBAllSessions();

    this.sessions$ = this._supabaseService.clubSessions.pipe(
      map((sessions:any)=>{
        return sessions.data
      }),
      catchError(error =>{
        this.errorObject = error;
        return throwError(() => new Error(error))
      })
    );

    this.setupFilters();  
   
  }

  handleRealtimeUpdates() {   
    this._supabaseService.getTableChanges().subscribe((update: any) => {
      const record = update.new?.id ? update.new : update.old;
      const event = update.eventType;

      if (!record) return;

      const newSession$ = from(this._supabaseService.getClubSessionById(record.id))

      this.sessions$ = combineLatest([this.sessions$, newSession$]).pipe(
        map(([firstResult, secondResult]) => {
          if(event === 'INSERT'){
            return [].concat(secondResult.data).concat(firstResult)
          }
          else if(event === 'UPDATE'){
           console.log('UPDATE', record)
          }
          else if(event === 'DELETE'){
            console.log('DELETE', record)
          }
        }) 
      )
    })
  }

  ////////////////////////////////////// 
  // Set Filters

  setupFilters():void{
    this.session$ = this.sessions$.pipe(
      map((sessions:any) =>{
        return this._setFilterItems(sessions, 'title');
      })
    )

    this.season$ = this.sessions$.pipe(
      map((sessions:any) =>{
        return this._setSeasonFilter(sessions, 'title');
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

  private _setSeasonFilter(array:any, item:any){

    if(array){

      let seasons = array.map(sessions =>{
        return sessions.seasons
      })

      seasons = seasons.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.displayName === value.displayName && t.id === value.id
        ))
      )

      return Array.from(seasons).map((x:any) => ({
        displayName: x.title,
        id:x.id
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
        this.sessions$ = this._supabaseService.clubSessions.pipe(
          map((sessions:any)=>{
            return sessions.data
          })
        );
      }
      else{
        const filterTerm: string = x.displayName;
        console.log('filter', filterTerm)
        this.sessions$ = from(this._supabaseService.getSBSessionsByTitle(filterTerm)).pipe(
          map((sessions:any)=>{
            return sessions.data
          })
        );
      }
     
    })

    this.sessionsFilterForm.get('season').valueChanges.subscribe(x =>{
      if(x == ''){
        this.sessions$ = this._supabaseService.clubSessions.pipe(
          map((sessions:any)=>{
            return sessions.data
          })
        );
      }
      else{
        const filterTerm = x;
        console.log('filter', filterTerm)
        this.sessions$ = from(this._supabaseService.getSBSessionsBySeason(filterTerm)).pipe(
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
