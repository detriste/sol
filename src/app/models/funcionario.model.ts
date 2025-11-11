export interface Funcionario {
  numero: number;
  nome: string;
  area: 'Eletromecânicos' | 'Mecânico Geral' | 'Mecânico Embalagem' | 'Serviços Gerais';
  funcao: string;
  disponivel: boolean;
}