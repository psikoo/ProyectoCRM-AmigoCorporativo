import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  clientes = 0;
  empresas = 0;
  ventas = 0;
  tareas = 0;
  clientesJson:any;
  tareasJson:any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const reqHeaders = new HttpHeaders({
      'Authorization': this.getCookie("token"),
      "Content-Type": "application/json",
      "Access-Control-Request-Method": "GET"
    });
      
    this.http.get("http://localhost:8080/api/contacts", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.clientes = data.length
        this.clientesJson = data

      });
    this.http.get("http://localhost:8080/api/companies", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.empresas = data.length
      });
    this.http.get("http://localhost:8080/api/deals", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.ventas = data.length
      });
    this.http.get("http://localhost:8080/api/activities", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.tareas = data.length
        this.tareasJson = data
      });
  }

  getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) { return value; }
    }
    return "null";
  }

  showModal = false;
  nuevo = {
    nombre: '',
    industria: '',
    sitioWeb: '',
    telefono: '',
    direccion: '',
    usuario: ''
  };

  openModal() {
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.nuevo = {
      nombre: '',
      industria: '',
      sitioWeb: '',
      telefono: '',
      direccion: '',
      usuario: ''
    };
  }

  agregar() {
    this.post();
  }

  post() {
    const reqHeaders = new HttpHeaders({
      'Authorization': this.getCookie("token"),
      "Content-Type": "application/json",
      "Access-Control-Request-Method": "POST"
    });
    let reqBody  = {
      "name": this.nuevo.nombre,
      "industry": this.nuevo.industria,
      "website": this.nuevo.sitioWeb,
      "phone": this.nuevo.telefono,
      "address": this.nuevo.direccion,
      "user": this.nuevo.usuario
    };
    this.http.post("http://localhost:8080/api/companies", reqBody, { headers: reqHeaders })
      .subscribe((data:any) => {
        this.closeModal();
        location.reload();
      });
  }
}
