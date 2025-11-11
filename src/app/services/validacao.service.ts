import { Injectable } from '@angular/core';
import { DadosMockService } from './dados-mock.service';

@Injectable({
  providedIn: 'root',
})
export class ValidacaoService {
  
  constructor(private dadosService: DadosMockService) {}

  validarAlocacao(tipo: string, quantidadeFuncionarios: number): { 
    valido: boolean; 
    mensagem: string 
  } {
    const podeAlocar = this.dadosService.podeAlocarFuncionario(tipo, quantidadeFuncionarios);
    
    if (!podeAlocar) {
      const alocacao = this.dadosService.getAlocacaoPorTipo();
      return {
        valido: false,
        mensagem: `Limite de ${alocacao[tipo].percentual}% atingido para ${tipo}. Máximo: ${alocacao[tipo].maximo} funcionários.`
      };
    }

    return {
      valido: true,
      mensagem: 'Alocação válida'
    };
  }

  getFuncionariosDisponiveis(tipo: string): number {
    const alocacao = this.dadosService.getAlocacaoPorTipo();
    return alocacao[tipo].maximo - alocacao[tipo].atual;
  }
}