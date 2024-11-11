import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {
  userId: string | null = null;
  userType: string | null = null;
  asignaturas: any[] = []; // Array para almacenar todas las asignaturas
  userAsignaturas: any[] = []; // Array para almacenar las asignaturas filtradas por usuario
  asignaturaSeleccionadaId: number = 0;
  qrCodeData: string | null = null;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.userId = localStorage.getItem('userId');

    if (!this.userType || !this.userId) {
      this.router.navigate(['/login']); // Redirige al login si no hay usuario
    } else {
      this.loadAsignaturas(); // Cargar asignaturas solo si hay usuario logueado
    }
  }

  loadAsignaturas() {
    this.http.get<any[]>('http://localhost:3000/asignaturas').subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas;
        this.filterUserAsignaturas();
      },
      (error) => {
        console.error('Error al cargar las asignaturas:', error);
      }
    );
  }

  filterUserAsignaturas() {
    this.userAsignaturas = [];

    if (this.userType === 'estudiante') {
      const estudianteId = Number(this.userId);
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.estudiantesId.includes(estudianteId)
      );
    } else if (this.userType === 'docente') {
      const docenteId = Number(this.userId);
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.docenteId === docenteId
      );
    }

    this.userAsignaturas = this.userAsignaturas.map(asignatura => ({ ...asignatura, qrCodeData: '' }));
  }

  async generarQr(asignatura: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: 'Al generar un código QR, se registrará una clase dictada, ¿desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Generación de QR cancelada');
          },
        },
        {
          text: 'Sí',
          handler: () => {
            // Generar el QR y asignarlo a la asignatura específica
            asignatura.qrCodeData = `http://localhost:3000/asistencia/${asignatura.id}`;
            
            // Registrar la clase en la base de datos
            const nuevaClase = {
              asignaturaNombre: asignatura.nombre,
              asignaturaId: asignatura.id,
              docenteId: this.userId,
              fecha: new Date().toISOString() // Fecha y hora actual en formato ISO
            };
        
            this.http.post('http://localhost:3000/clasesDictadas', nuevaClase).subscribe(
              (response) => {
                console.log('Clase registrada exitosamente:', response);
              },
              (error) => {
                console.error('Error al registrar la clase:', error);
              }
            );
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  // Método para mostrar un mensaje de notificación en pantalla
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: "success",
      duration: 1200,
      position: 'middle',
    });
    await toast.present();
  }
  




  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
