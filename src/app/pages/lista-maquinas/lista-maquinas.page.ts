import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosMockService } from '../../services/dados-mock.service';
import { Maquina } from '../../models/maquina.model';

@Component({
  selector: 'app-lista-maquinas',
  templateUrl: './lista-maquinas.page.html',
  styleUrls: ['./lista-maquinas.page.scss'],
})
export class ListaMaquinasPage implements OnInit {
  maquinas: Maquina[] = [];

  constructor(
    private dadosService: DadosMockService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarMaquinas();
  }

  carregarMaquinas() {
    this.maquinas = this.dadosService.getMaquinas();
  }

  abrirChamado(ordemServico: string) {
    this.router.navigate(['/abrir-chamado', ordemServico]);
  }

  irParaGestao() {
    this.router.navigate(['/gestao-chamados']);
  }
}