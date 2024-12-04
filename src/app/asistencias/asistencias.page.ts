import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  asistencias: any[] = []; // Lista de asistencias filtradas
  userId: string | null = null; // ID del estudiante actual

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Obtener el ID del usuario almacenado localmente
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      console.log('ID del estudiante recuperado:', this.userId); // Verificar si se recupera el ID correctamente
      this.cargarAsistencias();
    } else {
      console.log('No se encontró un ID de usuario en el almacenamiento local');
      this.mostrarToast('Usuario no autenticado');
    }
  }

  // Método para cargar las asistencias desde Firebase
  cargarAsistencias() {
    this.http
      .get<{ [key: string]: any }>('https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencias.json')
      .subscribe(
        (data) => {
          if (data) {
            // Verifica si el objeto tiene propiedades y si estas son las asistencias
            const asistenciasArray = Object.values(data); // Extraemos el array de asistencias

            console.log('Asistencias obtenidas:', asistenciasArray); // Verificar asistencias obtenidas

            // Filtrar las asistencias que correspondan al estudiante actual
            this.asistencias = asistenciasArray.filter((asistencia) => {
              console.log(`Comparando estudianteId: ${asistencia.estudianteId} con userId: ${this.userId}`);

              // Asegurarnos de que ambos valores sean cadenas antes de compararlos
              return String(asistencia.estudianteId) === String(this.userId);
            });

            console.log('Asistencias filtradas:', this.asistencias); // Verificar asistencias filtradas
          } else {
            this.asistencias = []; // Si no hay datos, lista vacía
            console.log('No se encontraron asistencias.');
          }
        },
        (error) => {
          console.error('Error al cargar asistencias:', error);
          this.mostrarToast('Error al cargar las asistencias.');
        }
      );
  }

  // Método para mostrar un mensaje de error o éxito
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: 'danger',
      duration: 1200,
      position: 'middle',
    });
    await toast.present();
  }
}
