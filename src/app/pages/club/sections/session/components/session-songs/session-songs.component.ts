import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'session-songs',
  templateUrl: './session-songs.component.html',
  styleUrls: ['./session-songs.component.scss']
})
export class SessionSongsComponent implements OnInit {

  @Input() songs;
  public draggable = false;
  @Output() someEvent = new EventEmitter();

  public songsList: any[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('songs',this.songs)
  }

  ngOnChanges(){
    console.log('is draggable',this.draggable);
    this.songsList = this.songs;
    if(this.draggable === true && this.songsList){
      this.songs.forEach(song => {
        song.disabled = false;
      });
    }else if(this.draggable === false && this.songsList){
      this.songs.forEach(song => {
        song.disabled = true;
      });
    }
    console.log('updated songs',this.songsList)
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    const itemData = event.container.data;

    itemData.forEach((item, index) =>{
      item.position['roundOne'] = index + 1;
    });

    console.log('update',itemData);
  }

  setOrder(){
    this.draggable = true;
    this.songsList = this.songs;
    if(this.draggable === true && this.songsList){
      this.songs.forEach(song => {
        song.disabled = false;
      });
    }
    else{
      this.songs.forEach(song => {
        song.disabled = true;
      });
    }
    console.log('updated songs',this.songsList)
  }

  cancelOrder(){
    if(this.draggable === true && this.songsList){
      this.songs.forEach(song => {
        song.disabled = true;
      });
      this.draggable = false;
    }
    this.someEvent.emit(this.draggable);
  }

  saveOrder(){
    this.songsList.forEach(song =>{
      // this._albumsService.updateSongs(song.id, song)
    });
    this.someEvent.emit(this.draggable);
  }

}
