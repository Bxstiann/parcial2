import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  loadClasesDictadas() {
    // Hacemos la petición HTTP para obtener las clases dictadas por el docente
    this.http.get<any[]>(`https://my-json-server.typicode.com/dedcodex27800/registrapp/clasesDictadas?docenteId=${this.userId}`).subscribe(
      (clases) => {
        this.clasesDictadas = clases; // Almacenamos las clases obtenidas
      },
      (error) => {
        console.error('Error al cargar las clases dictadas:', error);
      }
    );
  }
}
