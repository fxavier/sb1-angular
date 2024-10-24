import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product, quantity: number = 1) {
    if (product.stock < quantity) {
      throw new Error('Not enough stock');
    }

    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      if (product.stock < existingItem.quantity + quantity) {
        throw new Error('Not enough stock');
      }
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: string) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      if (item.product.stock < quantity) {
        throw new Error('Not enough stock');
      }
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotal(): Observable<number> {
    return new Observable(observer => {
      this.cartItems.subscribe(items => {
        const total = items.reduce((sum, item) => {
          const price = item.product.discountedPrice || item.product.price;
          return sum + (price * item.quantity);
        }, 0);
        observer.next(total);
      });
    });
  }

  getItemCount(): Observable<number> {
    return new Observable(observer => {
      this.cartItems.subscribe(items => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        observer.next(count);
      });
    });
  }
}