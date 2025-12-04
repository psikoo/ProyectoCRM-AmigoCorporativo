import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  styleUrls: ['./clientes.component.css'],
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
  constructor() {}

  

  clientes: Cliente[] = [
    {
      initial: 'M', nombre: 'María González', empresa: 'Tech Solutions S.A.', email: 'maria@techsolutions.com', telefono: '+34 612 345 678', direccion: 'Calle Mayor 123, Madrid', industria: 'Tecnología', facturacion: '€250,000', estado: 'Activo', ultimoContacto: '20/11/2024', color: 'bg-purple-600'
    },
    {
      initial: 'C', nombre: 'Carlos Rodríguez', empresa: 'Innovación Digital', email: 'carlos@innovacion.com', telefono: '+34 687 234 567', direccion: 'Av. Libertad 456, Barcelona', industria: 'Marketing Digital', facturacion: '€180,000', estado: 'Pendiente', ultimoContacto: '15/11/2024', color: 'bg-blue-600'
    },
    {
      initial: 'A', nombre: 'Ana Martínez', empresa: 'Consultoría Empresarial', email: 'ana@consultoria.com', telefono: '+34 654 987 321', direccion: 'Plaza España 789, Valencia', industria: 'Consultoría', facturacion: '€320,000', estado: 'Activo', ultimoContacto: '21/11/2024', color: 'bg-purple-600'
    },
    {
      initial: 'L', nombre: 'Luis Fernández', empresa: 'Desarrollo Web Pro', email: 'luis@webpro.com', telefono: '+34 698 765 432', direccion: 'Calle Sol 321, Sevilla', industria: 'Desarrollo Web', facturacion: '€95,000', estado: 'Inactivo', ultimoContacto: '5/11/2024', color: 'bg-blue-600'
    },
    {
      initial: 'C', nombre: 'Carmen López', empresa: 'Retail Solutions', email: 'carmen@retail.com', telefono: '+34 611 222 333', direccion: 'Gran Vía 567, Bilbao', industria: 'Retail', facturacion: '€420,000', estado: 'Activo', ultimoContacto: '19/11/2024', color: 'bg-purple-600'
    }
  ];

  getStatusColor(estado: string): string {
    switch (estado) {
      case 'Activo': return 'bg-green-100 text-green-600';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-600';
      case 'Inactivo': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
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
      this.clientes.push(nuevoClienteObj);
      this.closeModal();
    }
  }


}
