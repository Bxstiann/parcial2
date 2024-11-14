import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Asegúrate de que el servicio sea provisto a nivel global
})
export class LoginService {
  private apiUrl = 'https://my-json-server.typicode.com/dedcodex27800/registrapp/users'; // URL de la API

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl);
  }
}
