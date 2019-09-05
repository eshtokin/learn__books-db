import { NgModule } from '@angular/core';
import { GoogleBooks } from 'src/app/service/google-books.service';
import { BooksManagerComponent } from './books-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookService } from 'src/app/service/books.service';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/service/users.service';

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
