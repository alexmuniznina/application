import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaInfoComponent } from './empresa-info.component';

describe('CriarChamadoComponent', () => {
  let component: EmpresaInfoComponent;
  let fixture: ComponentFixture<EmpresaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaInfoComponent],
    });
    fixture = TestBed.createComponent(EmpresaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
