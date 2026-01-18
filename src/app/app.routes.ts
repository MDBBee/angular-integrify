import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    async loadComponent() {
      const m = await import('./pages/home/home');
      return m.Home;
    },
  },
  {
    path: 'details/:id',
    async loadComponent() {
      const m = await import('./pages/product-details/product-details');
      return m.ProductDetails;
    },
  },
  {
    path: 'dashboard',
    async loadComponent() {
      const m = await import('./pages/dash/dash');
      return m.Dash;
    },
  },
];
