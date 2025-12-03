import { Component, inject, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  nombre = '';
  password = '';
  email = '';
  role = '';

  constructor(private router: Router, private http: HttpClient) {}
  
  register() {
    let reqHeaders = {
      "Content-Type": "application/json"
    }
    let reqBody  = {
      "name": this.nombre,
      "password": this.password,
      "email": this.email,
      "role": this.role
    };
    this.http.post("http://localhost:8080/api/auth/register", reqBody, { headers: reqHeaders })
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

  goLogin() {
    this.router.navigate(['/login']);
  }
}
