import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookComponent } from './book/book.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    BookComponent,
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
  ],
  providers: [

  ],
  exports: [
    BookComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
