import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSubmittedBYComponent } from './album-submitted-by.component';

describe('AlbumSubmittedBYComponent', () => {
  let component: AlbumSubmittedBYComponent;
  let fixture: ComponentFixture<AlbumSubmittedBYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumSubmittedBYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumSubmittedBYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
