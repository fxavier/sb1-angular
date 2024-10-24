import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-2/3">
          <div class="card">
            <div *ngIf="cartItems.length === 0" class="text-center py-8">
              <p class="text-gray-500">Your cart is empty</p>
            </div>
            
            <div *ngFor="let item of cartItems" class="flex items-center gap-4 py-4 border-b last:border-0">
              <img [src]="item.product.imageUrl" [alt]="item.product.name" 
                   class="w-24 h-24 object-cover rounded">
              
              <div class="flex-grow">
                <h3 class="font-semibold">{{ item.product.name }}</h3>
                <p class="text-gray-600">${{ item.product.discountedPrice || item.product.price }}</p>
              </div>
              
              <div class="flex items-center gap-2">
                <button (click)="updateQuantity(item, item.quantity - 1)"
                        class="btn-secondary px-2 py-1">-</button>
                <span class="w-8 text-center">{{ item.quantity }}</span>
                <button (click)="updateQuantity(item, item.quantity + 1)"
                        class="btn-secondary px-2 py-1">+</button>
              </div>
              
              <button (click)="removeItem(item.product.id)" 
                      class="text-red-500 hover:text-red-700">
                Remove
              </button>
            </div>
          </div>
        </div>
        
        <div class="lg:w-1/3">
          <div class="card">
            <h2 class="text-xl font-bold mb-4">Order Summary</h2>
            
            <div class="space-y-2 mb-4">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>${{ total }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div class="border-t pt-4">
              <div class="flex justify-between font-bold">
                <span>Total</span>
                <span>${{ total }}</span>
              </div>
            </div>
            
            <button class="btn-primary w-full mt-6">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    
    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(item.product.id, quantity);
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}