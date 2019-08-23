import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleBooks } from 'src/app/service/google-books.service';
import { BooksManagerComponent } from './books-manager.component';
import { FilterComponent } from 'src/app/shared/filter/filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookService } from 'src/app/service/books.service';
import { BookEditeModalComponent } from 'src/app/shared/book/book-edite-modal/book-edite-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserDeleteModalComponent } from '../user-manager/user-delete-modal/user-delete-modal.component';

@NgModule({
  declarations: [
    BooksManagerComponent,
    FilterComponent,
    BookEditeModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ],
  entryComponents: [
    BookEditeModalComponent
  ],
  providers: [
    GoogleBooks,
    BookService
  ],
  exports: []
})
export class BooksManagerModule { }
