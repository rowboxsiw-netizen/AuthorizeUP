
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { BannerSliderComponent } from '../ui/banner-slider.component';
import { CourseCardComponent } from '../ui/course-card.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BannerSliderComponent, CourseCardComponent, NgOptimizedImage],
})
export class HomeComponent {
  private courseService = inject(CourseService);
  courses = this.courseService.getCourses();
}
