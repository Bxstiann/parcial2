import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD

@Injectable({
  providedIn: 'root',  // Asegúrate de que el servicio sea provisto a nivel global
})
export class LoginService {
  private apiUrl = 'https://my-json-server.typicode.com/dedcodex27800/registrapp/users'; // URL de la API
=======
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://bd-progra-9976e-default-rtdb.firebaseio.com/users.json'; // URL de Firebase para el nodo "users"
>>>>>>> main

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any[]> {
<<<<<<< HEAD
    return this.httpClient.get<any[]>(this.apiUrl);
=======
    // Convertimos el objeto de Firebase en un array
    return this.httpClient.get<any>(this.apiUrl).pipe(
      map((response) => {
        const usersArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            usersArray.push({ id: key, ...response[key] });
          }
        }
        return usersArray;
      })
    );
>>>>>>> main
  }
}
