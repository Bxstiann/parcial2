import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisAsignaturasPage } from './mis-asignaturas.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';  // Importar 'of' para crear observables si es necesario

describe('MisAsignaturasPage', () => {
  let component: MisAsignaturasPage;
  let fixture: ComponentFixture<MisAsignaturasPage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAsignaturasPage ],
      imports: [ HttpClientTestingModule ],  // Importa el módulo de pruebas para HTTP
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisAsignaturasPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);  // Inyecta el controlador de HTTP
  });

  afterEach(() => {
    httpMock.verify();  // Verifica que no haya peticiones pendientes
  });

  it('should load asignaturas successfully', () => {
    const mockAsignaturas = [
      { id: 1, nombre: 'Matemáticas', estudiantesId: [1, 2] },
      { id: 2, nombre: 'Física', estudiantesId: [3, 4] }
    ];

    // Llamar al método ngOnInit que debería disparar la carga de asignaturas
    component.ngOnInit();

    // Verificar que la petición HTTP se realiza correctamente
    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/asignaturas.json');
    expect(req.request.method).toBe('GET');  // Verificar que el método es GET
    req.flush(mockAsignaturas);  // Simular la respuesta exitosa con los datos mockeados

    // Verificar que las asignaturas fueron cargadas correctamente
    expect(component.asignaturas).toEqual(mockAsignaturas);
  });

  it('should handle error when loading asignaturas', () => {
    // Simular un error de la petición HTTP
    const mockError = 'Error loading asignaturas';

    // Llamar al método ngOnInit que debería disparar la carga de asignaturas
    component.ngOnInit();

    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/asignaturas.json');
    expect(req.request.method).toBe('GET');

    // Simular un error con el status 500 (Internal Server Error)
    req.flush(mockError, { status: 500, statusText: 'Server Error' });

    // Verificar que se haya manejado el error adecuadamente
    expect(component.asignaturas).toEqual([]);  // Asegúrate de que el componente no tenga asignaturas
  });

  it('should filter asignaturas for estudiante', () => {
    const mockAsignaturas = [
      { id: 1, nombre: 'Matemáticas', estudiantesId: [1, 2] },
      { id: 2, nombre: 'Física', estudiantesId: [3, 4] }
    ];

    // Llamar al método ngOnInit que debería disparar la carga de asignaturas
    component.ngOnInit();

    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/asignaturas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAsignaturas);  // Respuesta simulada

    // Suponiendo que 'estudianteID' es 1
    const estudianteId = 1;
    const asignaturasFiltradas = component.asignaturas.filter(asignatura =>
      asignatura.estudiantesId.includes(estudianteId)
    );

    // Verificar que la asignatura filtrada es la correcta
    expect(asignaturasFiltradas.length).toBe(1);
    expect(asignaturasFiltradas[0].nombre).toBe('Matemáticas');
  });

  it('should filter asignaturas for docente', () => {
    const mockAsignaturas = [
      { id: 1, nombre: 'Matemáticas', docentesId: [1, 2] },
      { id: 2, nombre: 'Física', docentesId: [3, 4] }
    ];

    // Llamar al método ngOnInit que debería disparar la carga de asignaturas
    component.ngOnInit();

    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/asignaturas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAsignaturas);  // Respuesta simulada

    // Suponiendo que 'docenteID' es 1
    const docenteId = 1;
    const asignaturasFiltradas = component.asignaturas.filter(asignatura =>
      asignatura.docentesId.includes(docenteId)
    );

    // Verificar que la asignatura filtrada es la correcta
    expect(asignaturasFiltradas.length).toBe(1);
    expect(asignaturasFiltradas[0].nombre).toBe('Matemáticas');
  });



  it('should create', () => {
    expect(component).toBeTruthy();  // Verificar que el componente se haya creado correctamente
  });
});
