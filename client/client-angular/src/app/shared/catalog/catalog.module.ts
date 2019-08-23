import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleBooks } from 'src/app/service/google-books.service';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared.module';
import { BookService } from 'src/app/service/books.service';



@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    GoogleBooks,
    BookService
  ],
  exports: []
})
export class CatalogModule { }
