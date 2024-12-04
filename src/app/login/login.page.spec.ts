import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { LoginService } from '../servicios/login.service';
import { FormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockToastController: jasmine.SpyObj<ToastController>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLoginService = jasmine.createSpyObj('LoginService', ['getUsers']);
    mockToastController = jasmine.createSpyObj('ToastController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if fields are empty', () => {
    component.user = '';
    component.pswd = '';
    component.onSubmit();
    expect(component.errorMessage).toEqual('Por favor, complete todos los campos.');
  });

  it('should authenticate user with correct credentials', () => {
    const mockUsers = [{ id: 1, username: 'user1', password: 'pass1', type: 'admin', nombre: 'User One' }];
    mockLoginService.getUsers.and.returnValue(of(mockUsers));

    component.user = 'user1';
    component.pswd = 'pass1';
    component.onSubmit();

    expect(mockLoginService.getUsers).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error toast for incorrect credentials', async () => {
    const mockUsers = [{ id: 1, username: 'user1', password: 'pass1', type: 'admin', nombre: 'User One' }];
    mockLoginService.getUsers.and.returnValue(of(mockUsers));
    mockToastController.create.and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
      } as any)
    );

    component.user = 'wrongUser';
    component.pswd = 'wrongPass';
    component.onSubmit();

    expect(mockLoginService.getUsers).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('Usuario o contraseña incorrectos.');
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'Usuario o contraseña incorrectos.',
      duration: 1000,
      position: 'bottom',
      color: 'danger',
    });
  });

  it('should toggle password visibility', () => {
    component.showPassword = false;
    component.toggleShowPassword();
    expect(component.showPassword).toBeTrue();

    component.toggleShowPassword();
    expect(component.showPassword).toBeFalse();
  });

  it('should handle server error gracefully', () => {
    mockLoginService.getUsers.and.returnValue(throwError(() => new Error('Server error')));
    component.user = 'user1';
    component.pswd = 'pass1';
    component.onSubmit();

    expect(component.errorMessage).toEqual('Hubo un error al conectar con el servidor.');
  });
});
