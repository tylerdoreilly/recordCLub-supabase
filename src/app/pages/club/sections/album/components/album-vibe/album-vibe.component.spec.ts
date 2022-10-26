import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumVibeComponent } from './album-vibe.component';

describe('AlbumVibeComponent', () => {
  let component: AlbumVibeComponent;
  let fixture: ComponentFixture<AlbumVibeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumVibeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumVibeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
