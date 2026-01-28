
export interface Video {
  id: string;
  title: string;
  duration: number; // in seconds
  videoUrl: string; // This would be a secured URL in a real app
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Video[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviews: number;
  isBestseller?: boolean;
  description: string;
  whatYoullLearn: string[];
  chapters: Chapter[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
}
