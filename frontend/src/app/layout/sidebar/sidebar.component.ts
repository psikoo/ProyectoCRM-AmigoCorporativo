import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  name = 'Loading';
  role = 'Loading';
  initial = 'L';
  currentDate: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    
    const reqHeaders = new HttpHeaders({
      'Authorization': this.getCookie("token"),
      "Content-Type": "application/json",
      "Access-Control-Request-Method": "GET"
    });
      
    this.http.get("http://localhost:8080/api/users/"+this.getCookie("nombre"), { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.name = data.name
        this.role = data.role.name
        this.initial = this.name.charAt(0).toUpperCase()
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
}