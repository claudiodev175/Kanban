import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tipoTarefa } from '../interfaces/tipoTarefa';
import { Observable } from 'rxjs';
import { Tarefa } from '../interfaces/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TiposTarefaService {
 private readonly  API_URL = 'http://localhost:5000/tiposTarefa'

  constructor(private httpClient: HttpClient) { }

  listarTipoTarefa(): Observable<tipoTarefa[]>{
    return this.httpClient.get<tipoTarefa[]>(this.API_URL)
  }

  cadastrarTarefa(tarefa: Tarefa): Observable<Tarefa>{
    return this.httpClient.post<Tarefa>(this.API_URL, tarefa);
  }
}
