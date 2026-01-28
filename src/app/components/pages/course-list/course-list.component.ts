
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { CourseCardComponent } from '../../shared/course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  imports: [CourseCardComponent],
  template: `
    <div class="bg-white dark:bg-gray-800">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">All Courses</h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">Find your next learning adventure from our complete collection.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          @for (course of courses(); track course.id) {
            <app-course-card [course]="course"></app-course-card>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  private courseService = inject(CourseService);
  courses = this.courseService.allCourses;
}
