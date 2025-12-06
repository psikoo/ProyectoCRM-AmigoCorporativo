import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Cliente {
  initial: string;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  direccion: string;
  industria: string;
  facturacion: string;
  estado: string;
  ultimoContacto: string;
  color: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ClientesComponent {
  clientes = 0;
  clientesJson:any;

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
    apellido: '',
    email: '',
    telefono: '',
    posicion: '',
    empresa: ''
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
      apellido: '',
      email: '',
      telefono: '',
      posicion: '',
      empresa: ''
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
      "email": this.nuevo.email,
      "phone": this.nuevo.telefono,
      "position": this.nuevo.posicion,
      "company": this.nuevo.empresa,
    };
    this.http.post("http://localhost:8080/api/contacts", reqBody, { headers: reqHeaders })
      .subscribe((data:any) => {
        this.closeModal();
        location.reload();
      });
  }
}
