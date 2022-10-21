import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsOfWeekListComponent } from './albums-of-week-list.component';

describe('AlbumsOfWeekListComponent', () => {
  let component: AlbumsOfWeekListComponent;
  let fixture: ComponentFixture<AlbumsOfWeekListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsOfWeekListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsOfWeekListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
