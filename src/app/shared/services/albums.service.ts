import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map,switchMap, take, retry } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import { Album } from '../models/album';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreCollectionGroup,
  DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private albumsCollection: AngularFirestoreCollection<Album>;
  private allAlbumsCollection: AngularFirestoreCollectionGroup<Album>;
  private albumsOfWeekCollection: AngularFirestoreCollectionGroup<Album>;
  private albumsByArtistCollection: AngularFirestoreCollectionGroup<Album>;
  private albumsTopRatedCollection: AngularFirestoreCollectionGroup<Album>;
  private albumsRandomCollection: AngularFirestoreCollectionGroup<Album>;
  // private songsCollection: AngularFirestoreCollection<Song>;
  // private songWinnerCollection: AngularFirestoreCollectionGroup<Song>;
  public albums$: Observable<Album[]>;
  public allAlbums$: Observable<Album[]>;
  public albumsOfWeek$: Observable<Album[]>;
  public albumsByArtist$: Observable<Album[]>;
  public albumsTopRated$: Observable<Album[]>;
  public albumsRandom$: Observable<Album[]>;
  // public songs$: Observable<Song[]>;
  // public songsWinners$: Observable<Song[]>;

  // Data Stores
  private _allAlbums = new BehaviorSubject<Album[]>(null);
  private _filteredAlbums = new BehaviorSubject<Album[]>(null);

  private _lastFmApiKey='ea840f8b2593aebe7317b39734a186ba';

 
  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) { }

  /////////////////////////////////////////////////
  // Get Albums from firebase

  getAlbum(clubId: string, sessionId: string, albumID: string): Observable<Album> {
    this.albumsCollection = this.afs.collection<Album>('clubs/' + clubId + '/sessions/' + sessionId + '/albums');
    return this.albumsCollection.doc<Album>(albumID).valueChanges().pipe(
      take(1),
      map(album => {
        album.id = albumID;
        return album
      })
    );
  }

  getAlbums(clubId, sessionId): Observable<Album[]> {

    this.albumsCollection = this.afs.collection<Album>('clubs/'+ clubId + '/sessions/' + sessionId + '/albums');

      this.albums$ = this.albumsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.albums$;
  }

  getAllAlbums(): Observable<Album[]> {
    // this.id = id;
    // this.sessionid = sessionid;
    this.allAlbumsCollection = this.afs.collectionGroup<Album>('albums');

      this.allAlbums$ = this.allAlbumsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.allAlbums$;
  }

  getTopRatedAlbums(): Observable<Album[]>{
    this.albumsTopRatedCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('scoreAverage', '==', 10));
    this.albumsTopRated$ = this.albumsTopRatedCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  return this.albumsTopRated$;
  }

  getRandomAlbum(): Observable<Album[]>{
    var random = Math.floor((Math.random() * 5000));
    this.albumsRandomCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('randomizedId', '>=', random).limit(1));
    this.albumsRandom$ = this.albumsRandomCollection.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ),
    retry(5);
  return this.albumsRandom$;
  }


  // Filtered Albums

  getAlbumsOfWeek(): Observable<Album[]> {
    this.albumsOfWeekCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('albumOfWeek', '==', true));

    this.albumsOfWeek$ = this.albumsOfWeekCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.albumsOfWeek$;
  }

  getAlbumsByUser(): Observable<Album[]> {
    let item = 
    this.albumsOfWeekCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('albumOfWeek', '==', true));

    this.albumsOfWeek$ = this.albumsOfWeekCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.albumsOfWeek$;
  }

  getAlbumsArtist(filterItem:string): Observable<Album[]> {
  
    this.albumsByArtistCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('name', '==', filterItem));

    this.albumsByArtist$ = this.albumsByArtistCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    // this.setAlbumFilters(this.albumsByArtist$);
    return this.albumsByArtist$;
  }

  setAllAlbumsStore(value:any){
    this._allAlbums.next(value);
  }

  getAllAlbumsStore(){
    return this._allAlbums.asObservable();
  }

  setAlbumFilters(value:any){
    this._filteredAlbums.next(value);
  }

  getAlbumFilters(){
    return this._filteredAlbums.asObservable();
  }

  // Temp Update Albums

  updateData(albumId, data: any): Promise<void> { 
    return this.albumsCollection.doc(albumId).update({ 
      randomizedId: data.randomizedId,
     
    });
  }

  /////////////////////////////////////////////////
  // Get Itunes Album Data

  lookupAlbum(critiria): Observable<any>{
    return this.http.get<Observable<any>>(`https://itunes.apple.com/lookup?id=${critiria}&entity=song&limit=100`);
  }

  /////////////////////////////////////////////////
  // Get Last FM Data

  getLastFmData(artistName: string, albumName: string): Observable<any> {
    return this.http.get<Observable<any>>(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${this._lastFmApiKey}&artist=${artistName}&album=${albumName}&format=json`)
  };

   /////////////////////////////////////////////////
  // Music Brainz Data

  getMBRelease(mbId): Observable<any>{
    return this.http.get<Observable<any>>(`http://musicbrainz.org/ws/2/release/${mbId}?inc=artist-credits+labels+discids+recordings`);
  }

  /////////////////////////////////////////////////
  // Audio DB Data

  getAudioDbAlbum(artistName: string, albumName: string): Observable<any> {
    console.log(artistName);
    return this.http.get<any>(`https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${artistName}&a=${albumName}`)
  };
  


 
}
