import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  nombre = '';
  password = '';
  email = '';
  role = '';

  constructor(private router: Router) {}

  register() {
    
    this.router.navigate(['/login']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
