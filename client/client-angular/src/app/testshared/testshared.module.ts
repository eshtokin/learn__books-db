import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedcomponentComponent } from './sharedcomponent/sharedcomponent.component';



@NgModule({
  declarations: [
    SharedcomponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SharedcomponentComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TestsharedModule { }
