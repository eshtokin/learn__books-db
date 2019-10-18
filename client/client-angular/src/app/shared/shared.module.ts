
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookComponent } from './book/book.component';
import { AddBookModalComponent } from './book/book-add-modal/add-book-modal.component';
import { BookDeleteFromFavModalComponent } from './book/book-delete-from-fav-modal/book-delete-from-fav-modal.component';
import { BookDeleteModalComponent } from './book/book-delete-modal/book-delete-modal.component';
import { BookEditeModalComponent } from './book/book-edite-modal/book-edite-modal.component';
import { FilterComponent } from './filter/filter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/users.service';
import { MatPaginatorModule } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
  declarations: [
    BookComponent,
    AddBookModalComponent,
    BookDeleteFromFavModalComponent,
    BookDeleteModalComponent,
    BookEditeModalComponent,
    FilterComponent,
    ModalComponent,
    ErrorModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    AddBookModalComponent,
    BookDeleteFromFavModalComponent,
    BookDeleteModalComponent,
    BookEditeModalComponent
  ],
  providers: [
    UserService
  ],
  exports: [
    BookComponent,
    FilterComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    ModalComponent,
    ErrorModalComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
