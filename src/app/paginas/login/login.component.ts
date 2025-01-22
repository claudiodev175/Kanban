import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import necessário para navegação programática
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  imports: [
    FormsModule ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Deve ser "styleUrls" (plural)
})
export class LoginComponent {
  router: Router = new Router;

  usuario = {
    email: "",
    senha : "",
    manterConectado: false
  }

  fazerLogin(): void {
    console.log(this.usuario)
   

    if (this.usuario.manterConectado) {
      localStorage.setItem('usuario_kanban', JSON.stringify(this.usuario))
    }

    sessionStorage.setItem('usuario_kanban', JSON.stringify(this.usuario))
    this.router.navigate(['/home']); 
  }

  
}