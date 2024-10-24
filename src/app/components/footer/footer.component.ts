import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-900 text-gray-300">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- About -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">About E-Shop</h3>
            <p class="text-sm leading-relaxed">
              We're dedicated to providing the best shopping experience with quality products and exceptional service.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/products" class="hover:text-white transition-colors">Shop</a></li>
              <li><a href="/categories" class="hover:text-white transition-colors">Categories</a></li>
              <li><a href="/deals" class="hover:text-white transition-colors">Deals</a></li>
              <li><a href="/new-arrivals" class="hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/contact" class="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/shipping" class="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="/returns" class="hover:text-white transition-colors">Returns</a></li>
              <li><a href="/faq" class="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p class="text-sm mb-4">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <form class="flex gap-2">
              <input type="email" 
                     placeholder="Your email"
                     class="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <button type="submit" 
                      class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-800">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm">&copy; 2024 E-Shop. All rights reserved.</p>
            
            <!-- Social Links -->
            <div class="flex gap-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}