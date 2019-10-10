import { NgModule } from '@angular/core';
import { GoogleBooks } from 'src/app/services/google-books.service';
import { BooksManagerComponent } from './books-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookService } from 'src/app/services/books.service';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users.service';

@NgModule({
  declarations: [
    BooksManagerComponent
  ],
  imports: [
    MatDialogModule,
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
