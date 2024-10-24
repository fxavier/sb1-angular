import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product, Category } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <!-- Category Navigation -->
    <nav class="border-b bg-white shadow-sm">
      <div class="container mx-auto">
        <ul class="flex overflow-x-auto whitespace-nowrap px-4 py-3 gap-8 text-sm font-medium">
          <li *ngFor="let category of categories" class="group relative">
            <button class="flex items-center gap-1 hover:text-primary-600 transition-colors">
              {{ category.name }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown -->
            <div class="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg bg-white p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a *ngFor="let subcategory of ['New Arrivals', 'Best Sellers', 'Sale']" 
                 href="#"
                 class="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {{ subcategory }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
          <div class="sticky top-4 space-y-6">
            <!-- Search -->
            <div class="card">
              <div class="relative">
                <input type="text" 
                       placeholder="Search products..."
                       class="input-field pl-10"
                       (input)="onSearch($event)">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Price Range -->
            <div class="card">
              <h3 class="text-lg font-semibold mb-4">Price Range</h3>
              <div class="space-y-2">
                <div class="flex gap-4">
                  <input type="number" placeholder="Min" class="input-field" [(ngModel)]="filters.minPrice">
                  <input type="number" placeholder="Max" class="input-field" [(ngModel)]="filters.maxPrice">
                </div>
                <button (click)="applyFilters()" 
                        class="btn-secondary w-full">
                  Apply
                </button>
              </div>
            </div>

            <!-- Categories -->
            <div class="card">
              <h3 class="text-lg font-semibold mb-4">Categories</h3>
              <div class="space-y-2">
                <label *ngFor="let category of categories" 
                       class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" 
                         [checked]="filters.categories?.includes(category.id)"
                         (change)="toggleCategory(category.id)">
                  <span>{{ category.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="lg:w-3/4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <app-product-card *ngFor="let product of filteredProducts" 
                            [product]="product"
                            class="animate-fade-in">
            </app-product-card>
          </div>

          <!-- Empty State -->
          <div *ngIf="filteredProducts.length === 0" 
               class="text-center py-12">
            <p class="text-gray-500">No products found matching your criteria</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  filters = {
    minPrice: null as number | null,
    maxPrice: null as number | null,
    categories: [] as string[]
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.productService.searchProducts(query).subscribe(products => {
      this.filteredProducts = products;
    });
  }

  toggleCategory(categoryId: string) {
    const index = this.filters.categories.indexOf(categoryId);
    if (index > -1) {
      this.filters.categories.splice(index, 1);
    } else {
      this.filters.categories.push(categoryId);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.productService.filterProducts(this.filters).subscribe(products => {
      this.filteredProducts = products;
    });
  }
}