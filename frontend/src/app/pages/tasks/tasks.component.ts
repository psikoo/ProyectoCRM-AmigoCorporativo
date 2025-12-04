import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TaskItem {
  id: number;
  title: string;
  description?: string;
  clientName?: string;
  clientCompany?: string;
  type?: string; // e.g. Llamada, Email
  priority?: 'Alta'|'Media'|'Baja';
  status?: string; // Pendiente, Completada, En Progreso
  dueDate?: string;
  assigned?: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  protected query = '';

  protected items: TaskItem[] = [
    { id: 1, title: 'Llamada de seguimiento - Tech Solutions', description: 'Contactar con María González para revisar el progreso de la implementación del CRM', clientName: 'María González', clientCompany: 'Tech Solutions S.A.', type: 'Llamada', priority: 'Alta', status: 'Pendiente', dueDate: '22/11/2024', assigned: 'Carlos Vendedor' },
    { id: 2, title: 'Enviar propuesta - Innovación Digital', description: 'Enviar versión final de la propuesta con alcance y tarifas', clientName: 'Carlos Rodríguez', clientCompany: 'Innovación Digital', type: 'Email', priority: 'Media', status: 'Pendiente', dueDate: '30/11/2024', assigned: 'Ana Consultora' },
    { id: 3, title: 'Reunión de cierre - Consultoría Empresarial', description: 'Reunión final para cerrar acuerdo y revisar entregables', clientName: 'Ana Martínez', clientCompany: 'Consultoría Empresarial', type: 'Reunión', priority: 'Alta', status: 'Pendiente', dueDate: '05/12/2024', assigned: 'Luis Desarrollador' },
    { id: 4, title: 'Revisión de contrato - Desarrollo Web Pro', description: 'Revisar cláusulas del contrato antes de firma', clientName: 'Luis Fernández', clientCompany: 'Desarrollo Web Pro', type: 'Revisión', priority: 'Baja', status: 'Completada', dueDate: '10/10/2024', assigned: 'María Técnica' },
    { id: 5, title: 'Preparar demo - Cliente X', description: 'Preparar demo funcional para la presentación', clientName: 'Carmen López', clientCompany: 'Retail Solutions', type: 'Demo', priority: 'Media', status: 'Pendiente', dueDate: '15/12/2024', assigned: 'Equipo Demo' }
  ];

  protected get filteredItems(): TaskItem[] {
    const q = (this.query || '').trim().toLowerCase();
    if (!q) return this.items;
    return this.items.filter(t => [t.title, t.description, t.clientName, t.clientCompany, t.assigned, t.type].join(' ').toLowerCase().includes(q));
  }

  protected clearQuery(){ this.query = ''; }
}
