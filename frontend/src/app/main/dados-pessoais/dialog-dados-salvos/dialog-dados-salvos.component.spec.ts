import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDadosSalvosComponent } from './dialog-dados-salvos.component';

describe('DialogDadosSalvosComponent', () => {
  let component: DialogDadosSalvosComponent;
  let fixture: ComponentFixture<DialogDadosSalvosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDadosSalvosComponent]
    });
    fixture = TestBed.createComponent(DialogDadosSalvosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
