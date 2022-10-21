import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTwoColComponent } from './content-two-col.component';

describe('ContentTwoColComponent', () => {
  let component: ContentTwoColComponent;
  let fixture: ComponentFixture<ContentTwoColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTwoColComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTwoColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
