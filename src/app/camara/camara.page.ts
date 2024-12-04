import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  scanResult: string = '';
  asignaturaId: string = '';
  asignaturaName: string = '';
  lastScanTimestamp: number = 0;
  html5QrCodeScanner: Html5QrcodeScanner | null = null;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.startScanner();
  }

  startScanner() {
    if (this.html5QrCodeScanner) {
      console.warn('El escáner ya está inicializado.');
      return;
    }

    this.html5QrCodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: 250 },
      false
    );

    this.html5QrCodeScanner.render(
      (qrCodeMessage) => {
        if (!qrCodeMessage) {
          console.error('QR vacío o inválido.');
          this.mostrarToast('Código QR no válido.', 'danger');
          return;
        }
        this.scanResult = qrCodeMessage;
        this.asignaturaId = this.extractAsignaturaId(qrCodeMessage);
        if (this.asignaturaId) {
          this.getAsignaturaName(this.asignaturaId).then(() => {
            this.registrarAsistencia(this.asignaturaId, this.asignaturaName);
          });
        } else {
          this.mostrarToast('No se pudo extraer el ID de la asignatura.', 'danger');
        }
        this.html5QrCodeScanner?.clear();
      },
      (errorMessage) => {
        console.log('Error en el escaneo:', errorMessage);
      }
    );
  }

  extractAsignaturaId(qrData: string): string {
    try {
      const urlParts = qrData.split('/');
      return urlParts[urlParts.length - 1] || '';
    } catch (error) {
      console.error('Error al extraer el ID de la asignatura:', error);
      return '';
    }
  }

  async getAsignaturaName(asignaturaId: string): Promise<void> {
    try {
      const response = await this.httpClient
        .get<{ nombre: string } | null>(
          `https://bd-progra-9976e-default-rtdb.firebaseio.com/asignaturas/${asignaturaId}.json`
        )
        .toPromise();

      if (response && response.nombre) {
        this.asignaturaName = response.nombre;
      } else {
        throw new Error('Asignatura no encontrada');
      }
    } catch (error) {
      console.error('Error al obtener la asignatura:', error);
      this.mostrarToast('Asignatura no encontrada o error en la red.', 'danger');
    }
  }

  registrarAsistencia(asignaturaId: string, asignaturaName: string) {
    const estudianteId = localStorage.getItem('userId');
    if (estudianteId) {
      this.httpClient
        .get<{ [key: string]: any }>('https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencias.json')
        .subscribe((data) => {
          const keys = Object.keys(data || {}).map(Number); // Convertir claves a números
          const newId = keys.length > 0 ? Math.max(...keys) + 1 : 0; // Incrementar la última clave
  
          const nuevaAsistencia = {
            id: newId,
            estudianteId: estudianteId,
            asignaturaId: asignaturaId,
            asignaturaName: asignaturaName || 'Sin Nombre',
            fecha: new Date().toISOString(),
            estado: 'Presente',
          };
  
          this.httpClient
            .put(`https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencias/${newId}.json`, nuevaAsistencia)
            .subscribe(
              async () => {
                this.router.navigate(['/asistencias']);
                this.mostrarToast('Asistencia registrada exitosamente');
              },
              (error: any) => {
                console.error('Error al registrar la asistencia:', error);
                this.mostrarToast('Error al registrar la asistencia');
              }
            );
        });
    } else {
      this.mostrarToast('No se encontró un ID de estudiante válido.');
    }
  }
  
  

  async mostrarToast(mensaje: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      color: color,
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
  }
}
