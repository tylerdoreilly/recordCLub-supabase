import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsTopRatedComponent } from './albums-top-rated.component';

describe('AlbumsTopRatedComponent', () => {
  let component: AlbumsTopRatedComponent;
  let fixture: ComponentFixture<AlbumsTopRatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsTopRatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsTopRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
