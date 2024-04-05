import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorycardComponent } from './historycard.component';

describe('HistorycardComponent', () => {
  let component: HistorycardComponent;
  let fixture: ComponentFixture<HistorycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorycardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
