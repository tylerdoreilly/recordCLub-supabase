import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder,FormArray, } from '@angular/forms';
import { Observable, of, combineLatest, BehaviorSubject, switchMap, map,mergeMap,from } from 'rxjs';
import { AlbumsService } from '../../../../../../shared/services/albums.service';
import { UtilityService } from '../../../../../../shared/services/utility.service';
import { SupabaseService } from '../../../../../../shared/services/supabase.service';
import { MembersService } from '../../../../../../shared/services/members.service';

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'scores-add',
  templateUrl: './scores-add.component.html',
  styleUrls: ['./scores-add.component.scss']
})
export class ScoresAddComponent implements OnInit {
  public scoresForm: FormGroup;
  public members;
  averageScore: number;

  constructor(
    private _fb: FormBuilder,
    private _albumsService: AlbumsService,
    private _utilityService: UtilityService,
    private _supabaseService: SupabaseService,
    private _membersService : MembersService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ) { }

  ngOnInit(): void {  
    this.createAlbumForm();
    this.onValueChanges();
  }

  createAlbumForm():void{
    this.scoresForm = this._fb.group({
     scores: this._fb.array([])
    });

    this._membersService.getMembers()
    .pipe(
      map((members:any)=>{
        const membersList = members.data;
        return membersList.map(x => ({
          score: '',
          memberId: x.id,
          displayName: x.displayName,
          sessionId: this.data.sessionId,
          albumId: this.data.albumId,
        }));            
      })    
    )
    .subscribe(members =>{
      this.members = members;
      this.members.forEach(element => {
        this.scores.push(this._fb.group(element))
      })
      console.log('members',this.members)
    });
   
    console.log(this.scores)
  }

  get scores() : FormArray {
    return this.scoresForm.get("scores") as FormArray
  }

  newScore(): FormGroup {
    return this._fb.group({
      score: '',
      memberId: '',
      albumId:'',
      sessionId:'',
    })
  }

  onValueChanges(){
    this.scoresForm.get('scores').valueChanges.subscribe(values => {
      resolvedPromise.then(() => {
        this.averageScore = this.getAverageScore(values);
      });
    })
    console.log(`The average is: ${this.averageScore}`);
  }

  onSubmit(){}

  getAverageScore(memberScores){
    let sum = 0;
    memberScores.forEach(element => {
      sum += element.score;
    });
    const avg = (sum / memberScores.length) || 0;
    return Math.round(avg * 10) / 10;

    
  }

  addScores(){
    const value = this.scoresForm.get('scores').value;
    console.log('scores', value)
    this._supabaseService.addScores(value, this.averageScore, this.data.albumId)
     
  }
 

}
