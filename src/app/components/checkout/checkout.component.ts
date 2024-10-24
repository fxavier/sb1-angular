import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem, User } from '../../models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold mb-8">Checkout</h1>
        
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="lg:w-2/3 space-y-6">
            <!-- Shipping Information -->
            <div class="card">
              <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" [(ngModel)]="user?.name" class="input-field">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Address</label>
                  <textarea [(ngModel)]="user?.address" class="input-field"></textarea>
                </div>
              </div>
            </div>
            
            <!-- Payment Information -->
            <div class="card">
              <h2 class="text-xl font-semibold mb-4">Payment Information</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Card Number</label>
                  <input type="text" class="input-field" placeholder="**** **** **** ****">
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input type="text" class="input-field" placeholder="MM/YY">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">CVV</label>
                    <input type="text" class="input-field" placeholder="***">
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="lg:w-1/3">
            <div class="card">
              <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div class="space-y-4">
                <div *ngFor="let item of cartItems" class="flex justify-between">
                  <span>{{ item.product.name }} (x{{ item.quantity }})</span>
                  <span>${{ item.product.price * item.quantity }}</span>
                </div>
                
                <div class="border-t pt-4">
                  <div class="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>${{ total }}</span>
                  </div>
                  
                  <div class="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  
                  <div class="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>${{ total }}</span>
                  </div>
                </div>
                
                <button (click)="placeOrder()" class="btn-primary w-full">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  user: User | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    
    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
    
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  placeOrder() {
    // Implement order placement logic
    console.log('Order placed');
    this.cartService.clearCart();
  }
}