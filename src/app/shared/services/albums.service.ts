import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map,switchMap, take, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

// Models
import { Album } from '../models/album';


@Injectable({
  providedIn: 'root'
})

export class AlbumsService {

  private supabase: SupabaseClient

  // Data Stores
  private _allAlbums = new BehaviorSubject<Album[]>(null);
  private _filteredAlbums = new BehaviorSubject<Album[]>(null);

  private _lastFmApiKey='ea840f8b2593aebe7317b39734a186ba';

  constructor(
    private http: HttpClient
  ) { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  /////////////////////////////////////////////////
  // Get Albums from Supabase

  async getSessionAlbums(value){
    const albums = await this.supabase
    .from('albums')
    .select('*, seasons(title,id), submittedBy(displayName,avatar,id)')
    .eq('sessionId', value)
  
    return albums.data || [];
   }
  
  async getAlbum(value){
    const album = await this.supabase
    .from('albums')
    .select('*, seasons(title,id), submittedBy(displayName,avatar,id)')
    .eq('id', value)

    return album.data[0] || [];
  }
  
  async createAlbum(data){
    const { error } = await this.supabase
      .from('albums')
      .insert(data)
  }
  
  async updateAlbumAvgScore(avgScore, albumId){
    const { error } = await this.supabase
    .from('albums')
    .update({ averageScore: avgScore })
    .eq('id', albumId)
  }

  async getAlbumsCount(){
    const count = await this.supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    return count
  }










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


  /////////////////////////////////////////////////
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
