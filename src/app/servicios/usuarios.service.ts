import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Suponiendo que la URL base del API es http://localhost:3000
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/users'; // URL de la API de usuarios (o tu archivo JSON)

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para actualizar la contraseña de un usuario
  actualizarContraseña(id: string, nuevaClave: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { password: nuevaClave });
  }
}
