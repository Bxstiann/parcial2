import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  const mockUsersResponse = {
    '1': { name: 'John Doe', email: 'john@example.com' },
    '2': { name: 'Jane Doe', email: 'jane@example.com' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from Firebase and transform them into an array', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
      ]);
    });

    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse); // Responder con los datos mockeados
  });

  it('should handle error when API call fails', () => {
    service.getUsers().subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      },
    });

    const req = httpMock.expectOne('https://bd-progra-9976e-default-rtdb.firebaseio.com/users.json');
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
