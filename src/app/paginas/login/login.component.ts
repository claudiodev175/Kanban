import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import necessário para navegação programática
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa FormsModule
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    FormsModule, CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Deve ser "styleUrls" (plural)
})
export class LoginComponent {
  loginForm: FormGroup
  usuario = {
    email: "",
    senha: "",
    manterConectado: false
  }

  erro: string = "";

  constructor(

    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', 
        [Validators.required, 
        Validators.minLength(6), 
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/)]],
        manterConectado: true
    })
  }

  fazerLogin(): void {
    if (this.loginForm.invalid) {
      this.erro = "Por favor, preencha os campos corretamente.";
      return;
    }

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