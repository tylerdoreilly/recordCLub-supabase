import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {
  public club_id: any;
  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.club_id = this.actRoute.snapshot.paramMap.get('id');
  }

}
