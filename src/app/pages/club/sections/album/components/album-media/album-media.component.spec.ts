import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMediaComponent } from './album-media.component';

describe('AlbumMediaComponent', () => {
  let component: AlbumMediaComponent;
  let fixture: ComponentFixture<AlbumMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
