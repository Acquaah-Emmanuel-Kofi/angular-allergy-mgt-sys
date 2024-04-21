import { TestBed } from '@angular/core/testing';

import { AllergiesService } from './allergies.service';

describe('AllergiesService', () => {
  let service: AllergiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
