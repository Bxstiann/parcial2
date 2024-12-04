import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userType: string | null = null;
  userName: string | null = null;

  constructor(private router: Router, private toastController: ToastController) {}
  

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.userName = localStorage.getItem('userName');

    if (!this.userType) {
      this.router.navigate(['/login']);
    } else {
      this.showWelcomeToastIfNewLogin();
    }
  }

  async showWelcomeToastIfNewLogin() {
    const alreadyWelcomed = localStorage.getItem('alreadyWelcomed');
    
    if (!alreadyWelcomed) {
      const toast = await this.toastController.create({
        message: `Bienvenido, ${this.userName}!`,
        duration: 1000,
        position: 'bottom',
        color: 'tertiary',
      });
      await toast.present();

      localStorage.setItem('alreadyWelcomed', 'true'); // Marcar que ya se mostró el mensaje de bienvenida
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
