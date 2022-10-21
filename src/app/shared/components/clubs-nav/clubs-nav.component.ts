import { Component, OnInit } from '@angular/core';
import {RouterModule, ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'clubs-nav',
  templateUrl: './clubs-nav.component.html',
  styleUrls: ['./clubs-nav.component.scss']
})
export class ClubsNavComponent implements OnInit {
  public club_id: any;
  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log( this.actRoute.snapshot.paramMap)
    this.club_id = this.actRoute.snapshot.paramMap.get('id');

    this.actRoute.params.subscribe(params => { 
      this.club_id = params['id']; 
      console.log(params)
    });
  }

}
