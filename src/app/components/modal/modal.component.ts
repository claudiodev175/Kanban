import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TarefasService } from '../../servicos/tarefas.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() titulo: string = "";
  @Input() subtitulo: string = "";
  @Input() textoBotao1: string = "";
  @Input() textoBotao2: string = "";
  @Input() acao1: any;
  @Input() acao2: any;
  @Output() cancelatAcaoExclusao = new EventEmitter<boolean>();


  constructor(private router: Router, private tarefasService: TarefasService) { }
  aoClicarBotao1(): void {
    if (this.acao1) {
      this.acao1()
    }
  }

  aoClicarBotao2(): void {
    if (this.acao2) {
      this.acao2()
    }
  }

  cancelarAcaoExclusao(): void {
    this.cancelatAcaoExclusao.emit(false);
  }

}
