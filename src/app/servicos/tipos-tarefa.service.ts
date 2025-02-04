import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoTarefa } from '../interfaces/tipoTarefa';
import { Observable } from 'rxjs';
import { Tarefa } from '../interfaces/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TiposTarefaService {
 private readonly  API_URL = "http://localhost:5000/tiposTarefa"

  constructor(private httpClient: HttpClient) { }

  listarTipoTarefa(): Observable<TipoTarefa[]>{
    return this.httpClient.get<TipoTarefa[]>(this.API_URL)
  }

}
