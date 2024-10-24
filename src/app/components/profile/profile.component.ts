import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User, Order } from '../../models/product.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="card mb-8">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-primary-600">
                {{ user?.name?.charAt(0) || 'U' }}
              </span>
            </div>
            
            <div>
              <h1 class="text-2xl font-bold">{{ user?.name }}</h1>
              <p class="text-gray-600">{{ user?.email }}</p>
            </div>
          </div>
          
          <div class="mt-6 border-t pt-6">
            <h2 class="text-xl font-semibold mb-4">Shipping Address</h2>
            <p class="text-gray-600">{{ user?.address }}</p>
            <button class="btn-secondary mt-4">Edit Address</button>
          </div>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">Order History</h2>
          
          <div *ngIf="user?.orders?.length === 0" class="text-center py-8 text-gray-500">
            No orders yet
          </div>
          
          <div *ngFor="let order of user?.orders" class="border-b last:border-0 py-4">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium">Order #{{ order.id }}</span>
              <span class="text-sm text-gray-600">{{ order.date | date }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">${{ order.total }}</span>
              <span class="px-2 py-1 rounded-full text-sm"
                    [ngClass]="{
                      'bg-yellow-100 text-yellow-800': order.status === 'pending',
                      'bg-blue-100 text-blue-800': order.status === 'processing',
                      'bg-purple-100 text-purple-800': order.status === 'shipped',
                      'bg-green-100 text-green-800': order.status === 'delivered'
                    }">
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }
}