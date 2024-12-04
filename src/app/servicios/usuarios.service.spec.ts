import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
=======
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Para espiar solicitudes HTTP
import { UsuariosService } from './usuarios.service'; // El servicio que vas a probar

describe('UsuariosService', () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController; // Para controlar las peticiones HTTP

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo para pruebas HTTP
      providers: [UsuariosService] // Inyecta el servicio que deseas probar
    });
    service = TestBed.inject(UsuariosService); // Obtén la instancia del servicio
    httpMock = TestBed.inject(HttpTestingController); // Obtén el controlador de solicitudes HTTP
  });

  // Asegúrate de que no haya solicitudes HTTP pendientes después de cada prueba
  afterEach(() => {
    httpMock.verify();
  });

  // Prueba 1: Verificar que 'obtenerUsuarios' hace la solicitud HTTP GET correctamente
  it('should retrieve users from the API via GET', () => {
    const mockUsuarios = [
      { id: 1, name: 'John Doe', password: '1234' },
      { id: 2, name: 'Jane Doe', password: 'abcd' },
    ];

    // Llamada al servicio
    service.obtenerUsuarios().subscribe(usuarios => {
      // Asegúrate de que los usuarios sean los esperados
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(mockUsuarios);
    });

    // Verifica que se haya hecho la solicitud GET a la URL correcta
    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/users');
    expect(req.request.method).toBe('GET'); // Asegúrate de que es un método GET

    // Proporciona una respuesta simulada
    req.flush(mockUsuarios); // 'flush' envía la respuesta simulada
  });

  // Prueba 2: Verificar que 'actualizarContraseña' hace la solicitud HTTP PATCH correctamente
  it('should update password via PATCH', () => {
    const id = '1';
    const nuevaClave = 'newpassword123';
    const mockResponse = { id, password: nuevaClave };

    // Llamada al servicio para actualizar la contraseña
    service.actualizarContraseña(id, nuevaClave).subscribe(response => {
      // Asegúrate de que la respuesta contiene los datos esperados
      expect(response).toEqual(mockResponse);
    });

    // Verifica que se haya hecho la solicitud PATCH a la URL correcta
    const req = httpMock.expectOne(`https://bd-progra-9976e-default-rtdb.firebaseio.com/users/${id}`);
    expect(req.request.method).toBe('PATCH'); // Asegúrate de que es un método PATCH
    expect(req.request.body).toEqual({ password: nuevaClave }); // Verifica que el cuerpo de la solicitud contiene la nueva contraseña

    // Proporciona una respuesta simulada
    req.flush(mockResponse); // 'flush' envía la respuesta simulada
  });

  // Prueba 3: Verificar que maneja errores correctamente
  it('should handle error when API fails in obtenerUsuarios', () => {
    // Llamada al servicio
    service.obtenerUsuarios().subscribe({
      next: () => fail('expected an error, not users'),
      error: (error) => {
        expect(error.status).toBe(404); // Verifica el código de error
      }
    });

    // Simula una respuesta de error del servidor
    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/users');
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });

  it('should handle error when API fails in actualizarContraseña', () => {
    const id = '1';
    const nuevaClave = 'newpassword123';

    // Llamada al servicio
    service.actualizarContraseña(id, nuevaClave).subscribe({
      next: () => fail('expected an error, not password update'),
      error: (error) => {
        expect(error.status).toBe(500); // Verifica el código de error
      }
    });

    // Simula una respuesta de error del servidor
    const req = httpMock.expectOne(`https://bd-progra-9976e-default-rtdb.firebaseio.com/users/${id}`);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
>>>>>>> main
  });
});
