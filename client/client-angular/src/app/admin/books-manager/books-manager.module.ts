import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleBooks } from 'src/app/service/google-books.service';
import { BooksManagerComponent } from './books-manager.component';
import { FilterComponent } from 'src/app/shared/filter/filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookService } from 'src/app/service/books.service';

@NgModule({
  declarations: [
    BooksManagerComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
  ],
  providers: [
    GoogleBooks,
    BookService
  ],
  exports: []
})
export class BooksManagerModule { }
