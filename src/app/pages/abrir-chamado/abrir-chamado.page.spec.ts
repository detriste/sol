import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbrirChamadoPage } from './abrir-chamado.page';

describe('AbrirChamadoPage', () => {
  let component: AbrirChamadoPage;
  let fixture: ComponentFixture<AbrirChamadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirChamadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
