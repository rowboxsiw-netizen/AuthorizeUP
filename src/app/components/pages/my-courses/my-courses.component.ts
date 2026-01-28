
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { CourseCardComponent } from '../../shared/course-card/course-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  imports: [CourseCardComponent, RouterLink],
  template: `
    <div class="bg-white dark:bg-gray-800">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">My Learning</h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">Welcome back! Continue your learning journey.</p>
        
        <!-- This is mock data. In a real app, you'd fetch only the user's purchased courses. -->
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          @for (course of purchasedCourses(); track course.id) {
            <div class="relative">
              <app-course-card [course]="course"></app-course-card>
              <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                <a [routerLink]="['/watch', course.id]" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg">
                  Start Watching
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCoursesComponent {
  private courseService = inject(CourseService);
  // Mock: showing first 2 courses as purchased
  purchasedCourses = () => this.courseService.allCourses().slice(0, 2);
}
