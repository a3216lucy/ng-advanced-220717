import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
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
    ],
  },
  {
    path: 'utilities',
    component: LayoutComponent,
    loadChildren: () =>
      import('src/app/utilities/utilities.module').then(
        (m) => m.UtilitiesModule
      ),
  },
  // { path: '**', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
