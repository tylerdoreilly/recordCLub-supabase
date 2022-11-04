import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreCollectionGroup,
  DocumentReference } from '@angular/fire/compat/firestore';

//Models
import { Member } from '../models/members';
import { Group } from '../models/groups';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private membersCollection: AngularFirestoreCollection<Member>;
  private groupsCollection: AngularFirestoreCollection<Group>;
  private usersCollection: AngularFirestoreCollection<User>;
  public members$: Observable<Member[]>;
  public groups$: Observable<Group[]>;
  public users$: Observable<User[]>;

  private _members = new BehaviorSubject<any>(null);
  public members = this._members.asObservable();

  constructor(
    private afs: AngularFirestore
  ) { }

  // getMembers(clubId): Observable<Member[]> {

  //   this.membersCollection = this.afs.collection<Member>('clubs/'+ clubId + '/members');

  //     this.members$= this.membersCollection.snapshotChanges().pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  //   return this.members$;
  // }

  // getGroups(clubId): Observable<Group[]> {

  //   this.groupsCollection = this.afs.collection<Group>('clubs/'+ clubId + '/groups');

  //     this.groups$= this.groupsCollection.snapshotChanges().pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  //   return this.groups$;
  // }

  // getUsers(): Observable<User[]> {
  //   this.usersCollection = this.afs.collection<User>('users');

  //     this.users$= this.usersCollection.snapshotChanges().pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  //   return this.users$;
  // }

  setMembers(value:any){
    this._members.next(value);
  }

  getMembers(){
    return this.members;
  }
}
