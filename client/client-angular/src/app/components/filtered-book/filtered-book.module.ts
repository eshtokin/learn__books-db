import { NgModule } from '@angular/core';
import { FilteredBookComponent } from './filtered-book.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BookService } from 'src/app/services/books.service';
import { UserService } from 'src/app/services/users.service';


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
