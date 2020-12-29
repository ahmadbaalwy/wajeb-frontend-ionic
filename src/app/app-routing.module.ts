import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'course-add',
    loadChildren: () => import('./course-add/course-add.module').then( m => m.CourseAddPageModule)
  },
  {
    path: 'course-delete',
    loadChildren: () => import('./course-delete/course-delete.module').then( m => m.CourseDeletePageModule)
  },
  {
    path: 'course-edit',
    loadChildren: () => import('./course-edit/course-edit.module').then( m => m.CourseEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
