import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; // <--- CAMBIO AQUÍ

describe('AppComponent', () => { // <--- CAMBIO AQUÍ
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // <--- CAMBIO AQUÍ
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // <--- CAMBIO AQUÍ
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Puedes dejar el resto igual o borrarlo si da problemas
});