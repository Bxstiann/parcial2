import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'; // Importar firstValueFrom

// Definición de la interfaz para la clase dictada
interface ClaseDictada {
  asignaturaId: string;
  asignaturaNombre: string;
  docenteId: string;
  fecha: string;
  id?: string; // El id de Firebase, que es opcional
}

@Component({
  selector: 'app-clases-dictadas',
  templateUrl: './clases-dictadas.page.html',
  styleUrls: ['./clases-dictadas.page.scss'],
})
export class ClasesDictadasPage implements OnInit {
  userId: string | null = null;
  clasesDictadas: ClaseDictada[] = []; // Array para almacenar las clases dictadas

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId'); // Obtén el userId del docente logueado

    if (!this.userId) {
      this.router.navigate(['/login']); // Si no hay userId, redirigir al login
    } else {
      this.loadClasesDictadas(); // Cargar las clases dictadas solo si el docente está logueado
    }
  }

  async loadClasesDictadas() {
    try {
      const response = await firstValueFrom(
        this.http.get<{ [key: string]: ClaseDictada }>(`https://bd-progra-9976e-default-rtdb.firebaseio.com/clasesDictadas.json`)
      );
  
      if (response) {
        // Filtramos las clases para que solo se muestren las del docente actual
        this.clasesDictadas = Object.keys(response)
          .filter(key => response[key].docenteId === this.userId) // Filtrar por docenteId
          .map(key => ({
            ...response[key],  // Obtenemos la clase
            id: key  // Agregamos el id de Firebase como propiedad
          }));
      } else {
        this.clasesDictadas = [];
        console.warn('No se encontraron clases dictadas.');
      }
    } catch (error) {
      console.error('Error al cargar las clases dictadas:', error);
    }
  }
}
