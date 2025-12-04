import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  clientName: string;
  clientCompany?: string;
  value: string;
  stage: string;
  probability: string;
  closeDate: string;
  assigned: string;
}

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './opportunities.component.html'
})
export class OpportunitiesComponent {
  protected query = '';
  protected hasData = true; // show example items for the UI preview

  protected items: Opportunity[] = [
    {
      id: 1,
      title: 'Implementación CRM - Tech Solutions',
      description: 'Implementación completa de sistema CRM para gestión de clientes y ventas.',
      clientName: 'María González',
      clientCompany: 'Tech Solutions S.A.',
      value: '€45.000',
      stage: 'Propuesta',
      probability: '75%',
      closeDate: '15/12/2024',
      assigned: 'Carlos Vendedor'
    },
    {
      id: 2,
      title: 'Consultoría Digital - Innovación',
      description: 'Servicios de consultoría para transformación digital de la empresa',
      clientName: 'Carlos Rodríguez',
      clientCompany: 'Innovación Digital',
      value: '€28.000',
      stage: 'Negociación',
      probability: '60%',
      closeDate: '30/12/2024',
      assigned: 'Ana Consultora'
    },
    {
      id: 3,
      title: 'Desarrollo Web Corporativo',
      description: 'Desarrollo de sitio web corporativo con funcionalidades avanzadas',
      clientName: 'Ana Martínez',
      clientCompany: 'Consultoría Empresarial',
      value: '€35.000',
      stage: 'Calificado',
      probability: '40%',
      closeDate: '20/01/2025',
      assigned: 'Luis Desarrollador'
    }
  ];

  // Returns the visible items applying the search query (case-insensitive)
  protected get filteredItems(): Opportunity[] {
    const q = (this.query || '').trim().toLowerCase();
    if (!q) return this.items;

    return this.items.filter((it) => {
      return (
        it.title.toLowerCase().includes(q) ||
        it.clientName.toLowerCase().includes(q) ||
        (it.clientCompany || '').toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q)
      );
    });
  }

  protected clearQuery() {
    this.query = '';
  }

  protected probabilityValue(p: string): number {
    // strip non-digits and parse number
    const n = parseInt((p || '').replace(/[^0-9]/g, ''), 10);
    return Number.isNaN(n) ? 0 : n;
  }
}
