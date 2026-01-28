
import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  
  // Private signal to hold the current user state
  #currentUser = signal<User | null | undefined>(undefined);

  // Public computed signals derived from the user state
  public currentUser = this.#currentUser.asReadonly();
  public isLoggedIn = computed(() => !!this.#currentUser());
  public isLoggedOut = computed(() => !this.#currentUser());
  public isAdmin = computed(() => this.#currentUser()?.roles.includes('admin') ?? false);

  constructor() {
    // In a real app, you would check for a stored token or session here
    // For this mock, we'll start logged out.
    this.#currentUser.set(null);
  }

  // Mock login
  async login(email: string, password: string): Promise<User> {
    console.log(`Attempting to log in with ${email}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'admin@skillzup.com' && password === 'admin123') {
      const adminUser: User = {
        uid: 'admin123',
        email: 'admin@skillzup.com',
        displayName: 'Admin User',
        roles: ['student', 'admin'],
      };
      this.#currentUser.set(adminUser);
      this.router.navigateByUrl('/my-courses');
      return adminUser;
    }

    if (password === 'password123') { // Mock success
      const user: User = {
        uid: 'user123',
        email: email,
        displayName: 'John Doe',
        roles: ['student'],
      };
      this.#currentUser.set(user);
      this.router.navigateByUrl('/my-courses');
      return user;
    } else { // Mock failure
      throw new Error('Invalid credentials');
    }
  }

  // Mock signup
  async signup(email: string, password: string): Promise<User> {
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1000));
     const user: User = {
      uid: 'newUser' + Math.random(),
      email: email,
      displayName: 'New User',
      roles: ['student'],
    };
    this.#currentUser.set(user);
    this.router.navigateByUrl('/my-courses');
    return user;
  }


  // Mock logout
  logout() {
    this.#currentUser.set(null);
    this.router.navigateByUrl('/login');
  }
}
