import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  task = 0;
  finalizado = 0;
  taskJson:any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const reqHeaders = new HttpHeaders({
      'Authorization': this.getCookie("token"),
      "Content-Type": "application/json",
      "Access-Control-Request-Method": "GET"
    });
    
    this.http.get("http://localhost:8080/api/activities", { headers: reqHeaders, credentials: 'include' })
      .subscribe((data:any) => {
        this.task = data.length
        this.taskJson = data
        for(const item of data) {
          if(item.deal.stage == "Finalizado") this.finalizado += 1;
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
}
