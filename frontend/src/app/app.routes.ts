
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main.layout';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OpportunitiesComponent } from './pages/opportunities/opportunities.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'oportunidades',
        component: OpportunitiesComponent
      },
      {
        path: 'tareas',
        component: TasksComponent
      },
      {
        path: 'reportes',
        component: ReportsComponent
      }
    ]
  }
];