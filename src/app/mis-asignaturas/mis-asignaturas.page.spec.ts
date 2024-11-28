import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { MisAsignaturasPage } from './mis-asignaturas.page';

describe('MisAsignaturasPage', () => {
  let component: MisAsignaturasPage;
  let fixture: ComponentFixture<MisAsignaturasPage>;
  let httpMock: HttpTestingController;
  let alertCtrl: AlertController;
  let toastCtrl: ToastController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisAsignaturasPage],
      imports: [HttpClientTestingModule, RouterTestingModule, IonicModule.forRoot()],
      providers: [AlertController, ToastController],
    }).compileComponents();

    fixture = TestBed.createComponent(MisAsignaturasPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    alertCtrl = TestBed.inject(AlertController);
    toastCtrl = TestBed.inject(ToastController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and filter user-specific asignaturas (estudiante)', () => {
    const mockAsignaturas = [
      { id: 1, nombre: 'Matemáticas', estudiantesId: [1], docenteId: 2 },
      { id: 2, nombre: 'Historia', estudiantesId: [2], docenteId: 3 },
    ];

    localStorage.setItem('userType', 'estudiante');
    localStorage.setItem('userId', '1');

    component.ngOnInit();

    const req = httpMock.expectOne('https://my-json-server.typicode.com/dedcodex27800/registrapp/asignaturas');
    req.flush(mockAsignaturas);

    expect(component.userAsignaturas.length).toBe(1);
    expect(component.userAsignaturas[0].nombre).toBe('Matemáticas');
  });

  it('should load and filter user-specific asignaturas (docente)', () => {
    const mockAsignaturas = [
      { id: 1, nombre: 'Matemáticas', estudiantesId: [1], docenteId: 2 },
      { id: 2, nombre: 'Historia', estudiantesId: [2], docenteId: 3 },
    ];

    localStorage.setItem('userType', 'docente');
    localStorage.setItem('userId', '2');

    component.ngOnInit();

    const req = httpMock.expectOne('https://my-json-server.typicode.com/dedcodex27800/registrapp/asignaturas');
    req.flush(mockAsignaturas);

    expect(component.userAsignaturas.length).toBe(1);
    expect(component.userAsignaturas[0].nombre).toBe('Matemáticas');
  });

  it('should show a toast when class is registered', async () => {
    spyOn(toastCtrl, 'create').and.returnValue(
      Promise.resolve({
        present: () => Promise.resolve(),
      } as any)
    );

    await component.mostrarToast('Clase registrada exitosamente.');

    expect(toastCtrl.create).toHaveBeenCalledWith({
      message: 'Clase registrada exitosamente.',
      color: 'success',
      duration: 1200,
      position: 'middle',
    });
  });
});
