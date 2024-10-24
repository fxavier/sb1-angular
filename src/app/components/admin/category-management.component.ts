import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Category Management</h1>
        <button (click)="showCreateForm = true" class="btn-primary">
          Add New Category
        </button>
      </div>

      <!-- Create/Edit Form -->
      <div *ngIf="showCreateForm || editingCategory" class="card mb-8">
        <h2 class="text-xl font-semibold mb-4">
          {{ editingCategory ? 'Edit Category' : 'Create New Category' }}
        </h2>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" [(ngModel)]="formData.name" name="name" class="input-field">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea [(ngModel)]="formData.description" name="description" rows="3" class="input-field"></textarea>
          </div>

          <div class="flex justify-end gap-4">
            <button type="button" 
                    (click)="cancelEdit()"
                    class="btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              {{ editingCategory ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Categories List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let category of categories" class="card">
          <h3 class="font-semibold">{{ category.name }}</h3>
          <p class="text-sm text-gray-600">{{ category.description }}</p>

          <div class="mt-4 flex justify-end gap-2">
            <button (click)="editCategory(category)" 
                    class="btn-secondary">
              Edit
            </button>
            <button (click)="deleteCategory(category.id)" 
                    class="btn-secondary text-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  showCreateForm = false;
  editingCategory: Category | null = null;
  formData: Partial<Category> = {};

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // Load categories
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.formData = { ...category };
  }

  cancelEdit() {
    this.editingCategory = null;
    this.showCreateForm = false;
    this.formData = {};
  }

  onSubmit() {
    if (this.editingCategory) {
      this.adminService.updateCategory(this.formData as Category).subscribe(() => {
        this.cancelEdit();
      });
    } else {
      this.adminService.createCategory(this.formData as Category).subscribe(() => {
        this.cancelEdit();
      });
    }
  }

  deleteCategory(categoryId: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.adminService.deleteCategory(categoryId).subscribe();
    }
  }
}