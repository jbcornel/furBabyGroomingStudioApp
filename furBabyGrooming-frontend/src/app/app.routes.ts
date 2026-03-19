import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'reviews',
    loadComponent: () =>
      import('./components/reviews/reviews.component').then(m => m.ReviewsComponent)
  },
  {
    path: 'appointment',
    loadComponent: () =>
      import('./components/appointment/appointment.component').then(m => m.AppointmentComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
