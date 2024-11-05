import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {


  asignaturas = [
    { codigo: "ASY4131",
      nombre: "Arquitectura",
      seccion: "001D",
    },
    { codigo: "CSY4111",
      nombre: "Calidad de software",
      seccion: "001D",
    },
    { codigo: "MAT4140",
      nombre: "Estadistica descriptiva",
      seccion: "001D",
    },
    { codigo: "EAY4450",
      nombre: "Etica para el trabajo",
      seccion: "002D",
    },
    { codigo: "PGY4121",
      nombre: "Programacion movil",
      seccion: "001D",
    },


  ]
  constructor() { }

  ngOnInit() {
  }

}
