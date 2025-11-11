import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { Maquina } from '../models/maquina.model';
import { Chamado } from '../models/chamado.model';


@Injectable({
  providedIn: 'root'
})
export class DadosMockService {
  
  // PREENCHA com os dados da sua tabela
  private funcionarios: Funcionario[] = [
    // ELETROMECÂNICOS
    { numero: 1, nome: 'NOME_DO_FUNCIONARIO_1', area: 'Eletromecânicos', funcao: 'FUNÇÃO', disponivel: true },
    // ... adicione todos os funcionários aqui
    
    // MECÂNICO GERAL
    { numero: 10, nome: 'NOME_DO_FUNCIONARIO_10', area: 'Mecânico Geral', funcao: 'FUNÇÃO', disponivel: true },
    // ...
    
    // MECÂNICO EMBALAGEM
    // ...
    
    // SERVIÇOS GERAIS
    // ...
  ];

  private maquinas: Maquina[] = [
    // PREENCHA com os dados da sua segunda tabela
    { ordemServico: 'OS001', descricao: 'Descrição da máquina', tipo: 'Tipo' },
    // ...
  ];

  private chamados: Chamado[] = [];

  constructor() { }

  // Métodos de acesso aos dados
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

  // Calcula alocação por tipo
  getAlocacaoPorTipo(): { [key: string]: { atual: number, maximo: number, percentual: number } } {
    const totalFuncionarios = this.funcionarios.length;
    const disponiveis = this.funcionarios.filter(f => f.disponivel).length;
    
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