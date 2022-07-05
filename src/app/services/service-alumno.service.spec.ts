import { TestBed } from '@angular/core/testing';

import { ServiceAlumnoService } from './service-alumno.service';

describe('ServiceAlumnoService', () => {
  let service: ServiceAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
