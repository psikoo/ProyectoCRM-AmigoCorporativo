import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  nombre = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    let reqHeaders = {
      "Content-Type": "application/json"
    }
    let reqBody  = {
      "name": this.nombre,
      "password": this.password,
    };
    this.http.post("http://localhost:8080/api/auth/login", reqBody, { headers: reqHeaders})
      .subscribe((data:any) => {
        document.cookie = "token=Bearer "+data.token+"; path=/; max-age=3600; secure; samesite=lax";
        document.cookie = "nombre="+this.nombre+"; path=/; max-age=3600; secure; samesite=lax";
        if(this.getCookie("token") != null) this.router.navigate(['/app']);
      });
  }

  getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) { return decodeURIComponent(value); }
    }
    return null;  
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
