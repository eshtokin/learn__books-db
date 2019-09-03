import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookComponent } from './book/book.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { FavoriteService } from '../service/favorite.service';

@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  providers: [
    FavoriteService
  ],
  exports: [
    BookComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
