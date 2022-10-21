import { Component, OnInit, Input,TemplateRef, ContentChildren, QueryList, AfterContentInit, ContentChild  } from '@angular/core';

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  @Input() items:any;
  @Input() size:string;
  @ContentChild('header',{static: false}) headerTemplateRef: TemplateRef<any>;
  @ContentChild('listIcon',{static: false}) listIconTemplateRef: TemplateRef<any>;
  @ContentChild('body',{static: false}) bodyTemplateRef: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
