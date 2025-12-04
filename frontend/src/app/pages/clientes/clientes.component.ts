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
  showModal = false;
  nuevoCliente = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: ''
  };

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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.nuevoCliente = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      empresa: ''
    };
  }

  agregarCliente() {
    if (this.nuevoCliente.nombre && this.nuevoCliente.apellido && this.nuevoCliente.email && this.nuevoCliente.telefono && this.nuevoCliente.empresa) {
      const initial = this.nuevoCliente.nombre.charAt(0).toUpperCase();
      const nuevoClienteObj: Cliente = {
        initial,
        nombre: `${this.nuevoCliente.nombre} ${this.nuevoCliente.apellido}`,
        empresa: this.nuevoCliente.empresa,
        email: this.nuevoCliente.email,
        telefono: this.nuevoCliente.telefono,
        direccion: '',
        industria: 'Por definir',
        facturacion: '$0',
        estado: 'Pendiente',
        ultimoContacto: new Date().toLocaleDateString('es-ES'),
        color: 'bg-blue-600'
      };
      this.closeModal();
    }
  }
}
