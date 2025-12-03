
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OpportunitiesComponent } from './pages/opportunities/opportunities.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      {
        path: '', // Cuando la ruta está vacía bajo /app, carga el Dashboard
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
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];