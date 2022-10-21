import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map,switchMap, take } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import { Song } from '../models/song';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreCollectionGroup,
  DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private songsCollection: AngularFirestoreCollection<Song>;
  private songWinnerCollection: AngularFirestoreCollectionGroup<Song>;

  public songs$: Observable<Song[]>;
  public songsWinners$: Observable<Song[]>;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) { }

  addSong(clubId, sessionId, song: Song): Promise<DocumentReference> {
    const clubID = clubId;
    const sessionID = sessionId;
    this.songsCollection = this.afs.collection<Song>('clubs/' + clubID + '/sessions/' + sessionID + '/songs');
    return this.songsCollection.add(song);
  }

  getSongs(clubId, sessionId): Observable<Song[]> {

    this.songsCollection = this.afs.collection<Song>('clubs/'+ clubId + '/sessions/' + sessionId + '/songs', ref => ref.orderBy('position.roundOne', 'asc'));

      this.songs$ = this.songsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.songs$;
  }

  updateSongs(songId, song: any): Promise<void> { 
    return this.songsCollection.doc(songId).update({ 
      position: song.position,
      rounds: song.rounds
    });
  }

  getSongWinners(): Observable<Song[]> {
    this.songWinnerCollection = this.afs.collectionGroup<Song>('songs', ref => ref.where('rounds.roundFour', '==', true));

      this.songsWinners$ = this.songWinnerCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.songsWinners$;
  }

}
