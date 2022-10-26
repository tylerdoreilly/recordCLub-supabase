import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumVersionsComponent } from './album-versions.component';

describe('AlbumVersionsComponent', () => {
  let component: AlbumVersionsComponent;
  let fixture: ComponentFixture<AlbumVersionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumVersionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
