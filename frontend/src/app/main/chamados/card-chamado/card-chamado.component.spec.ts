import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChamadoComponent } from './card-chamado.component';

describe('CardChamadoComponent', () => {
  let component: CardChamadoComponent;
  let fixture: ComponentFixture<CardChamadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardChamadoComponent]
    });
    fixture = TestBed.createComponent(CardChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
