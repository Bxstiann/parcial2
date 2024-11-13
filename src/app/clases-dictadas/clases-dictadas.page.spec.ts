import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesDictadasPage } from './clases-dictadas.page';

describe('ClasesDictadasPage', () => {
  let component: ClasesDictadasPage;
  let fixture: ComponentFixture<ClasesDictadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesDictadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
