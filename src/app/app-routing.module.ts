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
  {
    path: 'quizz-add',
    loadChildren: () => import('./quizz-add/quizz-add.module').then( m => m.QuizzAddPageModule)
  },
  {
    path: 'quizz-list',
    loadChildren: () => import('./quizz-list/quizz-list.module').then( m => m.QuizzListPageModule)
  },
  {
    path: 'quizz-teacher-main',
    loadChildren: () => import('./quizz-teacher-main/quizz-teacher-main.module').then( m => m.QuizzTeacherMainPageModule)
  },
  {
    path: 'quizz-edit',
    loadChildren: () => import('./quizz-edit/quizz-edit.module').then( m => m.QuizzEditPageModule)
  },
  {
    path: 'quizz-delete',
    loadChildren: () => import('./quizz-delete/quizz-delete.module').then( m => m.QuizzDeletePageModule)
  },
  {
    path: 'question-add-select',
    loadChildren: () => import('./question-add-select/question-add-select.module').then( m => m.QuestionAddSelectPageModule)
  },
  {
    path: 'question-add-mcq',
    loadChildren: () => import('./question-add-mcq/question-add-mcq.module').then( m => m.QuestionAddMcqPageModule)
  },
  {
    path: 'question-add-tf',
    loadChildren: () => import('./question-add-tf/question-add-tf.module').then( m => m.QuestionAddTfPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'student-home',
    loadChildren: () => import('./student-home/student-home.module').then( m => m.StudentHomePageModule)
  },
  {
    path: 'student-classroom-search',
    loadChildren: () => import('./student-classroom-search/student-classroom-search.module').then( m => m.StudentClassroomSearchPageModule)
  },
  {
    path: 'teacher-enrollments-pending',
    loadChildren: () => import('./teacher-enrollments-pending/teacher-enrollments-pending.module').then( m => m.TeacherEnrollmentsPendingPageModule)
  },
  {
    path: 'teacher-enrollments-approved',
    loadChildren: () => import('./teacher-enrollments-approved/teacher-enrollments-approved.module').then( m => m.TeacherEnrollmentsApprovedPageModule)
  },
  {
    path: 'classroom-student-main',
    loadChildren: () => import('./classroom-student-main/classroom-student-main.module').then( m => m.ClassroomStudentMainPageModule)
  },
  {
    path: 'student-chances-main',
    loadChildren: () => import('./student-chances-main/student-chances-main.module').then( m => m.StudentChancesMainPageModule)
  },
  {
    path: 'student-chances-continue',
    loadChildren: () => import('./student-chances-continue/student-chances-continue.module').then( m => m.StudentChancesContinuePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
