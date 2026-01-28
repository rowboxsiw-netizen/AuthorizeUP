
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Course } from '../../models/course.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class CourseCardComponent {
  course = input.required<Course>();
}
