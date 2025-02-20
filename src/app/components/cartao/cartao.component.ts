import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { Router } from '@angular/router';
import { TarefasService } from '../../servicos/tarefas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartao',
  imports: [ModalComponent,CommonModule],
  templateUrl: './cartao.component.html',
  styleUrl: './cartao.component.css'
})
export class CartaoComponent {

  @Input() id: number = 0;
  @Input() codigo: string = "";
  @Input() titulo: string = "";
  @Input() dataCriacao: string = "";
  @Input() autor: string = "";
  @Input() tipo: string = "";
  @Input() responsavel: string = "";
  @Output() selecaoTarefaId = new EventEmitter<number>();
  exibirModal: boolean = false;


  constructor(private router: Router, private tarefaservice: TarefasService) { }



  abrirModalExclusao(): void {
    this.exibirModal = true;
  }

  editarTarefa(): void {
    this.router.navigate(['editarTarefa', this.id]);
  }

  fecharModalExclusao(): void {
    this.exibirModal = false;
  }

  executarExclusao(): void {
    this.tarefaservice.excluirTarefa(this.id).subscribe((resposta) => {
      alert("Tarefa excluída com sucesso!");
      this.fecharModalExclusao();
      window.location.reload();
    }, (erro) => {
      alert("Erro ao excluir tarefa: " + erro);
    })
  }
}



