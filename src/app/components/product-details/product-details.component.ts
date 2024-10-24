import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Gallery -->
        <div class="space-y-4">
          <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img [src]="selectedImage || product?.imageUrl" 
                 [alt]="product?.name"
                 class="h-full w-full object-cover">
          </div>
          
          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-4">
            <button *ngFor="let image of product?.images" 
                    (click)="selectedImage = image"
                    class="aspect-square rounded-lg overflow-hidden border-2"
                    [class.border-primary-500]="selectedImage === image"
                    [class.border-transparent]="selectedImage !== image">
              <img [src]="image" class="h-full w-full object-cover">
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ product?.name }}</h1>
            <p class="mt-2 text-gray-500">{{ product?.description }}</p>
          </div>

          <!-- Price -->
          <div class="flex items-center gap-4">
            <span *ngIf="product?.discountedPrice" 
                  class="text-2xl font-bold text-primary-600">
              ${{ product?.discountedPrice }}
            </span>
            <span [class.line-through]="product?.discountedPrice"
                  [class.text-gray-500]="product?.discountedPrice"
                  [class.text-2xl]="!product?.discountedPrice"
                  [class.font-bold]="!product?.discountedPrice"
                  [class.text-primary-600]="!product?.discountedPrice">
              ${{ product?.price }}
            </span>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded-full"
                 [class.bg-green-500]="product?.stock > 0"
                 [class.bg-red-500]="product?.stock === 0">
            </div>
            <span class="text-sm font-medium"
                  [class.text-green-700]="product?.stock > 0"
                  [class.text-red-700]="product?.stock === 0">
              {{ product?.stock > 0 ? 'In Stock' : 'Out of Stock' }}
              {{ product?.stock > 0 ? '(' + product?.stock + ' available)' : '' }}
            </span>
          </div>

          <!-- Actions -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="flex items-center border rounded-lg">
                <button (click)="updateQuantity(-1)"
                        class="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                        [disabled]="quantity <= 1">
                  -
                </button>
                <span class="px-4 py-2 text-gray-900">{{ quantity }}</span>
                <button (click)="updateQuantity(1)"
                        class="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                        [disabled]="quantity >= product?.stock">
                  +
                </button>
              </div>
              
              <button (click)="addToCart()"
                      class="btn-primary flex-grow"
                      [disabled]="product?.stock === 0">
                Add to Cart
              </button>
            </div>

            <button (click)="toggleFavorite()"
                    class="btn-secondary w-full flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   [class.text-red-500]="isFavorite"
                   class="h-5 w-5" 
                   [class.fill-current]="isFavorite" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
            </button>
          </div>

          <!-- Specifications -->
          <div class="border-t pt-6">
            <h2 class="text-lg font-semibold mb-4">Specifications</h2>
            <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div *ngFor="let spec of product?.specifications">
                <dt class="text-sm font-medium text-gray-500">{{ spec.name }}</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ spec.value }}</dd>
              </div>
            </dl>
          </div>

          <!-- Features -->
          <div class="border-t pt-6">
            <h2 class="text-lg font-semibold mb-4">Features</h2>
            <ul class="list-disc pl-5 space-y-2">
              <li *ngFor="let feature of product?.features" 
                  class="text-gray-600">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string | null = null;
  quantity: number = 1;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
        this.selectedImage = product.imageUrl;
      });
    }
  }

  updateQuantity(change: number) {
    const newQuantity = this.quantity + change;
    if (this.product && newQuantity >= 1 && newQuantity <= this.product.stock) {
      this.quantity = newQuantity;
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Implement favorite functionality with a service
  }
}