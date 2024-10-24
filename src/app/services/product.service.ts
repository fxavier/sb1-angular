import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = new BehaviorSubject<Product[]>([]);
  private categories = new BehaviorSubject<Category[]>([]);

  getProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }

  getProduct(id: string): Observable<Product> {
    return new Observable(observer => {
      this.products.subscribe(products => {
        const product = products.find(p => p.id === id);
        if (product) {
          observer.next(product);
        } else {
          observer.error('Product not found');
        }
        observer.complete();
      });
    });
  }

  getFeaturedProducts(): Observable<Product[]> {
    return new Observable(observer => {
      this.products.subscribe(products => {
        observer.next(products.filter(p => p.isFeatured));
      });
    });
  }

  getNewArrivals(): Observable<Product[]> {
    return new Observable(observer => {
      this.products.subscribe(products => {
        observer.next(products.filter(p => p.isNewArrival));
      });
    });
  }

  getCategories(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  searchProducts(query: string): Observable<Product[]> {
    return new Observable(observer => {
      this.products.subscribe(products => {
        const filtered = products.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(filtered);
      });
    });
  }

  filterProducts(filters: any): Observable<Product[]> {
    return new Observable(observer => {
      this.products.subscribe(products => {
        let filtered = [...products];
        
        if (filters.categories?.length > 0) {
          filtered = filtered.filter(p => filters.categories.includes(p.category));
        }
        if (filters.minPrice) {
          filtered = filtered.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
          filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }
        if (filters.inStock) {
          filtered = filtered.filter(p => p.stock > 0);
        }
        
        observer.next(filtered);
      });
    });
  }
}