import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cabecalho',
  imports: [FontAwesomeModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  faPlus = faPlus;
  faSignOut = faSignOut;
  router: Router = new Router;
  @Output() selecaoTipo = new EventEmitter<string>();

  logOut(): void {
    localStorage.removeItem('usuario_kanban')
    sessionStorage.removeItem('usuario_kanban')
    this.router.navigate([''])
  }

  atualizarTipoSelecionado(tipo: string): void {
    this.selecaoTipo.emit(tipo);
  }
}
