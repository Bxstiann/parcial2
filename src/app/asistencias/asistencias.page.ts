import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  asistencias: any[] = [];
  userId: string | null = null;

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.cargarAsistencias(); // Cargar las asistencias cuando la página se inicializa
  }

  // Método para cargar asistencias desde la base de datos
  cargarAsistencias() {
    const estudianteId = localStorage.getItem('userId');
    this.http.get<any[]>(`http://localhost:3000/asistencias?estudianteId=${estudianteId}`).subscribe(
      (data) => {
        this.asistencias = data;
      },
      (error) => {
        console.error('Error al cargar asistencias:', error);
      }
    );
  }

  // Método para mostrar un mensaje de notificación
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: 'success',
      duration: 1200,
      position: 'middle',
    });
    await toast.present();
  }
}
