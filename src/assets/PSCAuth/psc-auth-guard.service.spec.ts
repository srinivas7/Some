import { TestBed, inject } from '@angular/core/testing';

import { PscAuthGuardService } from './psc-auth-guard.service';

describe('PscAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PscAuthGuardService]
    });
  });

  it('should be created', inject([PscAuthGuardService], (service: PscAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
