import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { Maquina } from '../models/maquina.model';
import { Chamado } from '../models/chamado.model';

@Injectable({
  providedIn: 'root'
})
export class DadosMockService {
  
  private funcionarios: Funcionario[] = [
    // ELETROMECÂNICOS (4 funcionários)
    { numero: 1, nome: 'João Silva Santos', area: 'Eletromecânicos', funcao: 'Técnico Eletromecânico', disponivel: true },
    { numero: 2, nome: 'Pedro Henrique Costa', area: 'Eletromecânicos', funcao: 'Técnico Eletromecânico', disponivel: true },
    { numero: 3, nome: 'Carlos Alberto Souza', area: 'Eletromecânicos', funcao: 'Técnico Eletromecânico', disponivel: true },
    { numero: 4, nome: 'Roberto Oliveira Lima', area: 'Eletromecânicos', funcao: 'Técnico Eletromecânico Sr.', disponivel: true },
    
    // MECÂNICO GERAL (3 funcionários)
    { numero: 5, nome: 'Antonio Carlos Ferreira', area: 'Mecânico Geral', funcao: 'Mecânico Industrial', disponivel: true },
    { numero: 6, nome: 'José Eduardo Martins', area: 'Mecânico Geral', funcao: 'Mecânico Industrial', disponivel: true },
    { numero: 7, nome: 'Paulo Roberto Almeida', area: 'Mecânico Geral', funcao: 'Mecânico Industrial Sr.', disponivel: true },
    
    // MECÂNICO EMBALAGEM (2 funcionários)
    { numero: 8, nome: 'Lucas Fernando Pereira', area: 'Mecânico Embalagem', funcao: 'Técnico de Embalagem', disponivel: true },
    { numero: 9, nome: 'Rafael Augusto Gomes', area: 'Mecânico Embalagem', funcao: 'Técnico de Embalagem', disponivel: true },
    
    // SERVIÇOS GERAIS (1 funcionário)
    { numero: 10, nome: 'Marcos Antonio Ribeiro', area: 'Serviços Gerais', funcao: 'Auxiliar de Manutenção', disponivel: true },
  ];

  private maquinas: Maquina[] = [
    { ordemServico: 'OS001', descricao: 'Esteira Transportadora Principal', tipo: 'Transporte' },
    { ordemServico: 'OS002', descricao: 'Prensa Hidráulica 150T', tipo: 'Prensagem' },
    { ordemServico: 'OS003', descricao: 'Torno CNC Romi Centur 30D', tipo: 'Usinagem' },
    { ordemServico: 'OS004', descricao: 'Empilhadeira Elétrica Yale', tipo: 'Movimentação' },
    { ordemServico: 'OS005', descricao: 'Compressor Atlas Copco 30HP', tipo: 'Ar Comprimido' },
    { ordemServico: 'OS006', descricao: 'Máquina de Solda MIG/MAG 500A', tipo: 'Soldagem' },
    { ordemServico: 'OS007', descricao: 'Ponte Rolante 10 Toneladas', tipo: 'Movimentação' },
    { ordemServico: 'OS008', descricao: 'Máquina Empacotadora Automática', tipo: 'Embalagem' },
    { ordemServico: 'OS009', descricao: 'Fresadora Universal Ferramentaria', tipo: 'Usinagem' },
    { ordemServico: 'OS010', descricao: 'Caldeira Industrial 500kg/h', tipo: 'Vapor' },
  ];

  private chamados: Chamado[] = [];

  constructor() { }

  getFuncionarios(): Funcionario[] {
    return [...this.funcionarios];
  }

  getFuncionariosPorArea(area: string): Funcionario[] {
    return this.funcionarios.filter(f => f.area === area && f.disponivel);
  }

  getMaquinas(): Maquina[] {
    return [...this.maquinas];
  }

  getChamados(): Chamado[] {
    return [...this.chamados];
  }

  adicionarChamado(chamado: Chamado): void {
    this.chamados.push(chamado);
    // Marca funcionários como indisponíveis
    chamado.funcionarios.forEach(f => {
      const func = this.funcionarios.find(func => func.numero === f.numero);
      if (func) func.disponivel = false;
    });
  }

  getAlocacaoPorTipo(): { [key: string]: { atual: number, maximo: number, percentual: number } } {
    const totalFuncionarios = this.funcionarios.length;
    
    const preventiva = this.chamados
      .filter(c => c.tipo === 'PREVENTIVA/PREDITIVA')
      .reduce((acc, c) => acc + c.funcionarios.length, 0);
    
    const corretiva = this.chamados
      .filter(c => c.tipo === 'CORRETIVA')
      .reduce((acc, c) => acc + c.funcionarios.length, 0);
    
    const prontoAtendimento = this.chamados
      .filter(c => c.tipo === 'PRONTO ATENDIMENTO')
      .reduce((acc, c) => acc + c.funcionarios.length, 0);

    return {
      'PREVENTIVA/PREDITIVA': {
        atual: preventiva,
        maximo: Math.floor(totalFuncionarios * 0.5),
        percentual: 50
      },
      'CORRETIVA': {
        atual: corretiva,
        maximo: Math.floor(totalFuncionarios * 0.15),
        percentual: 15
      },
      'PRONTO ATENDIMENTO': {
        atual: prontoAtendimento,
        maximo: Math.floor(totalFuncionarios * 0.35),
        percentual: 35
      }
    };
  }

  podeAlocarFuncionario(tipo: string, quantidade: number): boolean {
    const alocacao = this.getAlocacaoPorTipo();
    return (alocacao[tipo].atual + quantidade) <= alocacao[tipo].maximo;
  }
}