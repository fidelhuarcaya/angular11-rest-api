import { TestBed } from '@angular/core/testing';

import { ServiceImgService } from './service-img.service';

describe('ServiceImgService', () => {
  let service: ServiceImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
