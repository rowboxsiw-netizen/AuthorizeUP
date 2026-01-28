
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course, Chapter, Video } from '../../../models/course.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-watch-course',
  imports: [AsyncPipe, MatSidenavModule, MatListModule],
  template: `
    @if (course$ | async; as course) {
      <mat-sidenav-container class="h-screen w-full">
        <mat-sidenav #sidenav mode="side" opened class="w-80 border-r dark:border-gray-700">
           <div class="p-4 bg-gray-100 dark:bg-gray-800">
              <h3 class="text-lg font-bold">{{ course.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Course Content</p>
           </div>
           <mat-list>
            @for(chapter of course.chapters; track chapter.id) {
              <h3 mat-subheader class="font-semibold">{{ chapter.title }}</h3>
              @for(lesson of chapter.lessons; track lesson.id) {
                <mat-list-item (click)="selectLesson(lesson)" class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" [class.bg-indigo-100]="lesson.id === (selectedLesson()?.id)">
                  <span matListItemTitle>{{ lesson.title }}</span>
                  <span matListItemLine>{{ (lesson.duration / 60).toFixed(0) }} min</span>
                </mat-list-item>
              }
            }
           </mat-list>
        </mat-sidenav>
        <mat-sidenav-content class="bg-black">
          <div class="flex flex-col h-full">
            <div class="flex-grow flex items-center justify-center text-white">
              @if (selectedLesson(); as lesson) {
                <div class="w-full aspect-video bg-black flex flex-col items-center justify-center">
                   <i class="material-icons text-9xl">play_circle_filled</i>
                   <h2 class="text-3xl mt-4">{{ lesson.title }}</h2>
                   <p class="text-lg mt-2">Custom Video Player Placeholder</p>
                </div>
              } @else {
                 <p>Select a lesson to begin.</p>
              }
            </div>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    } @else {
      <p class="text-center p-12">Loading course...</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchCourseComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  course$: Observable<Course | undefined>;
  selectedLesson = signal<Video | null>(null);

  constructor() {
    const courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.course$ = this.courseService.getCourseById(courseId);
    this.course$.subscribe(course => {
      if (course?.chapters?.[0]?.lessons?.[0]) {
        this.selectedLesson.set(course.chapters[0].lessons[0]);
      }
    });
  }

  selectLesson(lesson: Video) {
    this.selectedLesson.set(lesson);
  }
}
