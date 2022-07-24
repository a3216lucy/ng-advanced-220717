import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login2', component: Login2Component },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'SB Admin 2 - Dashboard',
      },
      { path: 'page1', component: Page1Component, title: 'SB Admin 2 - Page1' },
      { path: 'page2', component: Page2Component, title: 'SB Admin 2 - Page2' },
      {
        path: 'utilities',
        loadChildren: () =>
          import('./utilities/utilities.module').then((m) => m.UtilitiesModule),
      },
    ],
  },
  // { path: '**', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
