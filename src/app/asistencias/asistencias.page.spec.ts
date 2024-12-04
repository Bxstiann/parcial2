import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AsistenciasPage } from './asistencias.page';
import { HttpClientModule } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs';

describe('AsistenciasPage', () => {
  let component: AsistenciasPage;
  let fixture: ComponentFixture<AsistenciasPage>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;

  beforeEach(async () => {
    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);

    const fakeToast: Partial<HTMLIonToastElement> = {
      present: jasmine.createSpy('present')
    };

    toastSpy.create.and.returnValue(Promise.resolve(fakeToast as HTMLIonToastElement));

    await TestBed.configureTestingModule({
      declarations: [AsistenciasPage],
      imports: [HttpClientModule],
      providers: [
        { provide: ToastController, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciasPage);
    component = fixture.componentInstance;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should handle error when fetching data', fakeAsync(async () => {
    spyOn(component['http'], 'get').and.returnValue(throwError('Error'));

    // Llamamos a la función para cargar las asistencias
    component.cargarAsistencias();

    // Simulamos el paso del tiempo para esperar la respuesta asincrónica
    tick();

    // Detectamos los cambios del componente después de la operación asincrónica
    fixture.detectChanges();

    // Verificamos que el ToastController haya sido llamado con el mensaje de error
    expect(toastControllerSpy.create).toHaveBeenCalledWith({
      message: 'Error al cargar las asistencias.',
      color: 'danger',
      duration: 1200,
      position: 'middle',
    });

    // Verificamos que el toast haya sido mostrado
    expect((await toastControllerSpy.create()).present).toHaveBeenCalled();
  }));

  it('should toggle detalles correctly', () => {
    const testAsignatura = {
      asignaturaId: '1',
      asignaturaName: 'Matemáticas',
      fecha: '2024-12-04',
      asistencias: [],
      mostrarDetalles: false
    };

    component.asignaturas = [testAsignatura];

    component.toggleDetalle(0);
    expect(component.asignaturas[0].mostrarDetalles).toBeTrue();

    component.toggleDetalle(0);
    expect(component.asignaturas[0].mostrarDetalles).toBeFalse();
  });
});
