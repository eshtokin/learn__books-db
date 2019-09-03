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
import { BookDeleteModalComponent } from 'src/app/shared/book/book-delete-modal/book-delete-modal.component';
import { AddBookModalComponent } from 'src/app/shared/book/book-add-modal/add-book-modal.component';
import { UserService } from 'src/app/service/users.service';
import { BookDeleteFromFavModalComponent } from 'src/app/shared/book/book-delete-from-fav-modal/book-delete-from-fav-modal.component';

@NgModule({
  declarations: [
    BooksManagerComponent
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
  ],
  providers: [
    GoogleBooks,
    BookService,
    UserService
  ],
  exports: []
})
export class GBookModule { }
