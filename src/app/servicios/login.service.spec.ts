import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Para espiar solicitudes HTTP
import { LoginService } from './login.service'; // El servicio que vas a probar

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController; // Para controlar las peticiones HTTP

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo para pruebas HTTP
      providers: [LoginService] // Inyecta el servicio que deseas probar
    });
    service = TestBed.inject(LoginService); // Obtén la instancia del servicio
    httpMock = TestBed.inject(HttpTestingController); // Obtén el controlador de solicitudes HTTP
  });

  // Asegúrate de que no haya solicitudes HTTP pendientes después de cada prueba
  afterEach(() => {
    httpMock.verify();
  });

  // Prueba 1: Verificar que 'getUsers' hace la solicitud HTTP correctamente
  it('should retrieve users from the API via GET', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    // Llamada al servicio
    service.getUsers().subscribe(users => {
      // Asegúrate de que los usuarios sean los esperados
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    // Verifica que se haya hecho la solicitud GET a la URL correcta
    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/users');
    expect(req.request.method).toBe('GET'); // Asegúrate de que es un método GET

    // Proporciona una respuesta simulada
    req.flush(mockUsers); // 'flush' envía la respuesta simulada
  });

  // Prueba 2: Verificar que maneja errores correctamente
  it('should handle errors when the API fails', () => {
    // Llamada al servicio
    service.getUsers().subscribe({
      next: () => fail('expected an error, not users'),
      error: (error) => {
        expect(error.status).toBe(404); // Verifica el código de error
      }
    });

    // Simula una respuesta de error del servidor
    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/users');
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });
});
