import { Component, OnInit } from '@angular/core';
import {RouterModule, ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
