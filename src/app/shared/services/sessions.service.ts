import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// import { Session } from '../models/session';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

export class SessionsService {

  private supabase: SupabaseClient

  constructor() { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }



  /////////////////////////////////////////////////
  // Get Sessions from Supabase

  async getSessionsCount(){
    const count = await this.supabase
    .from('sessions')
    .select('*', { count: 'exact', head: true })
    return count
  }

  async getSeasonsCount(){
    const count = await this.supabase
    .from('seasons')
    .select('*', { count: 'exact', head: true })
    return count
  }










  // Get Sessions

  // getSessions(id:any): Observable<Session[]> {
  //   this.id = id;
  //   this.sessionsCollection = this.afs.collection<Session>('clubs/'+ this.id + '/sessions');

  //     this.sessions$ = this.sessionsCollection.snapshotChanges().pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  //   return this.sessions$;
  // }

 

  // getSessionsNew(clubId: string, sessionId: string): Observable<Session> {
  //   this.sessionsListDocument = this.afs.doc<Session>('clubs/' + clubId + '/sessions/' + sessionId);
  //   return this.sessions = this.sessionsListDocument.valueChanges();
  // }

  // getSession(clubId: string, sessionId: string): Observable<Session | null | undefined> {
  //   this.sessionsCollection = this.afs.collection<Session>('clubs/' + clubId + '/sessions');
  //   return this.sessionsCollection.doc<Session>(sessionId).valueChanges().pipe(
  //     take(1),
  //     map((session:any) => {
  //       session.id = sessionId;
  //       this.updatedDataSelection(session);
  //       return session
  //     })
      
  //   );
  // }

  // getLatestSession(clubId:any): Observable<Session[]> {
  //   this.sessionsCollection = this.afs.collection<Session>('clubs/'+ clubId + '/sessions', ref => ref.orderBy('week', "desc").limit(1));

  //   this.latestSession$ = this.sessionsCollection.snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     })
  //   );
  //   return this.latestSession$;
  // }

  // Add / Update Sessions

  // addSession(clubId:any, session: any): Promise<DocumentReference> {
  //   this.sessionsCollection = this.afs.collection<Session>('clubs/' + clubId + '/sessions');
  //   return this.sessionsCollection.add(session);
  // }

  // updateSession(sessionId:any, session: Session): Promise<void> { 
  //   return this.sessionsCollection.doc(sessionId).update({ 
  //     title: session.title,
  //     week: session.week,
  //     season: session.season,
  //     theme: session.theme,
  //     startDate: session.startDate,
  //     endDate: session.endDate,
  //     meetupDate: session.meetupDate,
  //     meetupTime: session.meetupTime,
  //   });
  // }

  // updateSessionList(clubId, sessionId:any, sessions): Promise<void> { 
  //   this.sessionsListDocument = this.afs.doc<Session>('clubs/' + clubId + '/sessions/' + sessionId);
  //   return this.sessionsListDocument.update({ 
  //     sessions: sessions,
  //   });
  // }

  // updatedDataSelection(session: Session[]){
  //   this._source.next(session);
  // }

  // setSessionData(value:any){
  //   this._sessionData.next(value);
  // }

  // getSessionData(){
  //   return this._sessionData.asObservable();
  // }
}
