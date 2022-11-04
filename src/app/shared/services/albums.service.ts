import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map,switchMap, take, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Album } from '../models/album';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  // Data Stores
  private _allAlbums = new BehaviorSubject<Album[]>(null);
  private _filteredAlbums = new BehaviorSubject<Album[]>(null);

  private _lastFmApiKey='ea840f8b2593aebe7317b39734a186ba';

  
 
  constructor(
    private http: HttpClient
  ) { }

  /////////////////////////////////////////////////
  // Get Albums from Supabase



  // Filtered Albums

  // getAlbumsOfWeek(): Observable<Album[]> {
  //   this.albumsOfWeekCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('albumOfWeek', '==', true));

  //   this.albumsOfWeek$ = this.albumsOfWeekCollection.snapshotChanges().pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  //   return this.albumsOfWeek$;
  // }

  // getAlbumsByUser(): Observable<Album[]> {
  //   let item = 
  //   this.albumsOfWeekCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('albumOfWeek', '==', true));

  //   this.albumsOfWeek$ = this.albumsOfWeekCollection.snapshotChanges().pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  //   return this.albumsOfWeek$;
  // }

  // getAlbumsArtist(filterItem:string): Observable<Album[]> {
  
  //   this.albumsByArtistCollection = this.afs.collectionGroup<Album>('albums', ref => ref.where('name', '==', filterItem));

  //   this.albumsByArtist$ = this.albumsByArtistCollection.snapshotChanges().pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  //   // this.setAlbumFilters(this.albumsByArtist$);
  //   return this.albumsByArtist$;
  // }

  // setAllAlbumsStore(value:any){
  //   this._allAlbums.next(value);
  // }

  // getAllAlbumsStore(){
  //   return this._allAlbums.asObservable();
  // }

  // setAlbumFilters(value:any){
  //   this._filteredAlbums.next(value);
  // }

  // getAlbumFilters(){
  //   return this._filteredAlbums.asObservable();
  // }

  // Temp Update Albums

  // updateData(albumId, data: any): Promise<void> { 
  //   return this.albumsCollection.doc(albumId).update({ 
  //     randomizedId: data.randomizedId,
     
  //   });
  // }

  /////////////////////////////////////////////////
  // Get Itunes Album Data

  lookupAlbum(critiria): Observable<any>{
    return this.http.get<Observable<any>>(`https://itunes.apple.com/lookup?id=${critiria}&entity=song&limit=100`);
  }

  searchAlbums(critiria): Observable<any> {
    return this.http.get<Observable<any>>(`https://itunes.apple.com/search?term=${critiria}&attribute=artistTerm&entity=album&limit=100`);
  }

  searchSongs(critiria): Observable<any> {
    return this.http.get<Observable<any>>(`https://itunes.apple.com/search?term=${critiria}&attribute=artistTerm&entity=song&limit=100`);
  }


  /////////////////////////////////////////////////
  // Get Last FM Data

  getLastFmData(artistName: string, albumName: string): Observable<any> {
    return this.http.get<Observable<any>>(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${this._lastFmApiKey}&artist=${artistName}&album=${albumName}&format=json`)
  };

  getLastFmAlbumById(artistMBID?: string): Observable<any> {
    return this.http.get<Observable<any>>(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid=${artistMBID}&api_key=${this._lastFmApiKey}&format=json`)
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

  /////////////////////////////////////////////////
  // Discogs

  getDiscogsRelease(id:number): Observable<any>{
    return this.http.get<any>(`https://api.discogs.com/masters/${id}`)
  }
  
  getDiscogsReleaseVersions(id:number): Observable<any>{
    return this.http.get<any>(`https://api.discogs.com/masters/${id}/versions`, {
      headers: {'Content-Type':'application/json','Authorization':'Discogs key=WyjWetuEyBteuiyCywsC, secret=ekbVQoJtxUSgqueJYtJUfEoqjJezrUmj'}
   })
  }


  /////////////////////////////////////////////////
  // Wiki Data

  getWikiData(id):Observable<any>{
    return this.http.get<Observable<any>>(`http://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&format=json&origin=*`)
  }

   // WIKIPEDIA
  getWikiAlbum(albumName: string): Observable<any>{ 
    return this.http.get<any>(`https://en.wikipedia.org/w/api.php?action=parse&page=${albumName}&prop=text&formatversion=2&format=json&origin=*`)
  }

  getWikiSections(albumName: string): Observable<any>{ 
    return this.http.get<any>(`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${albumName}&prop=sections&formatversion=2&origin=*`)
  }

  getWikiSection(albumName: string, sectionIndex): Observable<any>{ 
    return this.http.get<any>(`https://en.wikipedia.org/w/api.php?action=parse&page=${albumName}&prop=text&section=${sectionIndex}&formatversion=2&format=json&origin=*`)
  }

  getWikiCredits(albumName: string): Observable<any>{ 
    return this.http.get<any>(`https://en.wikipedia.org/w/api.php?action=parse&page=${albumName}&prop=text&section=18&formatversion=2&format=json&origin=*`)
  }

  getWikiTrackNotes(albumName: string): Observable<any>{ 
    return this.http.get<any>(`https://en.wikipedia.org/w/api.php?action=parse&page=${albumName}&prop=text&section=17&formatversion=2&format=json&origin=*`)
  }

 
}
