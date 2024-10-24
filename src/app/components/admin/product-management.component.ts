import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Product Management</h1>
        <button (click)="showCreateForm = true" class="btn-primary">
          Add New Product
        </button>
      </div>

      <!-- Create/Edit Form -->
      <div *ngIf="showCreateForm || editingProduct" class="card mb-8">
        <h2 class="text-xl font-semibold mb-4">
          {{ editingProduct ? 'Edit Product' : 'Create New Product' }}
        </h2>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" [(ngModel)]="formData.name" name="name" class="input-field">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" [(ngModel)]="formData.price" name="price" class="input-field">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" [(ngModel)]="formData.stock" name="stock" class="input-field">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <select [(ngModel)]="formData.category" name="category" class="input-field">
                <option *ngFor="let category of categories" [value]="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea [(ngModel)]="formData.description" name="description" rows="3" class="input-field"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Images</label>
            <div class="mt-2 flex items-center gap-4">
              <input type="file" 
                     accept="image/*" 
                     multiple 
                     (change)="onImageUpload($event)"
                     class="hidden" 
                     #fileInput>
              <button type="button" 
                      (click)="fileInput.click()"
                      class="btn-secondary">
                Upload Images
              </button>
              <div class="flex gap-2">
                <div *ngFor="let image of formData.images" 
                     class="relative w-16 h-16">
                  <img [src]="image" 
                       class="w-full h-full object-cover rounded">
                  <button type="button"
                          (click)="removeImage(image)"
                          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <button type="button" 
                    (click)="cancelEdit()"
                    class="btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              {{ editingProduct ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Products List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let product of products" class="card">
          <div class="flex gap-4">
            <img [src]="product.imageUrl" 
                 [alt]="product.name"
                 class="w-24 h-24 object-cover rounded">
            <div class="flex-grow">
              <h3 class="font-semibold">{{ product.name }}</h3>
              <p class="text-sm text-gray-600">${{ product.price }}</p>
              <p class="text-sm text-gray-600">Stock: {{ product.stock }}</p>
            </div>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <button (click)="editProduct(product)" 
                    class="btn-secondary">
              Edit
            </button>
            <button (click)="deleteProduct(product.id)" 
                    class="btn-secondary text-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  showCreateForm = false;
  editingProduct: Product | null = null;
  formData: Partial<Product> = {};

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // Load products and categories
  }

  onImageUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach(file => {
        this.adminService.uploadProductImage(file).subscribe(url => {
          this.formData.images = [...(this.formData.images || []), url];
        });
      });
    }
  }

  removeImage(imageUrl: string) {
    this.formData.images = this.formData.images?.filter(url => url !== imageUrl);
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.formData = { ...product };
  }

  cancelEdit() {
    this.editingProduct = null;
    this.showCreateForm = false;
    this.formData = {};
  }

  onSubmit() {
    if (this.editingProduct) {
      this.adminService.updateProduct(this.formData as Product).subscribe(() => {
        this.cancelEdit();
      });
    } else {
      this.adminService.createProduct(this.formData as Product).subscribe(() => {
        this.cancelEdit();
      });
    }
  }

  deleteProduct(productId: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(productId).subscribe();
    }
  }
}