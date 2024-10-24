import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Order } from '../../models/product.model';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Order Management</h1>

      <div class="card">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let order of orders">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.date | date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.user?.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ order.total }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded-full"
                        [ngClass]="{
                          'bg-yellow-100 text-yellow-800': order.status === 'pending',
                          'bg-blue-100 text-blue-800': order.status === 'processing',
                          'bg-purple-100 text-purple-800': order.status === 'shipped',
                          'bg-green-100 text-green-800': order.status === 'delivered'
                        }">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select (change)="updateOrderStatus(order.id, $event)"
                          class="input-field text-sm">
                    <option value="pending" [selected]="order.status === 'pending'">Pending</option>
                    <option value="processing" [selected]="order.status === 'processing'">Processing</option>
                    <option value="shipped" [selected]="order.status === 'shipped'">Shipped</option>
                    <option value="delivered" [selected]="order.status === 'delivered'">Delivered</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  updateOrderStatus(orderId: string, event: Event) {
    const status = (event.target as HTMLSelectElement).value as Order['status'];
    this.adminService.updateOrderStatus(orderId, status).subscribe();
  }
}