import { TestBed, inject } from '@angular/core/testing';

import { PscAuthService } from './psc-auth.service';

describe('PscAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PscAuthService]
    });
  });

  it('should be created', inject([PscAuthService], (service: PscAuthService) => {
    expect(service).toBeTruthy();
  }));
});
