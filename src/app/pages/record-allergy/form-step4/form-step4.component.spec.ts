import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStep4Component } from './form-step4.component';

describe('FormStep4Component', () => {
  let component: FormStep4Component;
  let fixture: ComponentFixture<FormStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStep4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
