import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAllergyComponent } from './record-allergy.component';

describe('RecordAllergyComponent', () => {
  let component: RecordAllergyComponent;
  let fixture: ComponentFixture<RecordAllergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordAllergyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordAllergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
