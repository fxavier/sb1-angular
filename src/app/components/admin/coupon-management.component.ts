import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Coupon } from '../../models/product.model';

@Component({
  selector: 'app-coupon-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Coupon Management</h1>
        <button (click)="showCreateForm = true" class="btn-primary">
          Add New Coupon
        </button>
      </div>

      <!-- Create/Edit Form -->
      <div *ngIf="showCreateForm || editingCoupon" class="card mb-8">
        <h2 class="text-xl font-semibold mb-4">
          {{ editingCoupon ? 'Edit Coupon' : 'Create New Coupon' }}
        </h2>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Code</label>
              <input type="text" [(ngModel)]="formData.code" name="code" class="input-field">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Discount (%)</label>
              <input type="number" [(ngModel)]="formData.discount" name="discount" class="input-field">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Valid Until</label>
              <input type="date" [(ngModel)]="formData.validUntil" name="validUntil" class="input-field">
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <button type="button" 
                    (click)="cancelEdit()"
                    class="btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              {{ editingCoupon ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Coupons List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let coupon of coupons" class="card">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">{{ coupon.code }}</h3>
              <p class="text-sm text-gray-600">{{ coupon.discount }}% off</p>
              <p class="text-sm text-gray-600">
                Valid until: {{ coupon.validUntil | date }}
              </p>
            </div>
            <span [class.bg-green-100]="isValid(coupon)"
                  [class.text-green-800]="isValid(coupon)"
                  [class.bg-red-100]="!isValid(coupon)"
                  [class.text-red-800]="!isValid(coupon)"
                  class="px-2 py-1 rounded-full text-xs font-medium">
              {{ isValid(coupon) ? 'Active' : 'Expired' }}
            </span>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <button (click)="editCoupon(coupon)" 
                    class="btn-secondary">
              Edit
            </button>
            <button (click)="deleteCoupon(coupon.code)" 
                    class="btn-secondary text-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CouponManagementComponent implements OnInit {
  coupons: Coupon[] = [];
  showCreateForm = false;
  editingCoupon: Coupon | null = null;
  formData: Partial<Coupon> = {};

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // Load coupons
  }

  isValid(coupon: Coupon): boolean {
    return new Date(coupon.validUntil) > new Date();
  }

  editCoupon(coupon: Coupon) {
    this.editingCoupon = coupon;
    this.formData = { ...coupon };
  }

  cancelEdit() {
    this.editingCoupon = null;
    this.showCreateForm = false;
    this.formData = {};
  }

  onSubmit() {
    if (this.editingCoupon) {
      this.adminService.updateCoupon(this.formData as Coupon).subscribe(() => {
        this.cancelEdit();
      });
    } else {
      this.adminService.createCoupon(this.formData as Coupon).subscribe(() => {
        this.cancelEdit();
      });
    }
  }

  deleteCoupon(couponCode: string) {
    if (confirm('Are you sure you want to delete this coupon?')) {
      this.adminService.deleteCoupon(couponCode).subscribe();
    }
  }
}