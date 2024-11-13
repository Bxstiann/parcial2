import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  asistencias: any[] = []; // Array para almacenar asistencias cargadas desde la base de datos
  userId: string | null = null;

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId'); // Obtener el ID del estudiante
    this.loadAsistencias(); // Cargar las asistencias del estudiante al iniciar la página
    this.cargarAsistencias();
  }

  // Método para cargar asistencias desde la base de datos
  loadAsistencias() {
    if (this.userId) {
      this.http.get<any[]>(`http://localhost:3000/asistencias?estudianteId=${this.userId}`).subscribe(
        (data) => {
          this.asistencias = data; // Asignar las asistencias obtenidas al array asistencias
        },
        (error) => {
          console.error('Error al cargar asistencias:', error);
        }
      );
    }
  }

  // Método para registrar asistencia desde el escaneo de QR en la página 'camara'
  registrarAsistencia(asignaturaId: string) {
    const nuevaAsistencia = {
      estudianteId: this.userId,
      asignaturaId: asignaturaId,
      fecha: new Date().toISOString(), // Fecha actual en formato ISO
      estado: 'Presente'
    };

    // Guardar la asistencia en la base de datos
    this.http.post('http://localhost:3000/asistencias', nuevaAsistencia).subscribe(
      async (response) => {
        this.asistencias.push(nuevaAsistencia); // Añadir al array local para mostrar en la lista
        this.mostrarToast('Asistencia registrada exitosamente');
      },
      (error) => {
        console.error('Error al registrar la asistencia:', error);
        this.mostrarToast('Error al registrar la asistencia');
      }
    );
  }

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

  // Método para mostrar un mensaje de notificación en pantalla
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
