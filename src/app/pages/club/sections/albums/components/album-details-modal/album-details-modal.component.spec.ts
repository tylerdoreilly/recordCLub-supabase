import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailsModalComponent } from './album-details-modal.component';

describe('AlbumDetailsModalComponent', () => {
  let component: AlbumDetailsModalComponent;
  let fixture: ComponentFixture<AlbumDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
