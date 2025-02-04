import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartao',
  imports: [],
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

  constructor(private router: Router) { }
  executarAcaoExclusao(): void{
    this.selecaoTarefaId.emit(this.id);
  }

  excluirTarefaId(id: number): void {
    this.selecaoTarefaId.emit(id);
  }

  editarTarefa(): void {
    this.router.navigate(['editarTarefa', this.id]);
  }
   
  }



