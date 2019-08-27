import { NgModule, RootRenderer } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { GoogleBooks } from 'src/app/service/google-books.service';
import { BookService } from 'src/app/service/books.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: CatalogComponent}
    ])
  ],
  providers: [
    GoogleBooks,
    BookService
  ]
})

export class CatalogModule {}
