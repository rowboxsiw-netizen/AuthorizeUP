
import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CourseListComponent } from './components/pages/course-list/course-list.component';
import { CourseDetailComponent } from './components/pages/course-detail/course-detail.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MyCoursesComponent } from './components/pages/my-courses/my-courses.component';
import { WatchCourseComponent } from './components/pages/watch-course/watch-course.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { 
    path: 'my-courses', 
    component: MyCoursesComponent,
    canActivate: [authGuard] 
  },
  { 
    path: 'watch/:courseId', 
    component: WatchCourseComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  // Basic Admin Route Placeholder
  // A full implementation would have its own routing module
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./components/admin/admin-layout.component').then(c => c.AdminLayoutComponent),
    // data: { roles: ['admin'] } // For role-based guards
  },
  { path: '**', redirectTo: '' }
];
