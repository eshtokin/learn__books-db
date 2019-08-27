import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child31Component } from './child31/child31.component';
import { TestsharedModule } from '../../testshared/testshared.module';
import { RouterModule } from '@angular/router';
import { Child3Component } from './child3.component';



@NgModule({
  declarations: [
    Child3Component,
    Child31Component
  ],
  imports: [
    CommonModule,
    TestsharedModule,
    RouterModule.forChild([
      { path: '', component: Child3Component },
      { path: 'cc1', component: Child31Component },
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class Child3Module { }
