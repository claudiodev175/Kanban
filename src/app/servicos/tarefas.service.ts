import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../interfaces/tarefa';


@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private readonly  API_URL = "http://localhost:5000/tarefas"

  constructor(private httpClient: HttpClient) { }

  listarTarefas(): Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(this.API_URL)
  }

  cadastrarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.API_URL, tarefa);
  }

  excluirTarefa(id: number): Observable<any> {
    return this.httpClient.delete<void>(this.API_URL + `/${id}`);
  }

  obterTarefa(id: number): Observable<Tarefa> {
    return this.httpClient.get<Tarefa>(this.API_URL + `/${id}`);
  }

  atualizarTarefa(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.put<Tarefa>(this.API_URL + `/${id}`, tarefa);
  }
}
