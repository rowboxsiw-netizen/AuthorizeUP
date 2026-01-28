import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { BannerSliderComponent } from '../ui/banner-slider.component';
import { CourseCardComponent } from '../ui/course-card.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <app-banner-slider></app-banner-slider>
  
  <section class="mt-12">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Featured Courses</h2>
    <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">A broad selection of courses to help you achieve your goals.</p>
    
    <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
      @for (course of courses(); track course.id) {
        <app-course-card [course]="course"></app-course-card>
      }
    </div>
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BannerSliderComponent, CourseCardComponent, NgOptimizedImage],
})
export class HomeComponent {
  private courseService = inject(CourseService);
  courses = this.courseService.getCourses();
}
