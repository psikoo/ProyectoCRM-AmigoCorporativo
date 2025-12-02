import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { title: 'Clientes Totales', value: '2,847', change: '+12.5%', positive: true, icon: 'users', color: 'blue' },
    { title: 'Ventas del Mes', value: '$124,500', change: '+8.2%', positive: true, icon: 'dollar', color: 'green' },
    { title: 'Oportunidades', value: '156', change: '+23.1%', positive: true, icon: 'target', color: 'purple' },
    { title: 'Tasa de Conversión', value: '24.8%', change: '+3.2%', positive: true, icon: 'chart', color: 'orange' },
  ];

  recentClients = [
    { name: 'María González', company: 'Tech Solutions S.A.', email: 'maria@tech.com', phone: '+34 612 345 678', status: 'Activo', date: 'Hace 2 días', initial: 'M', color: 'bg-blue-600' },
    { name: 'Carlos Rodríguez', company: 'Innovación Digital', email: 'carlos@innova.com', phone: '+34 687 234 567', status: 'Pendiente', date: 'Hace 1 semana', initial: 'C', color: 'bg-indigo-600' },
    { name: 'Ana Martínez', company: 'Consultoría Empresarial', email: 'ana@consult.com', phone: '+34 654 987 321', status: 'Activo', date: 'Ayer', initial: 'A', color: 'bg-purple-600' },
    { name: 'Luis Fernández', company: 'Desarrollo Web Pro', email: 'luis@webpro.com', phone: '+34 698 765 432', status: 'Inactivo', date: 'Hace 2 semanas', initial: 'L', color: 'bg-blue-600' }
  ];

  tasks = [
    { title: 'Llamada de seguimiento', company: 'Tech Solutions', time: '10:00 AM', priority: 'Alta', type: 'call' },
    { title: 'Enviar propuesta', company: 'Innovación Digital', time: '2:30 PM', priority: 'Media', type: 'email' },
    { title: 'Reunión de cierre', company: 'Consultoría Empresarial', time: '4:00 PM', priority: 'Alta', type: 'meeting' },
    { title: 'Revisión de contrato', company: 'Desarrollo Web Pro', time: '5:30 PM', priority: 'Baja', type: 'review' }
  ];

  getStatusColor(status: string) {
    if(status === 'Activo') return 'bg-green-100 text-green-700';
    if(status === 'Pendiente') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  }

  getPriorityColor(priority: string) {
    if(priority === 'Alta') return 'text-red-600';
    if(priority === 'Media') return 'text-yellow-600';
    return 'text-green-600';
  }
}