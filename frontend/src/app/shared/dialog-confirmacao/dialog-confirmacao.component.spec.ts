import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmacaoComponent } from './dialog-confirmacao.component';

describe('DialogConfirmacaoComponent', () => {
  let component: DialogConfirmacaoComponent;
  let fixture: ComponentFixture<DialogConfirmacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmacaoComponent]
    });
    fixture = TestBed.createComponent(DialogConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
