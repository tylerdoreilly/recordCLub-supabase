import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'album-scores',
  templateUrl: './album-scores.component.html',
  styleUrls: ['./album-scores.component.scss']
})
export class AlbumScoresComponent implements OnInit {

  @Input() albumScores
  @Input() average
  @Input() submittedBy;

  constructor() { }

  ngOnInit(): void {
    this.getSubmittedBy();
    console.log('scores', this.albumScores)
  }

  getSubmittedBy():void{
    const source = { submittedBy: 'Submitted By' };
    if(this.albumScores){
      const submitBy = this.albumScores.find(score => score.displayName == this.submittedBy.displayName);
      Object.assign(submitBy, source);
    }
   
  }

}
