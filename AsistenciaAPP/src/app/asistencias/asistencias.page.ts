import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  asistencias = [
    { asignatura: "Arquitectura",
      fecha: "23-09-2024",
      estado: "Presente",
    },
    { asignatura: "Calidad de software",
      fecha: "24-09-2024",
      estado: "Ausente",
    },
    { asignatura: "Estadistica descriptiva",
      fecha: "25-09-2024",
      estado: "Presente",
    },
    { asignatura: "Etica para el trabajo",
      fecha: "30-09-2024",
      estado: "Presente",
    },
    { asignatura: "Programacion movil",
      fecha: "25-09-2024",
      estado: "Presente",
    },


  ]

  constructor() { }

  ngOnInit() {
  }

}
