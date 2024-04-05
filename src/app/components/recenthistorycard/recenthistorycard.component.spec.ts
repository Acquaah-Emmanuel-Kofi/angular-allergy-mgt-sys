import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenthistorycardComponent } from './recenthistorycard.component';

describe('RecenthistorycardComponent', () => {
  let component: RecenthistorycardComponent;
  let fixture: ComponentFixture<RecenthistorycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecenthistorycardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecenthistorycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
