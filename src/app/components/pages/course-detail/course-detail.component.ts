
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { PaymentService } from '../../../services/payment.service';
import { Course } from '../../../models/course.model';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-detail',
  imports: [AsyncPipe, NgOptimizedImage, RouterLink, MatButtonModule, MatProgressSpinnerModule],
  template: `
    @if (course$ | async; as course) {
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="lg:grid lg:grid-cols-3 lg:gap-x-12">
          
          <div class="lg:col-span-2">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{{ course.title }}</h1>
            <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">{{ course.description }}</p>

            <div class="mt-6 flex items-center">
              @if(course.isBestseller) {
                <span class="inline-block mr-3 bg-yellow-300 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Bestseller</span>
              }
              <span class="text-yellow-500 font-bold">{{ course.rating }}</span>
              <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">({{ course.reviews.toLocaleString() }} ratings)</span>
            </div>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Created by <span class="font-medium text-indigo-600">{{ course.instructor }}</span></p>

            <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">What you'll learn</h2>
              <ul class="mt-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
                @for(item of course.whatYoullLearn; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          </div>

          <div class="mt-10 lg:mt-0">
             <div class="rounded-lg bg-white dark:bg-gray-800 shadow-xl overflow-hidden sticky top-24">
               <img [ngSrc]="course.imageUrl" [alt]="course.title" class="w-full h-56 object-cover" width="600" height="338">
               <div class="p-6">
                 <p class="flex items-baseline">
                   <span class="text-3xl font-bold text-gray-900 dark:text-white">$\{{ course.price }}</span>
                   @if(course.originalPrice) {
                     <span class="ml-3 text-lg text-gray-500 dark:text-gray-400 line-through">$\{{ course.originalPrice }}</span>
                   }
                 </p>
                 <button mat-flat-button color="primary" class="w-full mt-6" [disabled]="paymentService.isProcessing()" (click)="purchase(course)">
                   @if(paymentService.isProcessing()) {
                     <mat-spinner [diameter]="24" class="inline-block mr-2"></mat-spinner>
                     <span>Processing...</span>
                   } @else {
                     <span>Buy Now</span>
                   }
                 </button>
                 @if(purchaseMessage()) {
                   <p class="mt-4 text-center text-green-600">{{ purchaseMessage() }}</p>
                 }
               </div>
             </div>
          </div>

        </div>
      </div>
    } @else {
      <p class="text-center p-12">Loading course...</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  paymentService = inject(PaymentService);

  course$: Observable<Course | undefined>;
  purchaseMessage = signal<string | null>(null);

  constructor() {
    const courseId = this.route.snapshot.paramMap.get('id')!;
    this.course$ = this.courseService.getCourseById(courseId);
  }

  async purchase(course: Course) {
    const result = await this.paymentService.processPayment(course);
    if (result.success) {
      this.purchaseMessage.set('Purchase successful! You can now find this course in "My Learning".');
    }
  }
}
