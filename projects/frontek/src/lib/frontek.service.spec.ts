import { TestBed } from '@angular/core/testing';

import { FrontekService } from './frontek.service';

describe('FrontekService', () => {
  let service: FrontekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
