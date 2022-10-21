import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Club } from '../models/clubs';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private _clubId = new BehaviorSubject<any>(null);

  private clubsCollection!: AngularFirestoreCollection<Club >;
  public clubs$!: Observable<Club[]>;

  constructor(
    private afs: AngularFirestore
  ) { 
    this.clubsCollection = this.afs.collection<Club>('clubs');
    this.clubs$ = this.clubsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getClub(id: string): Observable<Club | undefined> {
    // if(!id){
    //   console.log('no club')
    //   return
    // }
    return this.clubsCollection.doc<Club>(id).valueChanges().pipe(
      take(1),
      map((club:any) => {
        club.id = id;
        return club
      })
    );
  }

  getClubs(): Observable<Club[]> {
    return this.clubs$;
  }

  setClubId(value:string){
    this._clubId.next(value);
  }

  getClubid(){
    return this._clubId.asObservable();
  }
}
