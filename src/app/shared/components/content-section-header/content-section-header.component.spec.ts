import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionHeaderComponent } from './content-section-header.component';

describe('ContentSectionHeaderComponent', () => {
  let component: ContentSectionHeaderComponent;
  let fixture: ComponentFixture<ContentSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSectionHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
