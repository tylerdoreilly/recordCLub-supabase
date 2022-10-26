import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSingleDetailsComponent } from './album-single-details.component';

describe('AlbumSingleDetailsComponent', () => {
  let component: AlbumSingleDetailsComponent;
  let fixture: ComponentFixture<AlbumSingleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumSingleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumSingleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
