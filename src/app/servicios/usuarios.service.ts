import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Importa el operador map

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://bd-progra-9976e-default-rtdb.firebaseio.com/users'; // Asegúrate que este path sea correcto

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}.json`).pipe(
      map((data: any) => data ? Object.values(data) : []), // Convierte el objeto a un array de usuarios
      catchError(this.manejarError)
    );
  }

  // Método para actualizar la contraseña de un usuario
  actualizarContraseña(id: string, nuevaClave: string): Observable<any> {
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
  }
}
