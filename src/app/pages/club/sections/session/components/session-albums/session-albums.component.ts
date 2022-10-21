import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumDetailsModalComponent } from '../../../albums/components/album-details-modal/album-details-modal.component';

@Component({
  selector: 'session-albums',
  templateUrl: './session-albums.component.html',
  styleUrls: ['./session-albums.component.scss']
})
export class SessionAlbumsComponent implements OnInit {

  @Input() albums;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('session albums',this.albums)
  }

  openDialog(value, tab) {
    this.dialog.open(AlbumDetailsModalComponent, {
      width: '40vw', 
      // height:'70vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      disableClose: true,
      data: {
        album: value,
        activeTab: tab
      },
    });
  }

}
