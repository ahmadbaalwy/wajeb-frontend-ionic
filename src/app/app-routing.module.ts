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
  {
    path: 'classroom-teacher-main',
    loadChildren: () => import('./classroom-teacher-main/classroom-teacher-main.module').then( m => m.ClassroomTeacherMainPageModule)
  },
  {
    path: 'classroom-edit',
    loadChildren: () => import('./classroom-edit/classroom-edit.module').then( m => m.ClassroomEditPageModule)
  },
  {
    path: 'classroom-delete',
    loadChildren: () => import('./classroom-delete/classroom-delete.module').then( m => m.ClassroomDeletePageModule)
  },
  {
    path: 'classroom-add',
    loadChildren: () => import('./classroom-add/classroom-add.module').then( m => m.ClassroomAddPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
