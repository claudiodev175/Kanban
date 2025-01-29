import { Injectable } from '@angular/core';
import { Status } from '../interfaces/status';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
private readonly  API_URL = 'http://localhost:5000/statuses'

  constructor(private httpClient: HttpClient) { }

  listarStatus(): Observable<Status[]>{
    return this.httpClient.get<Status[]>(this.API_URL)
  }

}
