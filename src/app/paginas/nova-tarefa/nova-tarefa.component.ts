import { Component, Input } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../servicos/usuarios.service';
import { CommonModule } from '@angular/common';
import { Status } from '../../interfaces/status';
import { StatusService } from '../../servicos/status.service';
import { TipoTarefa } from '../../interfaces/tipoTarefa';
import { TiposTarefaService } from '../../servicos/tipos-tarefa.service';
import { Tarefa } from '../../interfaces/tarefa';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefasService } from '../../servicos/tarefas.service';
import { ModalComponent } from "../../components/modal/modal.component";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nova-tarefa',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, FormsModule, ModalComponent,ReactiveFormsModule],
  templateUrl: './nova-tarefa.component.html',
  styleUrl: './nova-tarefa.component.css'
})
export class NovaTarefaComponent {
  novaTarefaForm: FormGroup
  usuarios: Usuario[] = [];
  statuses: Status[] = [];
  tipoTarefas: TipoTarefa[] = [];
  @Input() exibirModal = false;

  novaTarefa: Tarefa = {
    id: 0,
    title: '',
    created_on: '',
    author: '',
    type: '',
    status: '',
    assigned_to: ''
  }

  edicao: boolean = false;

  constructor(private usuarioservice: UsuariosService,
    private statusservice: StatusService,
    private tipotarefaservice: TiposTarefaService,
    private tarefaservice: TarefasService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.novaTarefaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['',[Validators.required,]],
      tipoTarefa:['',[Validators.required]],
      manterConectado: true
    })
  }

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

    this.route.paramMap.subscribe(parametros => {
      const id = Number(parametros.get('id'));
      if (id) {
        this.carregarDadosTarefa(id);
        this.edicao = true;
      }
    })
  }

  salvarTarefa(): void {
    if (this.novaTarefaForm.invalid) {
      alert("Preencha os campos obrigatórios");
      return;
    }
    if (this.novaTarefa.id !== 0) {
      this.tarefaservice.atualizarTarefa(this.novaTarefa.id, this.novaTarefa).subscribe(resposta => {
        alert("Tarefa atualizada com sucesso!");
        this.router.navigate(['home']);
      })
    } else {
      this.tarefaservice.cadastrarTarefa(this.novaTarefa).subscribe({
        next: (resposta) => {
          this.exibirModal = true;
        },
        error: (erro) => {
          alert('Erro ao cadastrar a tarefa:' + erro)
        }
      });
    }
  }

  redirecionarParaHome(): void {
    this.router.navigate(['/home']);
  }

  redirecionarParaNovaTarefa(): void {
    window.location.reload();
    this.router.navigate(['/novaTarefa']);
  }

  carregarDadosTarefa(id: number): void {
    this.tarefaservice.obterTarefa(id).subscribe((resposta) => {
      this.novaTarefa = resposta;
    });
  }

}
