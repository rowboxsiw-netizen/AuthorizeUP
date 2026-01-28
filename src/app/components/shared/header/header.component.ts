
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
<header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
  <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <a routerLink="/" class="flex-shrink-0 flex items-center gap-2">
          <svg class="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">SkillzUp</span>
        </a>
      </div>
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-4">
          <a routerLink="/" routerLinkActive="bg-gray-100 dark:bg-gray-700" [routerLinkActiveOptions]="{exact: true}" class="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
          <a routerLink="/courses" routerLinkActive="bg-gray-100 dark:bg-gray-700" class="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Courses</a>
          @if (authService.isLoggedIn()) {
            <a routerLink="/my-courses" routerLinkActive="bg-gray-100 dark:bg-gray-700" class="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">My Learning</a>
            @if (authService.isAdmin()) {
               <a routerLink="/admin" routerLinkActive="bg-gray-100 dark:bg-gray-700" class="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Admin</a>
            }
          }
        </div>
      </div>
      <div class="hidden md:flex items-center space-x-4">
        @if (authService.isLoggedOut()) {
          <a routerLink="/login" class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Log in</a>
          <a routerLink="/signup" class="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign up</a>
        } @else {
          <span class="text-sm font-medium text-gray-700 dark:text-gray-200">Welcome, {{ authService.currentUser()?.displayName || 'User' }}</span>
          <button (click)="authService.logout()" class="ml-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Log out</button>
        }
      </div>
      <div class="-mr-2 flex md:hidden">
        <button (click)="toggleMenu()" type="button" class="bg-gray-100 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" [class.hidden]="isMenuOpen()" [class.block]="!isMenuOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg class="h-6 w-6" [class.hidden]="!isMenuOpen()" [class.block]="isMenuOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  </nav>

  @if (isMenuOpen()) {
    <div class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a routerLink="/" routerLinkActive="bg-gray-100 dark:bg-gray-700" [routerLinkActiveOptions]="{exact: true}" class="block px-3 py-2 rounded-md text-base font-medium">Home</a>
        <a routerLink="/courses" routerLinkActive="bg-gray-100 dark:bg-gray-700" class="block px-3 py-2 rounded-md text-base font-medium">Courses</a>
        @if (authService.isLoggedIn()) {
          <a routerLink="/my-courses" routerLinkActive="bg-gray-100 dark:bg-gray-700" class="block px-3 py-2 rounded-md text-base font-medium">My Learning</a>
        }
      </div>
    </div>
  }
</header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  authService = inject(AuthService);
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
}
