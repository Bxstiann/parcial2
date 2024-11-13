import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing } from '@capacitor-mlkit/barcode-scanning';
CUSTOM_ELEMENTS_SCHEMA

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  scanResult= '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async startScann() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: "barcode-scanning-modal",
    showBackdrop: false,
    componentProps: { 
      formats : [],
      LensFacing: LensFacing.Back
     }
    });
  
    await modal.present();

    const {data}= await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }
  
  }

}
