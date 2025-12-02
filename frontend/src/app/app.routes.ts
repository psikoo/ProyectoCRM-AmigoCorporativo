import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OpportunitiesComponent } from './pages/opportunities/opportunities.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '', // Cuando la ruta está vacía (la home), carga el Dashboard
        component: DashboardComponent
      }
      ,
      {
        path: 'oportunidades',
        component: OpportunitiesComponent
      }
      ,
      {
        path: 'tareas',
        component: TasksComponent
      }
      ,
      {
        path: 'reportes',
        component: ReportsComponent
      }
    ]
  }
];