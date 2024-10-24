import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="card max-w-md w-full">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" [(ngModel)]="email"
                   class="input-field" required>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" [(ngModel)]="password"
                   class="input-field" required>
          </div>
          
          <button type="submit" class="btn-primary w-full">
            Login
          </button>
        </form>
        
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account? 
          <a href="/register" class="text-primary-600 hover:text-primary-700">Register</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}