import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, map, from} from 'rxjs';
import { SupabaseService } from "../../../../shared/services/supabase.service";
import { MembersService } from '../../../../shared/services/members.service';

@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
  styleUrls: ['./session-add.component.scss']
})
export class SessionAddComponent implements OnInit {

  public addSessionForm: FormGroup;
  public seasons$: Observable<any>;
  public members$: Observable<any>;

  constructor(
    private _supabaseService: SupabaseService,
    private _membersService: MembersService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ) { }

  ngOnInit(): void {
    this.createAddSessionForm();
    this.onValueChanges();
    this.getData();
  }

  getData(){
    this.seasons$ = from(this._supabaseService.getSBSeasons()).pipe(
      map((seasons:any) =>{
        const newSet = seasons.data;
        return Array.from(newSet).map((x:any) => ({
          displayName: x.title,
          id:x.id
        }));    
      })
    )

    this.members$ = this._membersService.getMembers().pipe(
      map((members:any)=>{
        const membersList = members.data;
        return membersList.map(x => ({
          id: x.id,
          displayName: x.displayName,
        }));            
      })    
    )
  }

  createAddSessionForm(){
    this.addSessionForm = this._fb.group({ 
      clubId:[1],
      title: [''], 
      week:[''],
      theme: [''], 
      season: [''],
      sessionId: [''],
      startDate: [''], 
      endDate: [''], 
      meetupDate: [''], 
      meetupTime: [''],
      bracketeer: [''],  
    })
  }

  onValueChanges(){
    this.addSessionForm.get('week').valueChanges.subscribe(x =>{
      const title = "Week " + x.toString();
      this.addSessionForm.get('title').patchValue(title);
      this.addSessionForm.get('sessionId').patchValue(x);       
    });
  }

  formSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('clubId', form.value.clubId);
    console.log('title', form.value.title);
    console.log('week', form.value.week);
    console.log('season', form.value.season);
    console.log('theme', form.value.theme);
    console.log('startDate', form.value.startDate);
    console.log('endDate', form.value.endDate);
    console.log('meetupDate', form.value.meetupDate);
    console.log('meetupTime', form.value.meetupTime);

    if (! this.addSessionForm.valid) {
      return false;
    } else {
      this.addSession();
    }
  }

  addSession() {
    const value = this.addSessionForm.value;
    this._supabaseService.createSBSession(value)
    // this._sessionsService.addSession(this.clubId, this.SessionForm.get('session').value).then((res) => {
    //   const session = res;
    //   const sessionId = session.id;
    //   this.router.navigate(['/club/' + this.clubId + '/session-view/' + sessionId]);
    // })
    // .catch(error => console.log(error));    
  }

  //////////////////////////////////
  /// Members

  // getMembers(){
  //   this._membersService.getMembers()
  //   .pipe(
  //     map((members:any)=>{
  //       const membersList = members.data;
  //       return membersList.map(x => ({
  //         id: x.id,
  //         displayName: x.displayName,
  //       }));            
  //     })    
  //   )
  //   .subscribe(members =>{
  //     this.members = members;
  //     console.log('members',this.members)
  //   });
  // }

}
