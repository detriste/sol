import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestaoChamadosPage } from './gestao-chamados.page';

describe('GestaoChamadosPage', () => {
  let component: GestaoChamadosPage;
  let fixture: ComponentFixture<GestaoChamadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoChamadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
