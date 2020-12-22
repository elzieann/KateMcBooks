import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    component: BooksComponent, 
    pathMatch: 'full',
  },
  {
    path: ':bookName', 
    component: BookComponent,
  }
];

@NgModule({
  declarations: [BooksComponent, BookComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class BooksModule { }
