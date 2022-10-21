import { Component, OnInit, Input, SimpleChanges, Optional } from '@angular/core';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FiltersService } from '../../../services/filters.service';
import { FilterGroupComponent } from '../filter-group/filter-group.component';

// Models
import { filterItem } from '../../../../shared/models/filters';

@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})

export class AutoCompleteComponent implements OnInit {
  @Input() placeholder: string;
  @Input() filterTitle: string;
  @Input() filterItems: any;

  @Input() parentForm: FormGroup;
  @Input() formItemCustomName: string;

  public filteredOptions: Observable<filterItem[]> | undefined;
  public options:any;

  constructor(
    private _fb: FormBuilder,
    private _filterService: FiltersService,
    @Optional() private parent:FilterGroupComponent
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.options = this.filterItems;
    // this.createFormControl();
    if(this.options){
      this.valueChanges();
    }
  }

  public valueChanges(){
    this.filteredOptions = this.parentForm?.get(this.formItemCustomName)?.valueChanges
    .pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map((value) => this._filter(value))
    );
  }

  // public createFormControl(): void{
  //   this.parentForm = this.parent.filtersForm;
  //   this.formItemCustomName = this._filterService.generateRandomKeys('autoComplete');
  //   this.parentForm.addControl(this.formItemCustomName, this._fb.control('')); 
  // }

  /////////////////////////////////////////////////
  /// Autocomplete Config

  displayFn(option?: filterItem): any | undefined {
    return option ? option.displayName : undefined;
  }
 
  private _filter(value: string): filterItem[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option:any) => option.displayName.toLowerCase().includes(filterValue));
  }


  /////////////////////////////////////////////////
  /// Filter Controls

  resetFilter(){
   this.parentForm.get( this.formItemCustomName).setValue('');
  }

}
