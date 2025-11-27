import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importante para cargar las páginas hijas
import { SidebarComponent } from '../sidebar/sidebar.component'; // Importa el Sidebar
import { HeaderComponent } from '../header/header.component'; // Importa el Header

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent], // <--- ¡Aquí los registramos!
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {}