import { Component, OnInit, Input, SimpleChanges, Optional } from '@angular/core';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

// Models
import { filterItem } from '../../../../shared/models/filters';

@Component({
  selector: 'members-select',
  templateUrl: './members-select.component.html',
  styleUrls: ['./members-select.component.scss']
})
export class MembersSelectComponent implements OnInit {
  @Input() placeholder: string;
  @Input() filterTitle: string;
  @Input() filterItems: any;

  @Input() parentForm: FormGroup;
  @Input() formItemCustomName: string;

  public filteredOptions: Observable<filterItem[]> | undefined;
  public options:any;

  constructor(
    private _fb: FormBuilder,
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

   /////////////////////////////////////////////////
  /// Autocomplete Config

  // displayFn(option?: filterItem): any | undefined {
  //   return option ? option.displayName : undefined;
  // }
  displayFn(options: filterItem[]): (id: number) => string {
    return (id: number) => { 
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.displayName : '';
    }
  }

  getTitle(optionId: string) {
    return this.options.find(option => option.id === optionId).displayName;
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
