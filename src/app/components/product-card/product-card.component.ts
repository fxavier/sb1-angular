import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div class="relative aspect-square overflow-hidden">
        <img [src]="product.imageUrl" [alt]="product.name" 
             class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
             
        <!-- Quick action buttons -->
        <div class="absolute right-4 top-4 flex flex-col gap-2 transform translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button (click)="quickView()" 
                  class="rounded-full bg-white p-2 shadow-md hover:bg-primary-50 transition-colors"
                  aria-label="Quick view">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          <button (click)="toggleFavorite()" 
                  class="rounded-full bg-white p-2 shadow-md hover:bg-primary-50 transition-colors"
                  [class.text-red-500]="isFavorite"
                  aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" [class.fill-current]="isFavorite" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <!-- Sale badge -->
        <div *ngIf="product.discountedPrice" 
             class="absolute left-4 top-4 rounded-full bg-red-500 px-2 py-1 text-sm font-medium text-white">
          Sale
        </div>

        <!-- Add to cart overlay -->
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button (click)="addToCart()" 
                  [disabled]="product.stock === 0"
                  class="transform -translate-y-4 rounded-lg bg-white px-6 py-2 font-medium text-gray-900 shadow-lg transition-all duration-300 hover:bg-primary-50 group-hover:translate-y-0 disabled:bg-gray-200 disabled:text-gray-500">
            {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>

      <div class="p-4">
        <!-- Category -->
        <span class="text-sm font-medium text-primary-600">{{ product.category }}</span>
        
        <!-- Title -->
        <h3 class="mt-1 text-lg font-semibold text-gray-900">{{ product.name }}</h3>
        
        <!-- Price -->
        <div class="mt-2 flex items-center gap-2">
          <span *ngIf="product.discountedPrice" class="text-sm text-gray-500 line-through">
            ${{ product.price }}
          </span>
          <span class="text-lg font-bold text-primary-600">
            ${{ product.discountedPrice || product.price }}
          </span>
        </div>

        <!-- Rating -->
        <div class="mt-2 flex items-center gap-1">
          <div class="flex">
            <svg *ngFor="let star of [1,2,3,4,5]" 
                 [class.text-yellow-400]="star <= product.ratings"
                 [class.text-gray-300]="star > product.ratings"
                 class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-sm text-gray-600">({{ product.ratings }})</span>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  isFavorite: boolean = false;

  constructor(private cartService: CartService) {}

  addToCart() {
    if (this.product.stock > 0) {
      this.cartService.addToCart(this.product);
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  quickView() {
    // Implement quick view modal
    console.log('Quick view:', this.product);
  }
}