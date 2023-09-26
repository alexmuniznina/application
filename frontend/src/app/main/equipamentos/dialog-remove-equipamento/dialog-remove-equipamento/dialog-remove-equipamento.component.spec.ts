import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveEquipamentoComponent } from './dialog-remove-equipamento.component';

describe('DialogRemoveEquipamentoComponent', () => {
  let component: DialogRemoveEquipamentoComponent;
  let fixture: ComponentFixture<DialogRemoveEquipamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRemoveEquipamentoComponent]
    });
    fixture = TestBed.createComponent(DialogRemoveEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
