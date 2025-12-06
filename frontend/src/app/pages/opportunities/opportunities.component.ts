import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './opportunities.component.html'
})
export class OpportunitiesComponent {
  protected query = '';
  protected hasData = true; // show example items for the UI preview
  protected showModal = false;
  protected nextId = 4;

  protected nuevaOportunidad = {
    title: '',
    description: '',
    clientName: '',
    clientCompany: '',
    value: '',
    stage: 'Calificado',
    probability: '50%',
    closeDate: '',
    assigned: ''
  };

  ventas = 0;
  valor = 0;
  valorTotal = 0;
  ventasJson:any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const reqHeaders = new HttpHeaders({
      'Authorization': this.getCookie("token"),
      "Content-Type": "application/json",
      "Access-Control-Request-Method": "GET"
    });
    
    this.http.get("http://localhost:8080/api/deals", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.ventas = data.length
        this.ventasJson = data
        for(const item of data) {
          if(item.stage == "Finalizado") this.valor += item.amount;
          this.valorTotal += item.amount;
        }
      });
  }

  getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) { return value; }
    }
    return "null";
  }

  protected openModal() {
    this.showModal = true;
  }

  protected closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  protected resetForm() {
    this.nuevaOportunidad = {
      title: '',
      description: '',
      clientName: '',
      clientCompany: '',
      value: '',
      stage: 'Calificado',
      probability: '50%',
      closeDate: '',
      assigned: ''
    };
  }

  protected agregarOportunidad() {
    if (this.nuevaOportunidad.title && this.nuevaOportunidad.clientName && 
        this.nuevaOportunidad.clientCompany && this.nuevaOportunidad.value && 
        this.nuevaOportunidad.closeDate && this.nuevaOportunidad.assigned) {
      const newOpp = {
        id: this.nextId++,
        title: this.nuevaOportunidad.title,
        description: this.nuevaOportunidad.description,
        clientName: this.nuevaOportunidad.clientName,
        clientCompany: this.nuevaOportunidad.clientCompany,
        value: this.nuevaOportunidad.value,
        stage: this.nuevaOportunidad.stage,
        probability: this.nuevaOportunidad.probability,
        closeDate: this.nuevaOportunidad.closeDate,
        assigned: this.nuevaOportunidad.assigned
      };
      this.closeModal();
    }
  }
}
