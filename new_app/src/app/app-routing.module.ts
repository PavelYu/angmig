import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'users',
    loadChildren: () => import('./features/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      breadcrumb: 'User Management',
      roles: ['ADMIN']
    }
  },
  {
    path: 'users/:id',
    loadChildren: () => import('./features/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'User Details' }
  },
  {
    path: 'users/:id/edit',
    loadChildren: () => import('./features/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      breadcrumb: 'Edit User',
      roles: ['ADMIN', 'EDITOR']
    }
  },
  {
    path: 'reports',
    loadChildren: () => import('./features/reporting/reporting.module').then(m => m.ReportingModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Reports' }
  },
  {
    path: 'reports/builder',
    loadChildren: () => import('./features/reporting/reporting.module').then(m => m.ReportingModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Report Builder' }
  },
  {
    path: 'reports/saved',
    loadChildren: () => import('./features/reporting/reporting.module').then(m => m.ReportingModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Saved Reports' }
  },
  {
    path: 'transactions',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Transactions' }
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      breadcrumb: 'Settings',
      roles: ['ADMIN', 'MANAGER']
    }
  },
  {
    path: 'login',
    // Lazy load login component if exists
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { breadcrumb: 'Login' }
  },
  {
    path: 'unauthorized',
    component: PageNotFoundComponent,
    data: { breadcrumb: 'Unauthorized' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { breadcrumb: 'Page Not Found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
