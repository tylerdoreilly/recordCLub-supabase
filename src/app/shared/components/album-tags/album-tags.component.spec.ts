import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumTagsComponent } from './album-tags.component';

describe('AlbumTagsComponent', () => {
  let component: AlbumTagsComponent;
  let fixture: ComponentFixture<AlbumTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
