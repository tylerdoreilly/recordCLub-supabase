import { Component, ViewChild, EventEmitter, Output, OnInit, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll,switchMap, finalize } from 'rxjs/operators';

//services
import { AlbumsService } from '../../../../../shared/services/albums.service';

@Component({
  selector: 'album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.scss']
})
export class AlbumSearchComponent implements OnInit {
  @Output() loading = new EventEmitter();
  @Output() results = new EventEmitter();
  @Input() parentForm: FormGroup;

  public searchMoviesCtrl = new FormControl();
  public filteredMovies: any;
  public isLoading = false;
  public errorMsg: string;

  constructor(
    private _albumsService: AlbumsService,
    public fb: FormBuilder,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value), // extract the value of the input
      filter(text => text.length > 1), // filter out if empty
      debounceTime(500), // only once every 500ms
      tap(() => this.loading.emit(true)), // enable loading
      map((query: string) => this._albumsService.searchAlbums(query)), // search
      switchAll()) // produces values only from the most recent inner sequence ignoring previous streams
      .subscribe(  // act on the return of the search
        _results => {
          this.loading.emit(false);
          this.results.emit(_results);
          // this.blah = _results;
          // console.log(this.blah)
        },
        err => {
          console.log(err);
          this.loading.emit(false);
        },
        () => {
          this.loading.emit(false);
        }
      );

    // this.searchMoviesCtrl.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     tap(() => {
    //       this.errorMsg = "";
    //       this.filteredMovies = [];
    //       this.isLoading = true;
    //     }),
    //     switchMap(value => this._albumsService.searchAlbums(value)
    //       .pipe(
    //         finalize(() => {
    //           this.isLoading = false
    //         }),
    //       )
    //     )
    //   )
    //   .subscribe(data => {
    //     if (data == undefined) {
    //       this.errorMsg = data['Error'];
    //       this.filteredMovies = [];
    //     } else {
    //       this.errorMsg = "";
    //       this.filteredMovies = data.results;
    //     }

    //     console.log(this.filteredMovies);
    //   });
  }

  /////////////////////////////////////////////////
  /// Filter Controls

  resetFilter(){
    this.parentForm.get('artist').setValue('');
    this.results.emit('');
   }

}
