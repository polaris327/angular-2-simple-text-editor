import { TestBed, inject } from '@angular/core/testing';

import { SignalsService } from './signals.service';

describe('SignalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalsService]
    });
  });

  it('should be created', inject([SignalsService], (service: SignalsService) => {
    expect(service).toBeTruthy();
  }));
});
