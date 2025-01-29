import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../servicos/usuarios.service';
import { CommonModule } from '@angular/common';
import { Status } from '../../interfaces/status';
import { StatusService } from '../../servicos/status.service';
import { tipoTarefa } from '../../interfaces/tipoTarefa';
import { TiposTarefaService } from '../../servicos/tipos-tarefa.service';
import { Tarefa } from '../../interfaces/tarefa';
import { FormsModule } from '@angular/forms';
import { TarefasService } from '../../servicos/tarefas.service';


@Component({
  selector: 'app-nova-tarefa',
  imports: [CabecalhoComponent, RodapeComponent,CommonModule, FormsModule],
  templateUrl: './nova-tarefa.component.html',
  styleUrl: './nova-tarefa.component.css'
})
export class NovaTarefaComponent {
  usuarios: Usuario[] = [];
  statuses: Status[] = [];
  tipoTarefas: tipoTarefa[] = [];

  novaTarefa: Tarefa = {
    id: 0,
    title: '',
    created_on: '',
    author: '',
    type: '',
    status: '',
    assigned_to: ''
  }

  constructor(private usuarioservice: UsuariosService, 
    private statusservice: StatusService, 
    private tipotarefaservice: TiposTarefaService,
    private tarefaservice: TarefasService) 
    {}

  ngOnInit(): void {
    this.usuarioservice.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });

    this.statusservice.listarStatus().subscribe((statuses) => {
      this.statuses = statuses;
    });

    this.tipotarefaservice.listarTipoTarefa().subscribe((tipoTarefas) => {
      this.tipoTarefas = tipoTarefas;
    });
  }

  salvarTarefa(): void{
    this.tarefaservice.cadastrarTarefa(this.novaTarefa).subscribe({
      next: (resposta) => {
        alert('Tarefa cadastrada com sucesso!' + resposta)
      },
      error: (erro) => {
        alert('Erro ao cadastrar a tarefa:'+ erro)
      }
    });
  }

}
