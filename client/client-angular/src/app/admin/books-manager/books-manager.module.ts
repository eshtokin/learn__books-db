import { NgModule } from '@angular/core';
import { GoogleBooks } from 'src/app/service/google-books.service';
import { BooksManagerComponent } from './books-manager.component';
import { FilterComponent } from 'src/app/shared/filter/filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookService } from 'src/app/service/books.service';
import { BookEditeModalComponent } from 'src/app/shared/book/book-edite-modal/book-edite-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FilteredBookComponent } from 'src/app/shared/filtered-book/filtered-book.component';
import { BookDeleteModalComponent } from 'src/app/shared/book/book-delete-modal/book-delete-modal.component';

@NgModule({
  declarations: [
    BooksManagerComponent,
    FilterComponent,
    BookDeleteModalComponent,
    BookEditeModalComponent
  ],
  imports: [
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    RouterModule.forChild([
      {path: '', component: BooksManagerComponent}
    ])
  ],
  entryComponents: [
    BookDeleteModalComponent,
    BookEditeModalComponent
  ],
  providers: [
    GoogleBooks,
    BookService
  ],
  exports: []
})
export class GBookModule { }
