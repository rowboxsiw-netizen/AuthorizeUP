
import { Injectable, signal } from '@angular/core';
import { Course, Banner } from '../models/course.model';

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
    },
    {
      id: '4',
      title: 'Digital Marketing Masterclass - 23 Courses in 1',
      instructor: 'Phil Ebiner',
      price: 29.99,
      originalPrice: 129.99,
      imageUrl: 'https://picsum.photos/seed/course4/600/400',
      category: 'Marketing',
      rating: 4.5,
      reviews: 110231,
    },
     {
      id: '5',
      title: 'Python for Data Science and Machine Learning Bootcamp',
      instructor: 'Jose Portilla',
      price: 22.99,
      originalPrice: 94.99,
      imageUrl: 'https://picsum.photos/seed/course5/600/400',
      category: 'Data Science',
      rating: 4.9,
      reviews: 312890,
      isBestseller: true,
    },
    {
      id: '6',
      title: 'Graphic Design Masterclass - Learn GREAT Design',
      instructor: 'Lindsay Marsh',
      price: 18.99,
      originalPrice: 84.99,
      imageUrl: 'https://picsum.photos/seed/course6/600/400',
      category: 'Design',
      rating: 4.7,
      reviews: 78432,
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
    },
    {
      id: 'b3',
      title: 'Design Like a Pro',
      subtitle: 'From fundamentals to advanced techniques in UI/UX design.',
      imageUrl: 'https://picsum.photos/seed/banner3/1200/600',
      ctaText: 'Start Designing'
    },
  ];

  courses$ = signal<Course[]>(this.courses);
  banners$ = signal<Banner[]>(this.banners);

  getCourses() {
    return this.courses$;
  }

  getBanners() {
    return this.banners$;
  }
}
