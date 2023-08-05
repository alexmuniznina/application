import { TestBed } from '@angular/core/testing';

import { EmpresasService } from './empresas.service';

describe('UsuariosService', () => {
  let service: EmpresasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
