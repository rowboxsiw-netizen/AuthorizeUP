
import { Injectable, signal, computed } from '@angular/core';
import { Course, Banner } from '../models/course.model';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'The Complete 2024 Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      price: 19.99,
      originalPrice: 89.99,
      imageUrl: 'https://picsum.photos/seed/course1/600/400',
      category: 'Web Development',
      rating: 4.8,
      reviews: 250123,
      isBestseller: true,
      description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps.',
      whatYoullLearn: [
        'Build 16 web development projects for your portfolio.',
        'Master the latest technologies, including Javascript, React, Node and even Web3 development.',
        'Work as a freelance web developer.',
        'Master frontend development with React.'
      ],
      chapters: [
        { id: 'c1', title: 'Introduction', lessons: [{id: 'v1', title: 'Welcome!', duration: 120, videoUrl: ''}]},
        { id: 'c2', title: 'HTML Basics', lessons: [{id: 'v2', title: 'Your First Web Page', duration: 350, videoUrl: ''}]}
      ]
    },
    {
      id: '2',
      title: 'Angular - The Complete Guide (2024 Edition)',
      instructor: 'Maximilian Schwarzmüller',
      price: 24.99,
      originalPrice: 99.99,
      imageUrl: 'https://picsum.photos/seed/course2/600/400',
      category: 'Web Development',
      rating: 4.7,
      reviews: 180543,
      isBestseller: true,
      description: 'Master Angular 18 (formerly "Angular 2") and build awesome, reactive web apps with the successor of Angular.js',
      whatYoullLearn: ['Develop modern, complex, responsive and scalable web applications with Angular 18', 'Use the gained, deep understanding of the Angular fundamentals to quickly establish yourself as a frontend developer', 'Fully understand the architecture behind an Angular application and how to use it'],
      chapters: [
        { id: 'c1', title: 'Getting Started', lessons: [{id: 'v1', title: 'What is Angular?', duration: 420, videoUrl: ''}]}
      ]
    },
    {
      id: '3',
      title: 'The Ultimate Drawing Course - Beginner to Advanced',
      instructor: 'Jaysen Aaron',
      price: 14.99,
      originalPrice: 79.99,
      imageUrl: 'https://picsum.photos/seed/course3/600/400',
      category: 'Design',
      rating: 4.6,
      reviews: 95432,
      description: 'Learn the #1 most important building block of all art, Drawing. This course will teach you how to draw like a pro!',
      whatYoullLearn: ['Draw objects out of your head', 'Understand the fundamentals of art', 'Draw realistic light and shadow'],
      chapters: []
    },
  ];

  private banners: Banner[] = [
    {
      id: 'b1',
      title: 'Unlock Your Potential',
      subtitle: 'Learn the latest skills to advance your career. Sale ends tonight!',
      imageUrl: 'https://picsum.photos/seed/banner1/1200/600',
      ctaText: 'Explore Courses'
    },
    {
      id: 'b2',
      title: 'New! AI for Everyone',
      subtitle: 'Master Artificial Intelligence and Machine Learning concepts.',
      imageUrl: 'https://picsum.photos/seed/banner2/1200/600',
      ctaText: 'Learn AI Now'
    }
  ];

  #courses = signal<Course[]>(this.courses);
  #banners = signal<Banner[]>(this.banners);

  allCourses = this.#courses.asReadonly();
  allBanners = this.#banners.asReadonly();

  getCourseById(id: string) {
    const course = this.#courses().find(c => c.id === id);
    return of(course); // Return as observable to simulate async call
  }
}
