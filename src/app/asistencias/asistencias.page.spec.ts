import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { AsistenciasPage } from './asistencias.page';
=======
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AsistenciasPage } from './asistencias.page';
import { ToastController } from '@ionic/angular';
>>>>>>> main

describe('AsistenciasPage', () => {
  let component: AsistenciasPage;
  let fixture: ComponentFixture<AsistenciasPage>;
<<<<<<< HEAD

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
  let httpMock: HttpTestingController;
  let toastController: jasmine.SpyObj<ToastController>;

  beforeEach(async () => {
    toastController = jasmine.createSpyObj('ToastController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [AsistenciasPage],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ToastController, useValue: toastController }],
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciasPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'userId') return '1'; // Simula el userId
      return null;
    });
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no haya solicitudes pendientes
  });

  it('should create the component and load asistencias', () => {
    // Llama al ngOnInit para ejecutar la lógica de inicialización
    component.ngOnInit();

    // Verifica la solicitud HTTP
    const req = httpMock.expectOne(
      'https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencias?estudianteId=1'
    );
    expect(req.request.method).toBe('GET');

    // Responde con datos simulados
    const mockAsistencias = [
      { asignaturaId: 1, asignaturaName: 'Matemáticas', estado: 'Presente', fecha: '2024-11-28' },
    ];
    req.flush(mockAsistencias);

    // Verifica que los datos se cargaron correctamente en el componente
    expect(component.asistencias).toEqual(mockAsistencias);
  });

  it('should handle API errors gracefully', () => {
    component.ngOnInit();

    const req = httpMock.expectOne(
      'https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencias?estudianteId=1'
    );
    expect(req.request.method).toBe('GET');

    // Simula un error en la API
    req.error(new ErrorEvent('Network error'));

    // Verifica que el componente maneje el error
    expect(component.asistencias).toEqual([]);
  });
});
>>>>>>> main
