import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumScoresComponent } from './album-scores.component';

describe('AlbumScoresComponent', () => {
  let component: AlbumScoresComponent;
  let fixture: ComponentFixture<AlbumScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumScoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
