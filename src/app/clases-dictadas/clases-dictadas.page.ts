import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'; // Importar firstValueFrom

@Component({
  selector: 'app-clases-dictadas',
  templateUrl: './clases-dictadas.page.html',
  styleUrls: ['./clases-dictadas.page.scss'],
})
export class ClasesDictadasPage implements OnInit {
  userId: string | null = null;
  clasesDictadas: any[] = []; // Array para almacenar las clases dictadas

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
        this.http.get<any[]>(`https://bd-progra-9976e-default-rtdb.firebaseio.com/clasesDictadas.json?docenteId=${this.userId}`)
      );

      if (response && Array.isArray(response)) {
        this.clasesDictadas = response; // Almacena las clases obtenidas
      } else {
        this.clasesDictadas = []; // Si no hay datos o la respuesta no es válida
        console.warn('No se encontraron clases dictadas.');
      }
    } catch (error) {
      console.error('Error al cargar las clases dictadas:', error);
    }
  }
}
