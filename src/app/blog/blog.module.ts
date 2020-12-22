import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { ArchivesComponent } from './archives/archives.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    component: ArchivesComponent, 
    pathMatch: 'full',
  },
  {
    path: 'post/:slug', 
    component: PostComponent,
  }
];

@NgModule({
  declarations: [PostComponent, ArchivesComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)],
})
export class BlogModule { }
