
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold">Admin Panel</h1>
      <div class="flex mt-4">
        <aside class="w-1/4">
          <nav class="flex flex-col space-y-2">
            <a routerLink="/admin" routerLinkActive="font-bold" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
            <a routerLink="/admin/courses" routerLinkActive="font-bold">Courses</a>
            <a routerLink="/admin/users" routerLinkActive="font-bold">Users</a>
          </nav>
        </aside>
        <main class="w-3/4 pl-8">
          <p>Admin content will go here. This is a placeholder for the admin dashboard, course management, etc.</p>
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {}
