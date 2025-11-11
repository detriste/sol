import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaMaquinasPage } from './lista-maquinas.page';

describe('ListaMaquinasPage', () => {
  let component: ListaMaquinasPage;
  let fixture: ComponentFixture<ListaMaquinasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMaquinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
