import { NgModule } from '@angular/core';
import { GoogleBookComponent } from './google-book.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GoogleBooks } from 'src/app/services/google-books.service';
import { BookService } from 'src/app/services/books.service';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users.service';

@NgModule({
  declarations: [
    GoogleBookComponent
  ],
  imports: [
    MatDialogModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: GoogleBookComponent}
    ])
  ],
  providers: [
    GoogleBooks,
    BookService,
    UserService
  ]
})

export class GoogleBooksModule {}
