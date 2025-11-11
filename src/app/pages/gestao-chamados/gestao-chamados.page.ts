import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosMockService } from '../../services/dados-mock.service';
import { Chamado } from '../../models';

@Component({
  selector: 'app-gestao-chamados',
  templateUrl: './gestao-chamados.page.html',
  styleUrls: ['./gestao-chamados.page.scss'],
})
export class GestaoChamadosPage implements OnInit {
  chamados: Chamado[] = [];
  alocacao: any = {};

  constructor(
    private dadosService: DadosMockService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarDados();
  }

  ionViewWillEnter() {
    this.carregarDados();
  }

  carregarDados() {
    this.chamados = this.dadosService.getChamados();
    this.alocacao = this.dadosService.getAlocacaoPorTipo();
  }

  voltar() {
    this.router.navigate(['/lista-maquinas']);
  }

  getPercentualAlocado(tipo: string): number {
    if (!this.alocacao[tipo]) return 0;
    return (this.alocacao[tipo].atual / this.alocacao[tipo].maximo) * 100;
  }

  getCorBarra(percentual: number): string {
    if (percentual < 50) return 'success';
    if (percentual < 80) return 'warning';
    return 'danger';
  }
}