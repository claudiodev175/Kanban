import { Component, Input } from '@angular/core';
import { CartaoComponent } from '../../components/cartao/cartao.component';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { TarefasService } from '../../servicos/tarefas.service';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../interfaces/tarefa';
import { ModalComponent } from "../../components/modal/modal.component";


@Component({
  selector: 'app-home',
  imports: [CartaoComponent, CabecalhoComponent, RodapeComponent, CommonModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tarefas: Tarefa[] = [];
  tipoSelecionado: String = 'Todos';
  statuses = [
    'Registrada',
    'Análise Viabilidade',
    'Análise Priorização',
    'Em Execução',
    'Pronta para Homologação',
    'Aguardando Versão',
    'Reaberta'
  ]

  @Input()exibirModal = false;
  idTarefaASerExcluida: number = 0;

  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.tarefasService.listarTarefas().subscribe((tarefas) => {
      this.tarefas = tarefas;
    })
  }

  obterTarefaPorStatus(status: string): Tarefa[] {
    return this.tarefas.filter((tarefa) => {
      return tarefa.status === status &&
      (this.tipoSelecionado === 'Todos' || this.tipoSelecionado === tarefa.type)
    });
  }
 
  atualizarTipoSelecionado(novoTipo: string): void {
    this.tipoSelecionado = novoTipo;
  }


  selecionarTarefaASerExcluida(id: number): void{
    this.idTarefaASerExcluida = id;
  
  }


  confirmarExclusao(): void{
    this.exibirModal = true;
  }

  cancelarExclusao(): void{
    this.exibirModal = false;
  }

  executarExclusao(): void {
    if (!this.idTarefaASerExcluida) {
      alert("Erro: ID da tarefa não definido!");
      return;
    }
    this.tarefasService.excluirTarefa(this.idTarefaASerExcluida).subscribe((resposta) => {
      alert("Tarefa excluída com sucesso!");
      this.exibirModal = false;
      window.location.reload();
    }, (erro) => {
      alert("Erro ao excluir tarefa: " + erro);
    })
  }
}
