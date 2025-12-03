import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  name = 'Loading';
  initial = 'A';
  currentDate: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let reqHeaders = {
      "Authorization": this.getCookie("token"),
      "Content-Type": "application/json"
    }
    this.http.get("http://localhost:8080/api/users", { headers: reqHeaders})
      .subscribe((data:any) => {
        this.name = "B"
      });
    }

  getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) { return decodeURIComponent(value); }
    }
    return "null";
  }
}