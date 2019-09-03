import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookComponent } from './book/book.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { AddBookModalComponent } from './book/book-add-modal/add-book-modal.component';
import { BookDeleteFromFavModalComponent } from './book/book-delete-from-fav-modal/book-delete-from-fav-modal.component';
import { BookDeleteModalComponent } from './book/book-delete-modal/book-delete-modal.component';
import { BookEditeModalComponent } from './book/book-edite-modal/book-edite-modal.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    BookComponent,
    AddBookModalComponent,
    BookDeleteFromFavModalComponent,
    BookDeleteModalComponent,
    BookEditeModalComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddBookModalComponent,
    BookDeleteFromFavModalComponent,
    BookDeleteModalComponent,
    BookEditeModalComponent
  ],
  providers: [
    AddBookModalComponent,
    BookDeleteFromFavModalComponent,
    BookDeleteModalComponent,
    BookEditeModalComponent
  ],
  exports: [
    BookComponent,
    FilterComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
