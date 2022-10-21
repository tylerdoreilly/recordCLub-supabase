import { Component, ContentChild, OnInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { ControlContainer, FormGroup,FormArray,FormControl, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms'
import { startWith, map, debounceTime, distinctUntilChanged, pairwise, filter } from 'rxjs/operators';
import { AlbumsService } from '../../../../shared/services/albums.service';

@Component({
  selector: 'filter-group',
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.scss']
})
export class FilterGroupComponent implements OnInit {
  
  public filtersForm: FormGroup;
  @Output() emitFilters = new EventEmitter<any>();

  constructor(
    private _fb: FormBuilder,
    private _albumsService:AlbumsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this. valueChanges();
  }

  public createForm(){
    this.filtersForm = this._fb.group({});
    console.log('filters Form', this.filtersForm)
  }

  public valueChanges(){
    this.filtersForm.valueChanges.pipe(
      pairwise(),
      map(([oldState, newState]) => {
        let changes:any = {};
        for (const key in newState) {
          if (oldState[key] != newState[key] && 
              oldState[key] != undefined) {
            changes[key] = newState[key];
          }
        }
        return changes;
      }),
      filter(changes => Object.keys(changes).length !== 0 && !this.filtersForm.invalid)
    ).subscribe(
      value => {
        const flatten=(obj) => Object.values(obj).flat();
        let ty = flatten(value)
        console.log("Form has changed:", value);
       this.emitFilters.emit(ty)
      }
    );
  }

}
