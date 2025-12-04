import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CompanyModalService } from '../../services/company-modal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  clientes = 0;
  empresas = 0;
  ventas = 0;
  tareas = 0;
  clientesJson:any;
  tareasJson:any;

  color = 'green';

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

  constructor(private http: HttpClient, private companyModalService: CompanyModalService) {}

  private companySub: Subscription | null = null;
  showCompanyModal = false;
  nuevaCompania = {
    nombre: '',
    industria: '',
    sitioWeb: '',
    telefono: '',
    direccion: '',
    usuario: ''
  };

  openCompanyModal() {
    this.companyModalService.open();
  }

  ngOnInit() {
    this.companySub = this.companyModalService.open$.subscribe(v => {
      this.showCompanyModal = !!v;
    });
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
    this.http.get("http://localhost:8080/api/companies", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.empresas = data.length
      });
    this.http.get("http://localhost:8080/api/deals", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.ventas = data.length
      });
    this.http.get("http://localhost:8080/api/activities", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.tareas = data.length
        this.tareasJson = data
      });
  }

  ngOnDestroy() {
    this.companySub?.unsubscribe();
  }

  closeCompanyModal() {
    this.showCompanyModal = false;
    this.resetCompanyForm();
  }

  resetCompanyForm() {
    this.nuevaCompania = {
      nombre: '',
      industria: '',
      sitioWeb: '',
      telefono: '',
      direccion: '',
      usuario: ''
    };
  }

  agregarCompania() {
    if (this.nuevaCompania.nombre && this.nuevaCompania.telefono && this.nuevaCompania.usuario) {
      const reqHeaders = new HttpHeaders({
        'Authorization': this.getCookie("token"),
        "Content-Type": "application/json"
      });
      this.http.post("http://localhost:8080/api/companies", this.nuevaCompania, { headers: reqHeaders })
        .subscribe(() => {
          this.empresas = (this.empresas || 0) + 1;
          this.closeCompanyModal();
        }, (err) => {
          console.error('Error creando compañía', err);
          this.closeCompanyModal();
        });
    }
  }

  getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) { return value; }
    }
    return "null";
  }
}
