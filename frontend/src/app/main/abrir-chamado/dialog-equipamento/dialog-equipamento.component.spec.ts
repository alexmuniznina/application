import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEquipamentoComponent } from './dialog-equipamento.component';

describe('DialogEquipamentoComponent', () => {
  let component: DialogEquipamentoComponent;
  let fixture: ComponentFixture<DialogEquipamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEquipamentoComponent]
    });
    fixture = TestBed.createComponent(DialogEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
