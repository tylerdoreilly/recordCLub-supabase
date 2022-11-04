import { Component, OnInit, Input } from '@angular/core';
import { MembersService } from '../../../shared/services/members.service';
import { Observable, forkJoin, combineLatest, of, from, map} from 'rxjs';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'album-scores',
  templateUrl: './album-scores.component.html',
  styleUrls: ['./album-scores.component.scss']
})
export class AlbumScoresComponent implements OnInit {

  @Input() albumScores
  @Input() albumId
  @Input() average
  @Input() submittedBy;

  public scores$: Observable<any>
  public members;
  public averageScore: number;

  constructor(
    private _membersService: MembersService,
    private _supabaseService: SupabaseService,
    private _utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    // this.getSubmittedBy();
    this.getData();
  }

  getData(){
   this._membersService.getMembers().subscribe(members =>{
    this.members = members.data;
    console.log('members',this.members)
   });

   this.scores$ = from(this._supabaseService.getAlbumScores(this.albumId)).pipe(
    map((scores:any)=>{
      this.averageScore = this._utilityService.getAverageScore(scores);
      return scores ? scores : of(null)
    })
   )

  }

  // getSubmittedBy():void{
  //   const source = { submittedBy: 'Submitted By' };
  //   if(this.albumScores){
  //     const submitBy = this.albumScores.find(score => score.displayName == this.submittedBy.displayName);
  //     Object.assign(submitBy, source);
  //   }
   
  // }

}
