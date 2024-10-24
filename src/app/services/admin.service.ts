import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Category, Coupon, Order } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private products = new BehaviorSubject<Product[]>([]);
  private categories = new BehaviorSubject<Category[]>([]);
  private coupons = new BehaviorSubject<Coupon[]>([]);
  private orders = new BehaviorSubject<Order[]>([]);

  // Product Management
  createProduct(product: Product): Observable<Product> {
    return new Observable(observer => {
      const currentProducts = this.products.getValue();
      this.products.next([...currentProducts, product]);
      observer.next(product);
      observer.complete();
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return new Observable(observer => {
      const currentProducts = this.products.getValue();
      const index = currentProducts.findIndex(p => p.id === product.id);
      if (index !== -1) {
        currentProducts[index] = product;
        this.products.next([...currentProducts]);
        observer.next(product);
      } else {
        observer.error('Product not found');
      }
      observer.complete();
    });
  }

  deleteProduct(productId: string): Observable<void> {
    return new Observable(observer => {
      const currentProducts = this.products.getValue();
      this.products.next(currentProducts.filter(p => p.id !== productId));
      observer.next();
      observer.complete();
    });
  }

  uploadProductImage(file: File): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = () => {
        // In a real app, you would upload to a server and get back a URL
        const imageUrl = reader.result as string;
        observer.next(imageUrl);
        observer.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  // Category Management
  createCategory(category: Category): Observable<Category> {
    return new Observable(observer => {
      const currentCategories = this.categories.getValue();
      this.categories.next([...currentCategories, category]);
      observer.next(category);
      observer.complete();
    });
  }

  updateCategory(category: Category): Observable<Category> {
    return new Observable(observer => {
      const currentCategories = this.categories.getValue();
      const index = currentCategories.findIndex(c => c.id === category.id);
      if (index !== -1) {
        currentCategories[index] = category;
        this.categories.next([...currentCategories]);
        observer.next(category);
      } else {
        observer.error('Category not found');
      }
      observer.complete();
    });
  }

  deleteCategory(categoryId: string): Observable<void> {
    return new Observable(observer => {
      const currentCategories = this.categories.getValue();
      this.categories.next(currentCategories.filter(c => c.id !== categoryId));
      observer.next();
      observer.complete();
    });
  }

  // Coupon Management
  createCoupon(coupon: Coupon): Observable<Coupon> {
    return new Observable(observer => {
      const currentCoupons = this.coupons.getValue();
      this.coupons.next([...currentCoupons, coupon]);
      observer.next(coupon);
      observer.complete();
    });
  }

  updateCoupon(coupon: Coupon): Observable<Coupon> {
    return new Observable(observer => {
      const currentCoupons = this.coupons.getValue();
      const index = currentCoupons.findIndex(c => c.code === coupon.code);
      if (index !== -1) {
        currentCoupons[index] = coupon;
        this.coupons.next([...currentCoupons]);
        observer.next(coupon);
      } else {
        observer.error('Coupon not found');
      }
      observer.complete();
    });
  }

  deleteCoupon(couponCode: string): Observable<void> {
    return new Observable(observer => {
      const currentCoupons = this.coupons.getValue();
      this.coupons.next(currentCoupons.filter(c => c.code !== couponCode));
      observer.next();
      observer.complete();
    });
  }

  // Order Management
  getOrders(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<Order> {
    return new Observable(observer => {
      const currentOrders = this.orders.getValue();
      const index = currentOrders.findIndex(o => o.id === orderId);
      if (index !== -1) {
        currentOrders[index] = { ...currentOrders[index], status };
        this.orders.next([...currentOrders]);
        observer.next(currentOrders[index]);
      } else {
        observer.error('Order not found');
      }
      observer.complete();
    });
  }
}