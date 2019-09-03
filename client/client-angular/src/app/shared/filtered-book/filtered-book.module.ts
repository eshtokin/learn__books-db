import { NgModule } from '@angular/core';
import { FilteredBookComponent } from './filtered-book.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { BookService } from 'src/app/service/books.service';
import { MatDialogModule } from '@angular/material';
import { UserService } from 'src/app/service/users.service';

@NgModule({
  declarations: [
    FilteredBookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    RouterModule.forChild([
      {path: '', component: FilteredBookComponent}
    ])
  ],
  providers: [
    BookService,
    UserService
  ],
  entryComponents: [
  ]
})
export class FilteredBookModule {}
