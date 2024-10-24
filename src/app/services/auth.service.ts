import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);

  login(email: string, password: string): Observable<User> {
    // Simulate API call
    return new Observable(observer => {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        address: '123 Main St',
        orders: []
      };
      this.currentUser.next(mockUser);
      observer.next(mockUser);
      observer.complete();
    });
  }

  logout() {
    this.currentUser.next(null);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable(observer => {
      this.currentUser.subscribe(user => {
        observer.next(!!user);
      });
    });
  }
}