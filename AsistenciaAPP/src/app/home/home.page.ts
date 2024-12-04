import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userType: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtén el tipo de usuario desde localStorage
    this.userType = localStorage.getItem('userType');

    // Redirigir al login si no hay tipo de usuario
    if (!this.userType) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Limpiar el localStorage y redirigir al login
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
