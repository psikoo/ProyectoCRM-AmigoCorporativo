import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Seller {
  name: string;
  value: string;
  opportunities: number;
  conversion: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  protected metrics = [
    { title: 'Ingresos Totales', value: '€742,000', change: '+15.3%', color: 'green' },
    { title: 'Nuevos Clientes', value: '156', change: '+23.1%', color: 'blue' },
    { title: 'Tasa de Conversión', value: '24.8%', change: '+3.2%', color: 'purple' },
    { title: 'Tiempo Promedio de Cierre', value: '45 días', change: '-8.5%', color: 'orange' }
  ];

  protected salesSeries = [45000, 52000, 48000, 62000, 57000, 68000, 60000, 73000, 67000, 82000, 76000, 90000];

  protected growthSeries = {
    months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    activeClients: [1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1950],
    newClients: [30,52,45,60,48,55,62,58,65,70,75,84]
  };

  protected sellers: Seller[] = [
    { name: 'Carlos Vendedor', value: '€245.000', opportunities: 45, conversion: '78%' },
    { name: 'Ana Consultora', value: '€198.000', opportunities: 38, conversion: '65%' },
    { name: 'María Técnica', value: '€167.000', opportunities: 32, conversion: '72%' },
    { name: 'Luis Desarrollador', value: '€134.000', opportunities: 28, conversion: '58%' },
    { name: 'Pedro Sistemas', value: '€112.000', opportunities: 24, conversion: '61%' }
  ];
}
