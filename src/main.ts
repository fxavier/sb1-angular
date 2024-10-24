import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { CartComponent } from './app/components/cart/cart.component';
import { LoginComponent } from './app/components/auth/login.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { CheckoutComponent } from './app/components/checkout/checkout.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { AuthService } from './app/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  template: `
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <nav class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <a href="/" class="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            E-Shop
          </a>

          <!-- Navigation Links - Desktop -->
          <div class="hidden md:flex items-center gap-8">
            <a href="/products" class="text-gray-700 hover:text-primary-600 transition-colors">Products</a>
            <a href="/categories" class="text-gray-700 hover:text-primary-600 transition-colors">Categories</a>
            <a href="/deals" class="text-gray-700 hover:text-primary-600 transition-colors">Deals</a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-4">
            <!-- Search -->
            <button class="p-2 text-gray-500 hover:text-primary-600 transition-colors md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- Cart -->
            <a href="/cart" class="relative p-2 text-gray-500 hover:text-primary-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                0
              </span>
            </a>

            <!-- User Menu -->
            <div class="relative">
              <button *ngIf="!(isAuthenticated$ | async)" 
                      (click)="login()"
                      class="hidden md:block rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
                Sign In
              </button>
              
              <button *ngIf="isAuthenticated$ | async" 
                      (click)="logout()"
                      class="hidden md:block rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 transition-colors">
                Sign Out
              </button>
            </div>

            <!-- Mobile Menu Button -->
            <button class="p-2 text-gray-500 hover:text-primary-600 transition-colors md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `
})
export class App {
  isAuthenticated$ = this.authService.isAuthenticated();

  constructor(private authService: AuthService) {}

  login() {
    // Navigate to login page
  }

  logout() {
    this.authService.logout();
  }
}

const routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));