import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreCollectionGroup,
  DocumentReference } from '@angular/fire/compat/firestore';

import { Score } from '../models/scores';

@Injectable({
  providedIn: 'root'
})

export class ScoresService {
  public clubId;
  public sessionId;
  public albumId;
  private scoresCollection: AngularFirestoreCollection<Score>;
  public scores$: Observable<Score[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  getScores(clubId, sessionId, albumId): Observable<Score[]> {
    this.clubId = clubId;
    this.sessionId = sessionId;
    this.albumId = albumId;
    this.scoresCollection = this.afs.collection<Score>('clubs/'+ this.clubId + '/sessions/' +  this.sessionId + '/albums/' + this.albumId + '/scores' );

      this.scores$ = this.scoresCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.scores$;
  }

  getAverageScore(scores){
    let sum = 0;
    scores.forEach(element => {
      sum += element.score;
    });
    const avg = (sum / scores.length) || 0;
    const average = Math.round(avg * 10) / 10;
    return average
  }

}
