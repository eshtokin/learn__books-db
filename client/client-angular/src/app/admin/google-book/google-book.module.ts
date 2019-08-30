import { NgModule } from '@angular/core';
import { GoogleBookComponent } from './google-book.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { GoogleBooks } from 'src/app/service/google-books.service';
import { BookService } from 'src/app/service/books.service';
import { MatDialogModule } from '@angular/material/dialog';

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
    BookService
  ]
})

export class GoogleBooksModule {}
