
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
<footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
  <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Solutions</h3>
        <ul class="mt-4 space-y-2">
          <li><a routerLink="#" class="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Marketing</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Support</h3>
        <ul class="mt-4 space-y-2">
          <li><a routerLink="#" class="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Company</h3>
        <ul class="mt-4 space-y-2">
          <li><a routerLink="#" class="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Legal</h3>
        <ul class="mt-4 space-y-2">
          <li><a routerLink="#" class="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
          <li><a routerLink="#" class="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex items-center justify-between">
      <p class="text-base text-gray-500 dark:text-gray-400">&copy; {{ currentYear }} SkillzUp, Inc. All rights reserved.</p>
    </div>
  </div>
</footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
