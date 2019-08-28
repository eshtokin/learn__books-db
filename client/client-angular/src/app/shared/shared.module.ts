import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookComponent } from './book/book.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwPaginationComponent } from 'jw-angular-pagination';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    BookComponent,
    JwPaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  providers: [

  ],
  exports: [
    BookComponent,
    JwPaginationComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
