import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import necessário para navegação programática
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AutenticacaoService } from '../../servicos/autenticacao.service';

@Component({
  imports: [
    FormsModule ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Deve ser "styleUrls" (plural)
})
export class LoginComponent {

  usuario = {
    email: "",
    senha : "",
    manterConectado: false
  }

  erro: string = "";

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  fazerLogin(): void {
    this.autenticacaoService.fazerLogin(this.usuario.email, this.usuario.senha).subscribe(resposta => {
      if (this.usuario.manterConectado) {
        localStorage.setItem('usuario_kanban', JSON.stringify(resposta));
      }
      sessionStorage.setItem('usuario_kanban', JSON.stringify(resposta));

      this.router.navigate(['home']);
    }, erro => {
      this.erro = erro.message;
    })

  }

  
}