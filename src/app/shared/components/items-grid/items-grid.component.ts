import { Component, OnInit, Input,TemplateRef, ContentChildren, QueryList, AfterContentInit, ContentChild,ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'items-grid',
  templateUrl: './items-grid.component.html',
  styleUrls: ['./items-grid.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ItemsGridComponent implements OnInit {

  @Input() items:any;
  @ContentChild('gridCard',{static: false}) gridCardTemplateRef: TemplateRef<any>;

  public gridColumns = 3;
  public percent;
  constructor() { }

  ngOnInit(): void {
    let testty = this.isWhatPercentOf(100, 4).toString();
    this.percent = testty + "%"
    console.log(this.percent)
  }

  isWhatPercentOf(numA, numB) {
    return (numA / numB);
  }

  

}
