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
  asignaturas: any[] = [];
  userAsignaturas: any[] = [];
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
      this.router.navigate(['/login']);
    } else {
      this.loadAsignaturas();
    }
  }

  loadAsignaturas() {
    this.http.get<any[]>('https://bd-progra-9976e-default-rtdb.firebaseio.com/asignaturas.json').subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas || [];
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
      const estudianteId = Number(this.userId); // Convertir userId a número
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.estudiantesId && asignatura.estudiantesId.includes(estudianteId)
      );
    } else if (this.userType === 'docente') {
      const docenteId = Number(this.userId); // Convertir userId a número
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.docenteId === docenteId
      );
    }

    this.userAsignaturas = this.userAsignaturas.map((asignatura, index) => ({
      ...asignatura,
      asignaturaNombre: index.toString(), // Asignamos el nombre como el índice numérico
      qrCodeData: ''
    }));
  }

  async generarQr(asignatura: any) {
    // Verificar clases previas para la asignatura
    this.http.get<any[]>(`https://bd-progra-9976e-default-rtdb.firebaseio.com/clasesDictadas.json?orderBy="asignaturaId"&equalTo="${asignatura.id}"`).subscribe(
      async (clases) => {
        const clasesFiltradas = Array.isArray(clases) ? clases : []; // Aseguramos que sea un arreglo
  
        // Obtener la fecha y hora de la clase más reciente
        if (clasesFiltradas.length > 0) {
          const ultimaClase = clasesFiltradas.reduce((latest, current) => {
            const currentDate = new Date(current.fecha);
            const latestDate = new Date(latest.fecha);
            return currentDate > latestDate ? current : latest;
          }, { fecha: '' });
  
          if (ultimaClase.fecha) {
            const ultimaFecha = new Date(ultimaClase.fecha);
            const fechaActual = new Date();
            const diferenciaHoras = (fechaActual.getTime() - ultimaFecha.getTime()) / (1000 * 3600);
  
            if (diferenciaHoras < 2) {
              this.mostrarToast('No se pueden registrar dos clases en menos de 2 horas.');
              return;
            }
          }
        }
  
        // Generar QR y registrar la clase
        const alert = await this.alertController.create({
          header: 'Confirmación',
          message: 'Al generar un código QR, se registrará una clase dictada, ¿desea continuar?',
          buttons: [
            { text: 'Cancelar', role: 'cancel' },
            { 
              text: 'Sí', 
              handler: () => {
                asignatura.qrCodeData = `https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencia/${asignatura.id}.json`;
  
                // Generar la nueva clase
                const nuevaClase = {
                  asignaturaId: asignatura.id,
                  asignaturaNombre: asignatura.nombre, // Nombre de la asignatura
                  docenteId: this.userId,
                  fecha: new Date().toISOString(),
                };

                // Guardar la clase en Firebase
                this.http.post('https://bd-progra-9976e-default-rtdb.firebaseio.com/clasesDictadas.json', nuevaClase).subscribe(
                  (response) => {
                    console.log('Clase registrada exitosamente:', response);
                    this.mostrarToast('Clase registrada y QR generado.');
                  },
                  (error) => {
                    console.error('Error al registrar la clase:', error);
                    this.mostrarToast('Error al registrar la clase.');
                  }
                );
              },
            },
          ],
        });
  
        await alert.present();
      },
      (error) => {
        console.error('Error al obtener las clases registradas:', error);
      }
    );
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: 'success',
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
