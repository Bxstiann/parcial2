import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Suponiendo que la URL base del API es https://my-json-server.typicode.com/dedcodex27800/registrapp/db
=======
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Importa el operador map

>>>>>>> main
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
<<<<<<< HEAD
  private apiUrl = 'https://my-json-server.typicode.com/dedcodex27800/registrapp/users'; // URL de la API de usuarios (o tu archivo JSON)
=======
  private apiUrl = 'https://bd-progra-9976e-default-rtdb.firebaseio.com/users'; // Asegúrate que este path sea correcto
>>>>>>> main

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
<<<<<<< HEAD
    return this.http.get<any[]>(this.apiUrl);
=======
    return this.http.get<any>(`${this.apiUrl}.json`).pipe(
      map((data: any) => data ? Object.values(data) : []), // Especifica el tipo de 'data'
      catchError(this.manejarError) // Manejo de errores
    );
>>>>>>> main
  }

  // Método para actualizar la contraseña de un usuario
  actualizarContraseña(id: string, nuevaClave: string): Observable<any> {
<<<<<<< HEAD
    return this.http.patch(`${this.apiUrl}/${id}`, { password: nuevaClave });
=======
    return this.http.patch(`${this.apiUrl}/${id}.json`, { password: nuevaClave }).pipe(
      catchError(this.manejarError) // Manejo de errores
    );
  }

  // Método para manejar errores de las solicitudes HTTP
  private manejarError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
    }

    // Mostrar el mensaje de error en la consola
    console.error(errorMessage);

    // Retornar un observable con el mensaje de error
    return throwError(() => new Error(errorMessage));
>>>>>>> main
  }
}
