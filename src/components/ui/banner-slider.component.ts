
import { Component, ChangeDetectionStrategy, inject, signal, onInit, OnDestroy } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class BannerSliderComponent implements onInit, OnDestroy {
  private courseService = inject(CourseService);
  banners = this.courseService.getBanners();
  currentIndex = signal(0);
  private intervalId: any;

  ngonInit() {
    this.startSlider();
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopSlider() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.banners().length);
  }

  previous() {
    this.currentIndex.update(i => (i - 1 + this.banners().length) % this.banners().length);
  }

  goToIndex(index: number) {
    this.currentIndex.set(index);
  }
}
