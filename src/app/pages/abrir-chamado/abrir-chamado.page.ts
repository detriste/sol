import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DadosMockService } from '../../services/dados-mock.service';
import { ValidacaoService } from '../../services/validacao.service';
import { Maquina, Funcionario, Chamado } from '../../models';

@Component({
  selector: 'app-abrir-chamado',
  templateUrl: './abrir-chamado.page.html',
  styleUrls: ['./abrir-chamado.page.scss'],
})
export class AbrirChamadoPage implements OnInit {
  maquina?: Maquina;
  tipoSelecionado: 'PREVENTIVA/PREDITIVA' | 'CORRETIVA' | 'PRONTO ATENDIMENTO' = 'PREVENTIVA/PREDITIVA';
  descricao: string = '';
  funcionarios: Funcionario[] = [];
  funcionariosSelecionados: number[] = [];
  alocacao: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dadosService: DadosMockService,
    private validacaoService: ValidacaoService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const ordemServico = this.route.snapshot.paramMap.get('ordemServico');
    if (ordemServico) {
      const maquinas = this.dadosService.getMaquinas();
      this.maquina = maquinas.find(m => m.ordemServico === ordemServico);
    }
    this.carregarFuncionarios();
    this.atualizarAlocacao();
  }

  carregarFuncionarios() {
    this.funcionarios = this.dadosService.getFuncionarios();
  }

  atualizarAlocacao() {
    this.alocacao = this.dadosService.getAlocacaoPorTipo();
  }

  toggleFuncionario(numero: number) {
    const index = this.funcionariosSelecionados.indexOf(numero);
    
    if (index > -1) {
      this.funcionariosSelecionados.splice(index, 1);
    } else {
      // Verifica se pode adicionar
      const validacao = this.validacaoService.validarAlocacao(
        this.tipoSelecionado,
        this.funcionariosSelecionados.length + 1
      );
      
      if (validacao.valido) {
        this.funcionariosSelecionados.push(numero);
      } else {
        this.mostrarAlerta('Limite Atingido', validacao.mensagem);
      }
    }
  }

  isSelecionado(numero: number): boolean {
    return this.funcionariosSelecionados.includes(numero);
  }

  podeSelecionar(numero: number): boolean {
    if (this.isSelecionado(numero)) return true;
    
    const validacao = this.validacaoService.validarAlocacao(
      this.tipoSelecionado,
      this.funcionariosSelecionados.length + 1
    );
    
    return validacao.valido;
  }

  async confirmarChamado() {
    if (this.funcionariosSelecionados.length === 0) {
      this.mostrarAlerta('Atenção', 'Selecione pelo menos um funcionário');
      return;
    }

    if (!this.descricao.trim()) {
      this.mostrarAlerta('Atenção', 'Informe a descrição do chamado');
      return;
    }

    const funcionariosObj = this.funcionarios.filter(f => 
      this.funcionariosSelecionados.includes(f.numero)
    );

    const chamado: Chamado = {
      id: `CH${Date.now()}`,
      maquina: this.maquina!,
      tipo: this.tipoSelecionado,
      descricao: this.descricao,
      funcionarios: funcionariosObj,
      dataAbertura: new Date(),
      status: 'ABERTO'
    };

    this.dadosService.adicionarChamado(chamado);
    
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Chamado aberto com sucesso!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/gestao-chamados']);
        }
      }]
    });

    await alert.present();
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  voltar() {
    this.router.navigate(['/lista-maquinas']);
  }

  getPercentualAlocado(tipo: string): number {
    if (!this.alocacao[tipo]) return 0;
    return (this.alocacao[tipo].atual / this.alocacao[tipo].maximo) * 100;
  }
}