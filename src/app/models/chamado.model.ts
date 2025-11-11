import { Funcionario } from "./funcionario.model";
import { Maquina } from "./maquina.model";

export interface Chamado {
  id: string;
  maquina: Maquina;
  tipo: 'PREVENTIVA/PREDITIVA' | 'CORRETIVA' | 'PRONTO ATENDIMENTO';
  descricao: string;
  funcionarios: Funcionario[];
  dataAbertura: Date;
  status: 'ABERTO' | 'EM_ANDAMENTO' | 'FINALIZADO';
}