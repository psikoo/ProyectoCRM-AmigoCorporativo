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

  showModal = false;
  nuevo = {
    "stage": '',
    "amount": '',
    "chance": '',
    "closeDate": '',
    "user": '', 
    "company": ''
  };

  openModal() {
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.nuevo = {
      "stage": '',
      "amount": '',
      "chance": '',
      "closeDate": '',
      "user": '', 
      "company": ''
    };
  }

  agregar() {
    this.post();
  }

  post() {
    const reqHeaders = new HttpHeaders({
      'Authorization': this.getCookie("token"),
      "Content-Type": "application/json",
      "Access-Control-Request-Method": "POST"
    });
    let reqBody  = {
      "stage": this.nuevo.stage,
      "amount": this.nuevo.amount,
      "chance": this.nuevo.chance,
      "closeDate": this.nuevo.closeDate,
      "user": this.nuevo.user,
      "company": this.nuevo.company
    };
    this.http.post("http://localhost:8080/api/deals", reqBody, { headers: reqHeaders })
      .subscribe((data:any) => {
        this.closeModal();
        location.reload();
      });
  }
}
