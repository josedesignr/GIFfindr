import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsPanelComponent } from './gifs-panel.component';

describe('GifsPanelComponent', () => {
  let component: GifsPanelComponent;
  let fixture: ComponentFixture<GifsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GifsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
