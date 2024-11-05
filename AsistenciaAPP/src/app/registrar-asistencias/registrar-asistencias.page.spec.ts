import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarAsistenciasPage } from './registrar-asistencias.page';

describe('RegistrarAsistenciasPage', () => {
  let component: RegistrarAsistenciasPage;
  let fixture: ComponentFixture<RegistrarAsistenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
