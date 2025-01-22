import { Component } from '@angular/core';
import { CartaoComponent } from '../../components/cartao/cartao.component';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";

@Component({
  selector: 'app-home',
  imports: [CartaoComponent, CabecalhoComponent, RodapeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
