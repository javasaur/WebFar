import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import {FsComponent} from './fs/fs.component';
import {FileeditorComponent} from './fileeditor/fileeditor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/fs/?path=root',
    pathMatch: 'full'
  },
  {
    path: 'fs',
    component: FsComponent,
    data: {
      reuse: true
    }
  },
  {
    path: 'fs/:path',
    component: FsComponent,
    data: {
      reuse: true
    }
  },
  {
    path: 'editor',
    component: FileeditorComponent
  },
  {
    path: 'editor?:path',
    component: FileeditorComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
