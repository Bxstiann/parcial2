import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clases-dictadas',
  templateUrl: './clases-dictadas.page.html',
  styleUrls: ['./clases-dictadas.page.scss'],
})
export class ClasesDictadasPage implements OnInit {
  userId: string | null = null;
  clasesDictadas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.cargarClasesDictadas();
  }

  cargarClasesDictadas() {
    this.http.get<any[]>(`http://localhost:3000/clasesDictadas?docenteId=${this.userId}`).subscribe(
      (data) => (this.clasesDictadas = data),
      (error) => console.error('Error al cargar clases dictadas:', error)
    );
  }
}
