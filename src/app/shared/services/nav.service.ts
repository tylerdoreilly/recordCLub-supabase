import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map,switchMap, take } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavService {

  // Nav Id Data Stores
  private _clubId = new BehaviorSubject<any>(null);
  private _sessionId = new BehaviorSubject<any>(null);

  constructor() { }

  setClubId(value:any){
    this._clubId.next(value);
  }

  getClubId(){
    return this._clubId.asObservable();
  }

  setSessionId(value:any){
    this._sessionId.next(value);
  }

  getSessionId(){
    return this._sessionId.asObservable();
  }
}
