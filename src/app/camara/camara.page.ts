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
  scanResult = '';
  asignaturaId: string = '';
  asignaturaName: string = '';
  lastScanTimestamp: number = 0;

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
    const html5QrCode = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    }, false);

    html5QrCode.render(
      (qrCodeMessage) => {
        this.scanResult = qrCodeMessage;
        this.asignaturaId = this.extractAsignaturaId(qrCodeMessage);
        this.getAsignaturaName(this.asignaturaId);
        html5QrCode.clear();
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  }

  extractAsignaturaId(qrData: string): string {
    const urlParts = qrData.split('/');
    return urlParts[urlParts.length - 1];
  }

  getAsignaturaName(asignaturaId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<{ nombre: string } | null>(`https://bd-progra-9976e-default-rtdb.firebaseio.com/asignaturas/${asignaturaId}.json`)
        .subscribe(
          (asignatura) => {
            if (asignatura && asignatura.nombre) {
              this.asignaturaName = asignatura.nombre;
              resolve();
            } else {
              this.mostrarToast('Asignatura no encontrada');
              reject('Asignatura no encontrada');
            }
          },
          (error) => {
            console.error('Error al obtener el nombre de la asignatura:', error);
            this.mostrarToast('Error al obtener la asignatura');
            reject(error);
          }
        );
    });
  }

  registrarAsistencia(asignaturaId: string, asignaturaName: string) {
    const estudianteId = localStorage.getItem('userId');
    if (estudianteId) {
      const nuevaAsistencia = {
        estudianteId: estudianteId,
        asignaturaId: asignaturaId,
        asignaturaName: asignaturaName,
        fecha: new Date().toISOString(),
        estado: 'Presente',
      };

      this.httpClient
        .post('https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencias.json', nuevaAsistencia)
        .subscribe(
          async (response: any) => {
            this.router.navigate(['/asistencias']);
            this.mostrarToast('Asistencia registrada exitosamente');
            localStorage.setItem(`lastScanTimestamp_${asignaturaId}`, new Date().getTime().toString());
          },
          (error: any) => {
            console.error('Error al registrar la asistencia:', error);
            this.mostrarToast('Error al registrar la asistencia');
          }
        );
    } else {
      this.mostrarToast('No se encontró un ID de estudiante válido.');
    }
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
}
