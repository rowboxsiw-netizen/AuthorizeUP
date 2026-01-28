import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="flex flex-col min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <app-header></app-header>
      <main class="flex-grow">
        <app-home></app-home>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, HomeComponent, FooterComponent],
})
export class AppComponent {
  title = 'AuthorizeUp';
}
