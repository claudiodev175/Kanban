import { Component } from '@angular/core';
import { CartaoComponent } from '../../components/cartao/cartao.component';

@Component({
  selector: 'app-home',
  imports: [CartaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
